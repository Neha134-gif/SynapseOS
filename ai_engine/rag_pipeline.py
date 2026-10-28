import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI

from ai_engine.embeddings.document_processor import extract_text, chunk_text
from ai_engine.embeddings.embed import embed_texts
from ai_engine.vector_store.store import add_chunks, search, get_all_chunks
from ai_engine.prompts.rag_prompt import QA_PROMPT
from ai_engine.prompts.summary_prompt import MAP_PROMPT, REDUCE_PROMPT

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    google_api_key=os.getenv("GOOGLE_API_KEY"),
    temperature=0.2,
)

def process_document(file_path: str, doc_id: str) -> int:
    text = extract_text(file_path)
    chunks = chunk_text(text)
    embeddings = embed_texts(chunks)
    add_chunks(doc_id, os.path.basename(file_path), chunks, embeddings)
    return len(chunks)

def get_answer(question: str, doc_id: str | None = None, k: int = 4) -> dict:
    q_emb = embed_texts([question])[0]
    chunks, metas = search(q_emb, doc_id, k)
    context = "\n\n".join(chunks)
    response = llm.invoke(QA_PROMPT.format(context=context, question=question))
    return {
        "answer": response.content,
        "sources": [{"source": m["source"], "chunk": m["chunk"], "text": c}
                    for m, c in zip(metas, chunks)],
    }

def get_summary(doc_id: str) -> str:
    chunks = get_all_chunks(doc_id)
    if not chunks:
        return "Is doc_id ka koi document nahi mila."
    batches = ["\n".join(chunks[i:i + 10]) for i in range(0, len(chunks), 10)]
    partials = [llm.invoke(MAP_PROMPT.format(text=b)).content for b in batches]
    if len(partials) == 1:
        return partials[0]
    return llm.invoke(REDUCE_PROMPT.format(text="\n\n".join(partials))).content