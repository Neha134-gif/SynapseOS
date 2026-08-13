# Frontend + DevOps — SynapseOS (You)

Built with: Next.js, React, Tailwind CSS

## Your Responsibilities — Frontend
- [ ] Login / Signup pages (connect to backend `/auth` APIs)
- [ ] Dashboard — list of uploaded documents
- [ ] Document upload UI (drag-and-drop or file picker)
- [ ] Chat interface — ask questions, show AI answers with source references
- [ ] Chat history view
- [ ] Basic profile page

## Your Responsibilities — DevOps / Integration
- [ ] Repo setup, folder structure, branching strategy for all 4 members
- [ ] Keep `main` branch stable — review every PR before merging
- [ ] Integration testing — confirm frontend ↔ backend ↔ AI engine actually work together end-to-end
- [ ] Set up hosted PostgreSQL (Render/Supabase/Neon — free tier)
- [ ] Deployment: frontend on Vercel, backend on Render
- [ ] Maintain `docs/README.md`, architecture notes, and demo prep

## Setup — Frontend

```bash
npx create-next-app@latest .
npm install axios
npm run dev
```

## Folder Guide
```
frontend/
├── app/            → pages/routes (Next.js App Router)
├── components/      → reusable UI components (ChatBox, DocumentCard, Navbar, etc.)
└── lib/              → API call functions (axios instance, auth helpers)
```

## API Base URL
Store backend URL in `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```
(Backend member will confirm the actual backend URL/port)

## Talk to Backend member about:
- Exact API request/response formats for login, upload, chat endpoints
- Auth token handling (where JWT is stored — cookies vs localStorage, discuss security tradeoffs)

## Talk to AI Engine member about:
- What format the chat response comes in (answer text + source chunks) — so you can display citations properly

## DevOps Checklist (before each weekly demo)
- [ ] Pull latest from all 3 dev branches, merge into `main`, confirm nothing is broken
- [ ] Run the full user flow once end-to-end: signup → login → upload → chat → summarize → dashboard
- [ ] Note any blockers in `docs/PROGRESS.md` before the Sunday call
