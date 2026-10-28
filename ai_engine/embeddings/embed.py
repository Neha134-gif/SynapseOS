from sentence_transformers import SentenceTransformer


# Load embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")


def generate_embeddings(chunks: list[str]) -> list:
    """
    Generate embeddings for text chunks.
    """

    if not chunks:
        return []

    embeddings = model.encode(chunks)

    return embeddings.tolist()