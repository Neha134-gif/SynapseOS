"""
rag_pipeline.py
---------------
Main pipeline for SynapseOS AI Engine.
Connects document processing → embeddings → vector store → Gemini LLM.

Usage:
    from rag_pipeline import ingest_document, answer_question, summarize_document
"""

import os
import sys
import time

# Add ai_engine root to path for relative imports
sys.path.insert(0, os.path.dirname(__file__))

from dotenv import load_dotenv
import google.generativeai as genai

from embeddings.document_processor import extract_text, chunk_text
from embeddings.embed import generate_embeddings
from vector_store.store import (
    store_in_chromadb,
    retrieve_relevant_chunks,
    list_documents,
)
from prompts.rag_prompt import build_rag_prompt
from prompts.summary_prompt import build_summary_prompt

# Load environment variables from .env
load_dotenv()

# Configure Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise EnvironmentError(
        "GEMINI_API_KEY not found. Please set it in your .env file."
    )

genai.configure(api_key=GEMINI_API_KEY)
_gemini_model = genai.GenerativeModel("gemini-1.5-flash")


def _call_gemini(prompt: str) -> str:
    """
    Call the Gemini API with a prompt and return the response text.

    Args:
        prompt: Complete prompt string.

    Returns:
        Gemini's response as a string.
    """
    response = _gemini_model.generate_content(prompt)
    return response.text.strip()


# ─────────────────────────────────────────────
# PUBLIC API
# ─────────────────────────────────────────────

def ingest_document(file_path: str, doc_id: str) -> dict:
    """
    Full ingestion pipeline: extract → chunk → embed → store.
    Call this once when a document is uploaded.

    Args:
        file_path: Path to the PDF or TXT file.
        doc_id: Unique ID for this document (e.g., filename without extension).

    Returns:
        {"doc_id": str, "chunks_stored": int, "status": "success"}
    """
    print(f"[Ingest] Extracting text from '{file_path}'...")
    text = extract_text(file_path)

    print(f"[Ingest] Chunking text...")
    chunks = chunk_text(text, chunk_size=500, overlap=50)

    if not chunks:
        raise ValueError("No text could be extracted from the document.")

    print(f"[Ingest] Generating embeddings for {len(chunks)} chunks...")
    embeddings = generate_embeddings(chunks)

    print(f"[Ingest] Storing in ChromaDB...")
    store_in_chromadb(doc_id, chunks, embeddings)

    print(f"[Ingest] Done! {len(chunks)} chunks stored for doc_id='{doc_id}'.")
    return {
        "doc_id": doc_id,
        "chunks_stored": len(chunks),
        "status": "success",
    }


def answer_question(query: str, doc_id: str) -> dict:
    """
    RAG pipeline: retrieve relevant chunks → build prompt → call Gemini → return answer.

    Args:
        query: User's question.
        doc_id: Document to search within.

    Returns:
        {
            "answer": str,          # Gemini's grounded answer
            "sources": list[str],   # Relevant chunks used as context
            "doc_id": str,
            "query": str,
        }
    """
    start_time = time.time()

    # Step 1: Retrieve relevant chunks from ChromaDB
    relevant_chunks = retrieve_relevant_chunks(query, doc_id, top_k=3)

    if not relevant_chunks:
        return {
            "answer": "I couldn't find relevant information in the document.",
            "sources": [],
            "doc_id": doc_id,
            "query": query,
        }

    # Step 2: Build RAG prompt
    prompt = build_rag_prompt(relevant_chunks, query)

    # Step 3: Call Gemini
    answer = _call_gemini(prompt)

    elapsed = round(time.time() - start_time, 2)
    print(f"[RAG] Answered in {elapsed}s")

    return {
        "answer": answer,
        "sources": relevant_chunks,
        "doc_id": doc_id,
        "query": query,
        "response_time_seconds": elapsed,
    }


def summarize_document(doc_id: str) -> str:
    """
    Summarize all content of a stored document.

    Args:
        doc_id: Document to summarize (must be ingested first).

    Returns:
        Summary text string.
    """
    from vector_store.store import _get_collection

    # Get all chunks for this document
    collection = _get_collection(doc_id)
    count = collection.count()

    if count == 0:
        raise ValueError(
            f"No data found for doc_id='{doc_id}'. Ingest the document first."
        )

    # Fetch all chunks
    result = collection.get(include=["documents"])
    all_chunks = result["documents"]

    # Build summarization prompt
    prompt = build_summary_prompt(all_chunks)

    # Call Gemini
    summary = _call_gemini(prompt)
    return summary


def list_ingested_documents() -> list[str]:
    """
    Utility: List all document IDs currently stored in the system.

    Returns:
        List of doc_id strings.
    """
    return list_documents()


# ─────────────────────────────────────────────
# Quick manual test (run this file directly)
# ─────────────────────────────────────────────
if __name__ == "__main__":
    import json

    print("=== SynapseOS AI Engine — Quick Test ===\n")

    # Test with a sample text file
    test_file = "test_sample.txt"
    test_doc_id = "test_doc"

    # Create a small sample file for testing
    with open(test_file, "w") as f:
        f.write(
            """Machine learning is a subset of artificial intelligence.
            It allows systems to learn from data without being explicitly programmed.
            Deep learning uses neural networks with many layers.
            Natural Language Processing (NLP) helps computers understand human language.
            Transformers are the backbone of modern NLP models like BERT and GPT.
            """
        )

    # Ingest
    result = ingest_document(test_file, test_doc_id)
    print("Ingest result:", json.dumps(result, indent=2))

    # Ask a question
    qa_result = answer_question("What is machine learning?", test_doc_id)
    print("\nQ&A result:")
    print("Answer:", qa_result["answer"])
    print("Sources:", qa_result["sources"])

    # Summarize
    summary = summarize_document(test_doc_id)
    print("\nSummary:", summary)

    # Cleanup test file
    os.remove(test_file)
