"""
embed.py
--------
Generate embeddings for text chunks using Sentence Transformers.
Uses 'all-MiniLM-L6-v2' — fast, lightweight, great for semantic search.
"""

from sentence_transformers import SentenceTransformer

# Load model once globally (avoids reloading on every call — saves time)
_model = None


def _get_model() -> SentenceTransformer:
    """Lazy-load the embedding model (singleton pattern)."""
    global _model
    if _model is None:
        print("Loading embedding model (first time may take a moment)...")
        _model = SentenceTransformer("all-MiniLM-L6-v2")
    return _model


def generate_embeddings(chunks: list[str]) -> list:
    """
    Generate semantic embeddings for a list of text chunks.

    Args:
        chunks: List of text strings to embed.

    Returns:
        List of embedding vectors (each is a list of floats).
    """
    if not chunks:
        return []

    model = _get_model()
    # encode() returns numpy array — convert to list for ChromaDB compatibility
    embeddings = model.encode(chunks, show_progress_bar=False)
    return embeddings.tolist()
