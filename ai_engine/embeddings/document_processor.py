"""
document_processor.py
---------------------
Handles PDF/TXT text extraction and chunking into meaningful pieces.
"""

import os
from pathlib import Path


def extract_text(file_path: str) -> str:
    """
    Extract raw text from a PDF or TXT file.

    Args:
        file_path: Absolute or relative path to the file.

    Returns:
        Extracted text as a single string.

    Raises:
        ValueError: If the file format is not supported.
        FileNotFoundError: If the file does not exist.
    """
    path = Path(file_path)

    if not path.exists():
        raise FileNotFoundError(f"File not found: {file_path}")

    ext = path.suffix.lower()

    if ext == ".txt":
        with open(path, "r", encoding="utf-8", errors="ignore") as f:
            return f.read()

    elif ext == ".pdf":
        try:
            from pypdf import PdfReader
        except ImportError:
            raise ImportError("pypdf not installed. Run: pip install pypdf")

        reader = PdfReader(str(path))
        text = ""
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
        return text

    else:
        raise ValueError(f"Unsupported file format: {ext}. Supported: .pdf, .txt")


def chunk_text(text: str, chunk_size: int = 500, overlap: int = 50) -> list[str]:
    """
    Split text into overlapping chunks for better RAG retrieval.

    Args:
        text: Raw text to chunk.
        chunk_size: Maximum number of characters per chunk.
        overlap: Number of characters to overlap between chunks (preserves context).

    Returns:
        List of text chunks.
    """
    if not text or not text.strip():
        return []

    # Clean up excessive whitespace
    text = " ".join(text.split())

    chunks = []
    start = 0
    text_len = len(text)

    while start < text_len:
        end = start + chunk_size

        # Try to break at a sentence boundary (. ! ?) or word boundary
        if end < text_len:
            # Look for sentence boundary within last 100 chars
            boundary = text.rfind(". ", start, end)
            if boundary == -1:
                boundary = text.rfind("? ", start, end)
            if boundary == -1:
                boundary = text.rfind("! ", start, end)
            if boundary == -1:
                # Fall back to word boundary
                boundary = text.rfind(" ", start, end)
            if boundary > start:
                end = boundary + 1  # include the period/space

        chunk = text[start:end].strip()
        if chunk:
            chunks.append(chunk)

        # Move forward with overlap to preserve context
        start = end - overlap if end - overlap > start else end

    return chunks
