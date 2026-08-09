from fastapi import APIRouter, UploadFile, File, Depends
import os
import shutil

from app.database import SessionLocal
from app.models.db_models import Document, User
from app.auth.dependencies import get_current_user

router = APIRouter()


@router.get("/")
def test_documents():
    return {
        "message": "Documents route is working"
    }


@router.post("/upload")
def upload_document(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):

    os.makedirs("uploads", exist_ok=True)

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    db = SessionLocal()

    new_document = Document(
        filename=file.filename,
        filepath=file_path,
        owner_id=current_user.id
    )

    db.add(new_document)
    db.commit()
    db.refresh(new_document)

    return {
        "message": "File uploaded successfully",
        "document_id": new_document.id,
        "filename": new_document.filename,
        "owner_id": current_user.id
    }


@router.get("/all")
def get_all_documents(
    current_user: User = Depends(get_current_user)
):

    db = SessionLocal()

    documents = db.query(Document).filter(
        Document.owner_id == current_user.id
    ).all()

    return documents


@router.delete("/{document_id}")
def delete_document(
    document_id: int,
    current_user: User = Depends(get_current_user)
):

    db = SessionLocal()

    document = db.query(Document).filter(
        Document.id == document_id,
        Document.owner_id == current_user.id
    ).first()

    if not document:
        return {
            "message": "Document not found"
        }

    if os.path.exists(document.filepath):
        os.remove(document.filepath)

    db.delete(document)
    db.commit()

    return {
        "message": "Document deleted successfully"
    }