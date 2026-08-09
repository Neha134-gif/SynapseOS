# Frontend — SynapseOS (Person A)

Built with: Next.js, React, Tailwind CSS

## Your Responsibilities
- [ ] Login / Signup pages (connect to backend `/auth` APIs)
- [ ] Dashboard — list of uploaded documents
- [ ] Document upload UI (drag-and-drop or file picker)
- [ ] Chat interface — ask questions, show AI answers with source references
- [ ] Chat history view
- [ ] Basic profile page

## Setup

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
(Person B will confirm the actual backend URL/port)

## Talk to Person B about:
- Exact API request/response formats for login, upload, chat endpoints
- Auth token handling (where JWT is stored — cookies vs localStorage, discuss security tradeoffs)

## Talk to Person C about:
- What format the chat response comes in (answer text + source chunks) — so you can display citations properly
