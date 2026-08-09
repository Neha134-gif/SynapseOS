from fastapi import FastAPI
from app.database import Base, engine
from app.models import db_models
from app.routes import auth
from app.routes import documents

app = FastAPI(title="SynapseOS Backend")

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