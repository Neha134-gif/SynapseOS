MAP_PROMPT = """Summarize the following text in 3-5 bullet points.
Use only information from the text.

Text:
{text}"""

REDUCE_PROMPT = """Below are partial summaries of one document.
Combine them into one clear, concise final summary. Do not add outside information.

Partial summaries:
{text}"""