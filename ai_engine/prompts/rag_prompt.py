QA_PROMPT = """You are a helpful assistant. Answer the question using ONLY the context below.
If the answer is not in the context, say exactly: "Document mein yeh information nahi mili."
Do not make up facts. Keep the answer clear and concise.

Context:
{context}

Question: {question}

Answer:"""