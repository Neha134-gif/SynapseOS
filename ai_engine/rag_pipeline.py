
import os
import time
from dotenv import load_dotenv
from google import genai

from vector_store.store import retrieve_relevant_chunks


# ==========================================
# LOAD AI ENGINE .ENV
# ==========================================

AI_ENGINE_DIR = os.path.dirname(os.path.abspath(__file__))
ENV_PATH = os.path.join(AI_ENGINE_DIR, ".env")

load_dotenv(ENV_PATH, override=True)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError(
        "GEMINI_API_KEY is missing in ai_engine/.env"
    )

client = genai.Client(api_key=GEMINI_API_KEY)

MODEL_NAME = "gemini-3.6-flash"


# ==========================================
# GENERATE AI RESPONSE WITH RETRIES
# ==========================================

def generate_ai_response(prompt: str) -> str:
    for attempt in range(3):
        try:
            response = client.models.generate_content(
                model=MODEL_NAME,
                contents=prompt
            )

            if not response.text:
                return "The AI returned an empty response. Please try again."

            return response.text.strip()

        except Exception as e:
            error_text = str(e)

            print("Gemini API error:", repr(e))

            # Retry temporary server errors
            if "503" in error_text or "UNAVAILABLE" in error_text:
                if attempt < 2:
                    wait_seconds = 2 ** (attempt + 1)
                    print(
                        f"Gemini temporarily unavailable. "
                        f"Retrying in {wait_seconds} seconds..."
                    )
                    time.sleep(wait_seconds)
                    continue

                return (
                    "Gemini AI is temporarily unavailable. "
                    "Please try again in a few minutes."
                )

            # Handle quota and rate-limit errors
            if "429" in error_text or "RESOURCE_EXHAUSTED" in error_text:
                return (
                    "Gemini API quota or rate limit reached. "
                    "Please check your API quota and try again later."
                )

            # Handle invalid model or API key errors
            if "404" in error_text or "NOT_FOUND" in error_text:
                return (
                    "The configured Gemini model was not found or is "
                    "not available to this API key. Check MODEL_NAME "
                    "and your available models."
                )

            if "401" in error_text or "403" in error_text:
                return (
                    "Gemini API authentication or permission failed. "
                    "Check your API key and project access."
                )

            return (
                "Unable to generate a response from Gemini AI. "
                "Please check the backend terminal for the error."
            )

    return "Gemini AI is temporarily unavailable. Please try again later."


# ==========================================
# ANSWER QUESTION
# ==========================================

def answer_question(query: str, doc_id: str) -> dict:
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

    context = "\n\n".join(relevant_chunks)

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

    answer = generate_ai_response(prompt)

    return {
        "answer": answer,
        "sources": relevant_chunks
    }


# ==========================================
# SUMMARIZE DOCUMENT
# ==========================================

def summarize_document(doc_id: str) -> str:
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

    return generate_ai_response(prompt)
