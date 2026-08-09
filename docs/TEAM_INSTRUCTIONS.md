# 👥 Team Working Instructions — SynapseOS

Read this before writing any code. This keeps our GitHub clean and our work properly credited.

---

## 1. Your Folder = Your Responsibility

- **Person A** → only works inside `frontend/`
- **Person B** → only works inside `backend/`
- **Person C** → only works inside `ai_engine/`
- `docs/` → everyone updates this together (progress, diagrams)

Don't edit someone else's folder directly. If you need a change there, message them or raise it in the group.

---

## 2. Git Workflow (IMPORTANT — follow exactly)

We use one branch per person so our individual contributions are clearly visible on GitHub (this matters for resumes/interviews).

**One-time setup (each person does this):**
```bash
git clone <repo-url>
cd synapseos
git checkout -b frontend-dev      # Person A
git checkout -b backend-dev       # Person B
git checkout -b ai-dev            # Person C
```

**Daily workflow:**
```bash
git checkout your-branch-name
# ... do your work ...
git add .
git commit -m "Added JWT login endpoint"   # clear, specific message
git push origin your-branch-name
```

**Weekly (every Sunday, on the group call):**
- Each person opens a Pull Request from their branch → `main`
- Review each other's PR quickly (even a quick look counts)
- Merge into `main`
- This way `main` always has a working, combined version

**Commit message rules:**
- ❌ `update`, `fix`, `changes`
- ✅ `Added document upload API`, `Fixed chat scroll bug`, `Integrated ChromaDB retrieval`

---

## 3. Weekly Sync Call (30 min, every week)

Agenda:
1. Each person shares progress (from `docs/PROGRESS.md`)
2. Blockers — does anyone need help from another module?
3. Plan for next week
4. Update `docs/PROGRESS.md` together before ending the call

---

## 4. Environment Variables — NEVER commit secrets

- Never push `.env` files with real API keys
- Only push `.env.example` with empty/placeholder values
- Each person keeps their own `.env` locally (already in `.gitignore`)

---

## 5. Before Every Team Meeting

Update your section in `docs/PROGRESS.md` — this becomes the base for:
- Viva/presentation prep
- Your resume bullet points
- The final project report

---

## 6. When You're Stuck

- First: check the module's own README for setup help
- Second: ask in the group chat — don't sit stuck for more than a day
- Third: bring it to the weekly call as a blocker

---

## 7. Golden Rule

Working code pushed regularly > perfect code pushed once at the end.
Push small, push often, keep `main` stable.
