# AI Engine — SynapseOS (Person C)

Built with: LangChain, Google Gemini API, ChromaDB, Sentence Transformers

## Your Responsibilities
- [ ] Document text extraction (PDF/TXT parsing)
- [ ] Chunking strategy (split documents into meaningful pieces)
- [ ] Generate embeddings for chunks
- [ ] Store/retrieve embeddings in ChromaDB
- [ ] Build the RAG pipeline (retrieve relevant chunks → send to LLM → get answer)
- [ ] Prompt engineering (make sure answers stay grounded in the document, avoid hallucination)
- [ ] Summarization function (given a document, generate a summary)
- [ ] Expose these as functions/APIs that Person B's backend can call

## Setup

```bash
pip install langchain langchain-google-genai chromadb sentence-transformers pypdf python-dotenv
```

## Folder Guide
```
ai_engine/
├── embeddings/        → Code to generate embeddings from text chunks
├── prompts/            → Prompt templates (RAG prompt, summarization prompt)
├── vector_store/        → ChromaDB setup and query functions
└── rag_pipeline.py       → Main pipeline: connects everything together
```

## Core Functions to Build

```python
# document_processor.py
def extract_text(file_path: str) -> str: ...
def chunk_text(text: str, chunk_size: int = 500) -> list[str]: ...

# embeddings/embed.py
def generate_embeddings(chunks: list[str]) -> list: ...

# vector_store/store.py
def store_in_chromadb(doc_id: str, chunks: list[str], embeddings: list) -> None: ...
def retrieve_relevant_chunks(query: str, doc_id: str, top_k: int = 3) -> list[str]: ...

# rag_pipeline.py
def answer_question(query: str, doc_id: str) -> dict:
    # returns {"answer": "...", "sources": [...]}
    ...

def summarize_document(doc_id: str) -> str: ...
```

## .env.example
```
GEMINI_API_KEY=your-gemini-key-here
CHROMA_DB_PATH=./chroma_data
```

## Talk to Person B about:
- How your functions will be called from the backend (direct import vs separate microservice — for mini project, direct import is simpler)
- What format to return answers in (so frontend can display source citations)

## Evaluation Task (do this before final submission)
Manually test 20-30 questions against your uploaded notes and log:
- How many got correct/relevant answers
- Average response time
This becomes your "metrics" section for the report — very impressive in viva.
