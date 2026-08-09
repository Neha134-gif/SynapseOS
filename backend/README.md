# Backend — SynapseOS (Person B — You)

Built with: FastAPI, PostgreSQL, JWT

## Your Responsibilities
- [ ] User model + PostgreSQL setup
- [ ] Signup/Login APIs with JWT auth
- [ ] Password hashing (use `passlib` / `bcrypt`)
- [ ] Document upload API (receives file, saves it, triggers AI engine processing)
- [ ] APIs to list user's documents
- [ ] Chat API endpoint (receives question, calls AI engine, returns answer)
- [ ] Connect and coordinate both frontend (A) and AI engine (C) — you are the bridge
- [ ] Deployment (Render/Railway) — since you're team lead, own this end-to-end

## Setup

```bash
python -m venv venv
source venv/bin/activate     # or venv\Scripts\activate on Windows
pip install fastapi uvicorn sqlalchemy psycopg2-binary python-jose passlib python-multipart python-dotenv
uvicorn app.main:app --reload
```

## Folder Guide
```
backend/
├── app/
│   ├── routes/       → API endpoints (auth.py, documents.py, chat.py)
│   ├── models/       → Database models (User, Document, ChatHistory)
│   ├── auth/          → JWT token creation/verification logic
│   └── main.py         → FastAPI app entrypoint
├── requirements.txt
└── .env.example
```

## .env.example (copy to .env and fill real values — never commit .env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/synapseos
JWT_SECRET_KEY=your-secret-key-here
JWT_ALGORITHM=HS256
GEMINI_API_KEY=your-gemini-key-here
```

## Core API Endpoints to build (suggested)

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/auth/signup` | Register new user |
| POST | `/auth/login` | Login, returns JWT |
| POST | `/documents/upload` | Upload PDF/TXT, calls AI engine to process |
| GET | `/documents/` | List user's documents |
| POST | `/chat/ask` | Send question, calls AI engine, returns answer |
| GET | `/chat/history/{doc_id}` | Get chat history for a document |

## As Team Lead — extra things on you
- Keep `docs/PROGRESS.md` updated as a template each week
- Run the weekly sync call
- Make sure `main` branch stays working (review PRs before merging)
- Own the final deployment
