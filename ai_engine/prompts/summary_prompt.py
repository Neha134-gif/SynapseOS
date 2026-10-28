"""
summary_prompt.py
-----------------
Prompt template for document summarization.
"""

SUMMARY_PROMPT_TEMPLATE = """You are an expert document summarizer for SynapseOS.
Summarize the following document content in a clear, structured way.

INSTRUCTIONS:
- Write a concise summary (150-250 words).
- Highlight the main topics, key points, and important conclusions.
- Use bullet points where appropriate.
- Do NOT add information that is not in the document.

DOCUMENT CONTENT:
-----------------------------------------
{content}
-----------------------------------------

SUMMARY:"""


def build_summary_prompt(chunks: list[str]) -> str:
    """
    Build the summarization prompt from document chunks.

    Args:
        chunks: List of text chunks from the document.

    Returns:
        Complete formatted prompt string.
    """
    # For summarization, join all chunks (up to a limit to avoid token overflow)
    max_chars = 8000  # ~2000 tokens — safe for Gemini
    content = "\n\n".join(chunks)

    if len(content) > max_chars:
        content = content[:max_chars] + "...\n[Document truncated for summarization]"

    return SUMMARY_PROMPT_TEMPLATE.format(content=content)
