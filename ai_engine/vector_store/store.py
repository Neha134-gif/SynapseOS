import os
import chromadb

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
_client = chromadb.PersistentClient(path=os.path.join(BASE_DIR, "chroma_db"))
_collection = _client.get_or_create_collection("documents")

def add_chunks(doc_id, source, chunks, embeddings):
    _collection.upsert(
        ids=[f"{doc_id}_{i}" for i in range(len(chunks))],
        documents=chunks,
        embeddings=embeddings,
        metadatas=[{"doc_id": doc_id, "source": source, "chunk": i}
                   for i in range(len(chunks))],
    )

def search(query_embedding, doc_id=None, k=4):
    res = _collection.query(
        query_embeddings=[query_embedding],
        n_results=k,
        where={"doc_id": doc_id} if doc_id else None,
    )
    return res["documents"][0], res["metadatas"][0]

def get_all_chunks(doc_id):
    data = _collection.get(where={"doc_id": doc_id})
    pairs = sorted(zip(data["metadatas"], data["documents"]),
                   key=lambda x: x[0]["chunk"])
    return [doc for _, doc in pairs]