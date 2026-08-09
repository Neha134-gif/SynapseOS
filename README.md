# 🧠 SynapseOS — AI-Powered College Study Assistant

> An intelligent document Q&A platform that helps students interact with their own notes, PYQs, and study material using Retrieval-Augmented Generation (RAG) — built as a mini project with an architecture designed to scale into a full multi-agent workflow platform.

---

## 📌 Project Description

SynapseOS is a full-stack AI application that allows students to upload their study material (notes, PYQs, syllabus PDFs) and interact with it using natural language. Instead of generic internet answers, SynapseOS gives **context-aware answers grounded strictly in the student's own uploaded content**, using Retrieval-Augmented Generation (RAG), vector embeddings, and LLMs.

Unlike generic tools like ChatPDF or NotebookLM, SynapseOS is purpose-built for the **student exam-prep use case**, with an architecture designed to expand (in the major project phase) into a full multi-agent academic assistant capable of PYQ pattern analysis, personalized study planning, and quiz generation.

---

## 🎯 Objectives

- Build a full-stack AI platform combining modern web development with LLM-based intelligence
- Enable accurate, context-aware document Q&A using RAG
- Provide a clean, usable dashboard for students to manage their study material
- Design a scalable architecture that can evolve into a multi-agent system in the major project

---

## 🚀 Core Features (Mini Project Scope)

- 🔐 **Authentication** — Secure signup/login using JWT
- 📄 **Document Upload** — PDF / TXT notes upload and processing
- 🔎 **Semantic Search** — Embeddings stored in a vector database (ChromaDB) for meaning-based retrieval, not keyword match
- 💬 **AI Chat Assistant** — Ask questions about your own notes, get answers with source references
- 📝 **Summarization** — AI-generated chapter/document summaries
- 📊 **Dashboard** — Manage uploaded documents, view chat history

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, React, Tailwind CSS |
| Backend | FastAPI (Python), REST APIs |
| Database | PostgreSQL |
| Vector DB | ChromaDB |
| AI/LLM | LangChain, Google Gemini API, Sentence Transformers |
| Auth | JWT Authentication |
| Deployment | Vercel (frontend), Render (backend) |

---

## 📂 Project Structure

```
synapseos/
├── frontend/       → Next.js app (UI, dashboard, chat interface)
├── backend/        → FastAPI app (auth, APIs, database models)
├── ai_engine/      → RAG pipeline, embeddings, prompt engineering
├── docs/           → Architecture diagrams, DB schema, API docs
```

See individual README files inside each folder for setup instructions specific to that module.

---

## 👥 Team & Ownership

| Member | Module | Responsibilities |
|---|---|---|
| **[Person A name]** | Frontend | Next.js UI, dashboard, chat interface, API integration |
| **[Person B name]** | Backend + Auth + DB | FastAPI, PostgreSQL, JWT auth, REST APIs, deployment |
| **[Person C name]** | AI/ML Engine | RAG pipeline, embeddings, ChromaDB, prompt engineering |

---

## 🔮 Future Scope (Major Project)

- Multi-agent architecture (Retrieval, Planning, Quiz, Validation agents working together)
- PYQ pattern analysis agent
- Personalized AI study planner
- Auto quiz/question generation
- Collaborative group study rooms
- Weak-topic analytics dashboard
- Admin/institution panel
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
