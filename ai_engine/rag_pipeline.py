# TODO (Person C): Main RAG pipeline connecting embeddings + vector store + LLM

def answer_question(query: str, doc_id: str) -> dict:
    """
    1. Retrieve relevant chunks for doc_id using the query
    2. Build a prompt with retrieved context
    3. Call Gemini API
    4. Return {"answer": "...", "sources": [...]}
    """
    pass

def summarize_document(doc_id: str) -> str:
    """
    1. Get all chunks for doc_id
    2. Build summarization prompt
    3. Call Gemini API
    4. Return summary text
    """
    pass
