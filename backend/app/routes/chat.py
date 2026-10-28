from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.database import SessionLocal
from app.models.db_models import ChatHistory, User
from app.auth.dependencies import get_current_user

import sys
import os


# ==========================================
# AI ENGINE PATH
# ==========================================

AI_ENGINE_PATH = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "../../../ai_engine")
)

if AI_ENGINE_PATH not in sys.path:
    sys.path.append(AI_ENGINE_PATH)


from rag_pipeline import answer_question, summarize_document


router = APIRouter()


# ==========================================
# CHAT REQUEST MODEL
# ==========================================

class ChatRequest(BaseModel):
    document_id: int
    question: str


# ==========================================
# CHAT HISTORY
# ==========================================

@router.get("/history")
def get_chat_history(
    document_id: int,
    current_user: User = Depends(get_current_user)
):
    db = SessionLocal()

    try:
        history = db.query(ChatHistory).filter(
            ChatHistory.user_id == current_user.id,
            ChatHistory.document_id == document_id
        ).order_by(
            ChatHistory.created_at.asc()
        ).all()

        return history

    finally:
        db.close()


# ==========================================
# ASK QUESTION
# ==========================================

@router.post("/ask")
def ask_question(
    request: ChatRequest,
    current_user: User = Depends(get_current_user)
):
    db = SessionLocal()

    try:

        # ==================================
        # AI ENGINE / RAG
        # ==================================

        result = answer_question(
            query=request.question,
            doc_id=str(request.document_id)
        )

        answer = result["answer"]
        sources = result.get("sources", [])


        # ==================================
        # SAVE CHAT HISTORY
        # ==================================

        new_chat = ChatHistory(
            user_id=current_user.id,
            document_id=request.document_id,
            message=request.question,
            response=answer
        )

        db.add(new_chat)
        db.commit()
        db.refresh(new_chat)


        # ==================================
        # RESPONSE
        # ==================================

        return {
            "message": "Question answered successfully",
            "document_id": request.document_id,
            "question": request.question,
            "answer": answer,
            "sources": sources
        }

    finally:
        db.close()


# ==========================================
# SUMMARIZE DOCUMENT
# ==========================================

@router.post("/summarize")
def summarize(
    document_id: int,
    current_user: User = Depends(get_current_user)
):
    try:

        # ==================================
        # AI ENGINE / RAG SUMMARY
        # ==================================

        summary = summarize_document(
            doc_id=str(document_id)
        )


        # ==================================
        # RESPONSE
        # ==================================

        return {
            "message": "Document summarized successfully",
            "document_id": document_id,
            "summary": summary
        }

    except Exception as e:

        return {
            "message": "Failed to summarize document",
            "error": str(e)
        }