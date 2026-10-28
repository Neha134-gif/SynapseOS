from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.models import db_models
from app.routes import auth
from app.routes import documents
from app.routes import chat


app = FastAPI(title="SynapseOS Backend")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "SynapseOS backend is running"}

app.include_router(
    auth.router,
    prefix="/auth",
    tags=["Authentication"]
)
app.include_router(
    documents.router,
    prefix="/documents",
    tags=["Documents"]
)

app.include_router(
    chat.router,
    prefix="/chat",
    tags=["Chat"]
)