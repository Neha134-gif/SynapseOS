from fastapi import APIRouter, UploadFile, File, Depends
import os
import shutil
import sys

from app.database import SessionLocal
from app.models.db_models import Document, User
from app.auth.dependencies import get_current_user


# ==========================================
# AI ENGINE PATH
# ==========================================

AI_ENGINE_PATH = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "../../../ai_engine")
)

if AI_ENGINE_PATH not in sys.path:
    sys.path.append(AI_ENGINE_PATH)


from embeddings.document_processor import extract_text, chunk_text
from embeddings.embed import generate_embeddings
from vector_store.store import store_in_chromadb


router = APIRouter()


# ==========================================
# TEST ROUTE
# ==========================================

@router.get("/")
def test_documents():
    return {"message": "Documents route is working"}


# ==========================================
# UPLOAD DOCUMENT
# ==========================================

@router.post("/upload")
def upload_document(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):

    os.makedirs("uploads", exist_ok=True)

    file_path = f"uploads/{file.filename}"

    # ------------------------------------------
    # Save uploaded file
    # ------------------------------------------

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # ------------------------------------------
    # Save document in MySQL
    # ------------------------------------------

    db = SessionLocal()

    try:

        new_document = Document(
            filename=file.filename,
            filepath=file_path,
            owner_id=current_user.id
        )

        db.add(new_document)
        db.commit()
        db.refresh(new_document)

        document_id = new_document.id

        # ------------------------------------------
        # AI ENGINE PROCESSING
        # ------------------------------------------

        text = extract_text(file_path)

        chunks = chunk_text(text)

        embeddings = generate_embeddings(chunks)

        store_in_chromadb(
            doc_id=str(document_id),
            chunks=chunks,
            embeddings=embeddings
        )

        return {
            "message": "File uploaded and processed successfully",
            "document_id": document_id,
            "filename": new_document.filename,
            "owner_id": current_user.id,
            "chunks": len(chunks)
        }

    finally:
        db.close()


# ==========================================
# GET USER DOCUMENTS
# ==========================================

@router.get("/all")
def get_all_documents(
    current_user: User = Depends(get_current_user)
):

    db = SessionLocal()

    try:

        documents = db.query(Document).filter(
            Document.owner_id == current_user.id
        ).all()

        return documents

    finally:
        db.close()


# ==========================================
# DELETE DOCUMENT
# ==========================================

@router.delete("/{document_id}")
def delete_document(
    document_id: int,
    current_user: User = Depends(get_current_user)
):

    db = SessionLocal()

    try:

        document = db.query(Document).filter(
            Document.id == document_id,
            Document.owner_id == current_user.id
        ).first()

        if not document:
            return {"message": "Document not found"}

        if os.path.exists(document.filepath):
            os.remove(document.filepath)

        db.delete(document)
        db.commit()

        return {
            "message": "Document deleted successfully"
        }

    finally:
        db.close()