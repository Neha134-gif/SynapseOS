from fastapi import FastAPI

app = FastAPI(title="SynapseOS Backend")

@app.get("/")
def root():
    return {"message": "SynapseOS backend is running"}

# TODO (Person B):
# from app.routes import auth, documents, chat
# app.include_router(auth.router, prefix="/auth", tags=["auth"])
# app.include_router(documents.router, prefix="/documents", tags=["documents"])
# app.include_router(chat.router, prefix="/chat", tags=["chat"])
