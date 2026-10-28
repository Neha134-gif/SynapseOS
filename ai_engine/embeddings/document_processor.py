from pypdf import PdfReader


# =========================
# EXTRACT TEXT
# =========================

def extract_text(file_path: str) -> str:
    """
    Extract text from PDF or TXT file.
    """

    if file_path.lower().endswith(".pdf"):
        reader = PdfReader(file_path)

        text = ""

        for page in reader.pages:
            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"

        return text.strip()

    elif file_path.lower().endswith(".txt"):
        with open(file_path, "r", encoding="utf-8") as file:
            return file.read().strip()

    else:
        raise ValueError("Only PDF and TXT files are supported.")


# =========================
# CHUNK TEXT
# =========================

def chunk_text(text: str, chunk_size: int = 500) -> list[str]:
    """
    Split text into smaller chunks.
    """

    words = text.split()

    chunks = []

    for i in range(0, len(words), chunk_size):
        chunk = " ".join(words[i:i + chunk_size])

        if chunk.strip():
            chunks.append(chunk.strip())

    return chunks