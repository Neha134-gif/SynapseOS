# TODO: chat/ask endpoint
from fastapi import APIRouter, Depends
from app.database import SessionLocal
from app.models.db_models import ChatHistory, User
from app.auth.dependencies import get_current_user

router = APIRouter()


@router.get("/history")
def get_chat_history(
    current_user: User = Depends(get_current_user)
):
    db = SessionLocal()

    history = db.query(ChatHistory).filter(
        ChatHistory.user_id == current_user.id
    ).order_by(
        ChatHistory.created_at.desc()
    ).all()

    return history