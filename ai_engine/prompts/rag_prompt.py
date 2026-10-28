"""
rag_prompt.py
-------------
Prompt template for RAG-based question answering.
Designed to keep answers grounded in the document — avoids hallucination.
"""

RAG_PROMPT_TEMPLATE = """You are a helpful AI assistant for SynapseOS. 
Your job is to answer questions strictly based on the provided document context.

RULES:
- Only use information from the CONTEXT below to answer.
- If the answer is not found in the context, say: "I couldn't find this information in the uploaded document."
- Do NOT make up or guess answers.
- Be concise and clear.
- If quoting from context, keep it brief.

CONTEXT (extracted from the document):
-----------------------------------------
{context}
-----------------------------------------

USER QUESTION: {question}

YOUR ANSWER:"""


def build_rag_prompt(context_chunks: list[str], question: str) -> str:
    """
    Build the final RAG prompt by injecting context and question.

    Args:
        context_chunks: List of relevant text chunks from the document.
        question: User's question.

    Returns:
        Complete formatted prompt string.
    """
    # Join chunks with separator for clarity
    context = "\n\n---\n\n".join(context_chunks)
    return RAG_PROMPT_TEMPLATE.format(context=context, question=question)
