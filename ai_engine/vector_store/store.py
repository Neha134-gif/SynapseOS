import os
import chromadb


# =========================
# CHROMADB CLIENT
# =========================

CHROMA_DB_PATH = os.getenv(
    "CHROMA_DB_PATH",
    "./chroma_data"
)

client = chromadb.PersistentClient(
    path=CHROMA_DB_PATH
)


# =========================
# STORE EMBEDDINGS
# =========================

def store_in_chromadb(
    doc_id: str,
    chunks: list[str],
    embeddings: list
) -> None:
    """
    Store document chunks and their embeddings in ChromaDB.
    """

    collection = client.get_or_create_collection(
        name="documents"
    )

    ids = [
        f"{doc_id}_{i}"
        for i in range(len(chunks))
    ]

    collection.upsert(
        ids=ids,
        documents=chunks,
        embeddings=embeddings,
        metadatas=[
            {"doc_id": doc_id}
            for _ in chunks
        ]
    )


# =========================
# RETRIEVE RELEVANT CHUNKS
# =========================

def retrieve_relevant_chunks(
    query: str,
    doc_id: str,
    top_k: int = 3
) -> list[str]:
    """
    Retrieve relevant chunks for a document.
    """

    from embeddings.embed import generate_embeddings

    query_embedding = generate_embeddings([query])[0]

    collection = client.get_or_create_collection(
        name="documents"
    )

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k,
        where={"doc_id": doc_id}
    )

    return results.get("documents", [[]])[0]