# 🧠 SynapseOS Lite — Document Intelligence Assistant

> A document intelligence web app that lets users upload a document (PDF/TXT) and get source-grounded answers and instant summaries — built as a mini project with an architecture designed to scale into a full multi-agent workflow platform (major project).

---

## 📌 Project Description

Students, faculty, and professionals regularly deal with long documents — notes, research papers, reports — and spend a lot of time manually searching for specific information or writing summaries. General AI chatbots can answer questions about a file, but most don't clearly show which part of the document an answer came from, and don't offer a fast way to get a reliable overview of the whole document.

**SynapseOS Lite** solves this: a user uploads a document, then can chat with it in natural language (every answer grounded in the source, with the exact snippet referenced) and get a one-click, full-document summary — all tracked in a personal dashboard.

This is built as a RAG (Retrieval-Augmented Generation) pipeline: the document is broken into chunks, converted into embeddings, and stored in a vector database. When the user asks a question, the system retrieves the most relevant chunks and passes them to the LLM to generate a grounded answer.

---

## 🎯 Objectives

- Build a full-stack AI platform combining modern web development with LLM-based intelligence
- Enable accurate, source-traceable document Q&A using RAG
- Provide a clean, usable dashboard to manage uploaded documents and chat history
- Design a scalable architecture that can evolve into a multi-agent system in the major project

---

## 🚀 Core Features (Mini Project Scope)

- 🔐 **Authentication** — Secure signup/login using JWT
- 📄 **Document Upload** — PDF / TXT upload and processing
- 🔎 **Semantic Search** — Embeddings stored in a vector database (ChromaDB) for meaning-based retrieval, not keyword match
- 💬 **AI Chat Assistant** — Ask questions about your document, get answers with the exact source snippet referenced
- 📝 **Summarization** — One-click, single-agent full-document summary
- 📊 **Dashboard** — Manage uploaded documents, view past chat history

---

## 🆚 What Makes This Worth Building

Compared to just using a generic AI chatbot's "upload a file" feature, SynapseOS Lite is purpose-built around traceability and reuse, not one-off answers:

| Capability | Generic AI Chatbot (file upload) | SynapseOS Lite |
|---|---|---|
| Source-traceable answers | Rare / inconsistent | Every answer shows source chunk |
| Persistent document + chat history | Limited / session-based | Saved dashboard, always accessible |
| One-click full-document summary | Needs manual prompting | Dedicated summarization agent |
| Purpose-built, self-hosted tool | No — general-purpose product | Yes — our own deployed system |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, React, Tailwind CSS |
| Backend | FastAPI (Python), REST APIs |
| Database | PostgreSQL (or SQLite for simplicity) |
| Vector DB | ChromaDB |
| AI/LLM | LangChain, Google Gemini API (free tier) |
| Auth | JWT Authentication (single user role) |
| Deployment | Vercel (frontend), Render (backend) |

---

## ⚙️ How It Works (Workflow)

1. **Upload** — User uploads a PDF/TXT file through the web app.
2. **Processing** — Backend extracts text, splits it into chunks, generates embeddings, and stores them in ChromaDB.
3. **Ask / Summarize** — User asks a question (RAG retrieval + LLM answer with source) or clicks "Summarize" (single summarization agent processes the full document).
4. **Response** — Answer or summary is shown in the chat UI, with the source reference visible.
5. **History** — Every conversation and document is saved and viewable from the dashboard.

> Note: This mini project uses one summarization agent to demonstrate the "AI agent" concept. The major project (4th year) extends this into a coordinated multi-agent system (Retrieval, Summarization, Validation, Report Generation, Workflow Planner agents) — see the separate Major Project proposal.

---

## 📂 Project Structure

```
synapseos-lite/
├── frontend/       → Next.js app (UI, dashboard, chat interface)
├── backend/        → FastAPI app (auth, APIs, database models)
├── ai_engine/      → RAG pipeline, embeddings, prompt engineering
├── docs/           → Architecture diagrams, DB schema, API docs
```

See individual README files inside each folder for setup instructions specific to that module.

---

## 👥 Team & Ownership (4 Members)

| Member | Role | Responsibilities |
|---|---|---|
| **Neha** | Frontend + DevOps/Integration | Next.js UI, dashboard, chat interface, repo setup, integration testing, deployment |
| **[Person B name]** | Backend Developer | Auth (JWT), document upload API, database |
| **[Person C name]** | AI/ML Engineer | Chunking, embeddings, RAG pipeline, summarization agent |

---

## 🗓 Milestone Plan (approx. 8-10 weeks)

| Week | Milestone |
|---|---|
| Week 1-2 | Requirement finalization, UI wireframes, project setup (repo, environments) |
| Week 3-4 | Auth + upload API working; text extraction and chunking pipeline built |
| Week 5-6 | Embeddings + ChromaDB integration; RAG chat working end-to-end |
| Week 7 | Summarization agent added; dashboard + chat history UI completed |
| Week 8 | Integration testing, bug fixes, deployment (Vercel + Render) |
| Week 9-10 | Buffer, polish, demo rehearsal, documentation and report writing |

---

## 🔮 Future Scope (Major Project — full SynapseOS)

- Multi-agent architecture (Retrieval, Summarization, Validation, Report Generation agents, coordinated by a Workflow Planner)
- Structured, downloadable report generation (PDF/DOCX)
- Hallucination validation against source documents
- Admin panel + role-based access control
- DOCX support and improved document parsing
- Docker-based deployment on cloud (AWS/Azure)

---

## ⚙️ Setup Instructions

Each module has its own setup guide:
- [`frontend/README.md`](./frontend/README.md)
- [`backend/README.md`](./backend/README.md)
- [`ai_engine/README.md`](./ai_engine/README.md)

---

## 📈 Project Status

Check [`docs/PROGRESS.md`](./docs/PROGRESS.md) for weekly progress updates from each team member.
