
import os
from dotenv import load_dotenv
from google import genai

from vector_store.store import retrieve_relevant_chunks


# Load environment variables
AI_ENGINE_DIR = os.path.dirname(os.path.abspath(__file__))
ENV_PATH = os.path.join(AI_ENGINE_DIR, ".env")
load_dotenv(ENV_PATH, override=True)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is missing in .env")


# Gemini client
client = genai.Client(api_key=GEMINI_API_KEY)
MODEL_NAME = "gemini-3.8-flash"


# =========================
# ANSWER QUESTION
# =========================

def answer_question(query: str, doc_id: str) -> dict:
    """
    Retrieve relevant chunks from ChromaDB
    and generate an answer using Gemini.
    """

    # Get relevant chunks
    relevant_chunks = retrieve_relevant_chunks(
        query=query,
        doc_id=doc_id,
        top_k=3
    )

    if not relevant_chunks:
        return {
            "answer": "I could not find relevant information in the document.",
            "sources": []
        }

    # Combine chunks into context
    context = "\n\n".join(relevant_chunks)

    # Build prompt
    prompt = f"""
You are a document question-answering assistant.

Answer the user's question using ONLY the information
provided in the document context below.

If the answer is not present in the context, clearly say
that the information is not available in the document.

DOCUMENT CONTEXT:
{context}

USER QUESTION:
{query}

Provide a clear and concise answer.
"""

    # Call Gemini
    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt
    )

    answer = response.text or "Gemini returned an empty response. Please try again."

    return {
        "answer": answer.strip(),
        "sources": relevant_chunks
    }


# =========================
# SUMMARIZE DOCUMENT
# =========================

def summarize_document(doc_id: str) -> str:
    """
    Retrieve document chunks and generate a summary.
    """

    relevant_chunks = retrieve_relevant_chunks(
        query="Give me the main information from this document",
        doc_id=doc_id,
        top_k=10
    )

    if not relevant_chunks:
        return "No document information found."

    context = "\n\n".join(relevant_chunks)

    prompt = f"""
You are a document summarization assistant.

Summarize the document using ONLY the information
provided below.

Include the following when available:
- Main topic
- Important points and findings
- Methodology
- Key facts and figures
- Conclusion

DOCUMENT:
{context}

Provide a clear, well-organized summary.
"""

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt
    )

    if not response.text:
        return "Gemini returned an empty response. Please try again."

    return response.text.strip()
