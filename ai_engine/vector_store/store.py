"""
store.py
--------
ChromaDB setup for storing and retrieving document embeddings.
Each document gets its own "collection" identified by doc_id.
"""

import os
import chromadb
from chromadb.config import Settings
from dotenv import load_dotenv

load_dotenv()

CHROMA_DB_PATH = os.getenv("CHROMA_DB_PATH", "./chroma_data")

# ChromaDB persistent client (data survives restarts)
_client = None


def _get_client() -> chromadb.PersistentClient:
    """Lazy-load ChromaDB client (singleton)."""
    global _client
    if _client is None:
        _client = chromadb.PersistentClient(path=CHROMA_DB_PATH)
    return _client


def _get_collection(doc_id: str):
    """Get or create a ChromaDB collection for a document."""
    client = _get_client()
    # Each document gets its own collection — clean separation
    collection = client.get_or_create_collection(
        name=f"doc_{doc_id}",
        metadata={"hnsw:space": "cosine"},  # cosine similarity for semantic search
    )
    return collection


def store_in_chromadb(
    doc_id: str, chunks: list[str], embeddings: list
) -> None:
    """
    Store document chunks and their embeddings in ChromaDB.

    Args:
        doc_id: Unique identifier for the document.
        chunks: List of text chunks.
        embeddings: Corresponding list of embedding vectors.
    """
    if not chunks or not embeddings:
        raise ValueError("chunks and embeddings cannot be empty")
    if len(chunks) != len(embeddings):
        raise ValueError("chunks and embeddings must have the same length")

    collection = _get_collection(doc_id)

    # Build IDs for each chunk
    ids = [f"{doc_id}_chunk_{i}" for i in range(len(chunks))]

    # Upsert — safe to call multiple times (won't duplicate)
    collection.upsert(
        ids=ids,
        documents=chunks,
        embeddings=embeddings,
    )
    print(f"Stored {len(chunks)} chunks for doc_id='{doc_id}' in ChromaDB.")


def retrieve_relevant_chunks(
    query: str, doc_id: str, top_k: int = 3
) -> list[str]:
    """
    Retrieve the most semantically relevant chunks for a query.

    Args:
        query: User's question or search query.
        doc_id: Document to search within.
        top_k: Number of top chunks to return.

    Returns:
        List of relevant text chunks (most relevant first).
    """
    from embeddings.embed import generate_embeddings

    collection = _get_collection(doc_id)

    # Check if collection has any data
    if collection.count() == 0:
        raise ValueError(
            f"No data found for doc_id='{doc_id}'. "
            "Please upload and process the document first."
        )

    # Embed the query using same model
    query_embedding = generate_embeddings([query])[0]

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=min(top_k, collection.count()),
    )

    # results["documents"] is a list of lists — take the first (our single query)
    return results["documents"][0] if results["documents"] else []


def delete_document(doc_id: str) -> None:
    """
    Delete all stored chunks for a document (cleanup utility).

    Args:
        doc_id: Document to delete.
    """
    client = _get_client()
    try:
        client.delete_collection(name=f"doc_{doc_id}")
        print(f"Deleted collection for doc_id='{doc_id}'.")
    except Exception as e:
        print(f"Collection not found or already deleted: {e}")


def list_documents() -> list[str]:
    """
    List all document IDs currently stored in ChromaDB.

    Returns:
        List of doc_ids.
    """
    client = _get_client()
    collections = client.list_collections()
    doc_ids = []
    for col in collections:
        name = col.name
        if name.startswith("doc_"):
            doc_ids.append(name[4:])  # strip "doc_" prefix
    return doc_ids
