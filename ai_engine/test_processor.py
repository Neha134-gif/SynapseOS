from embeddings.document_processor import extract_text, chunk_text


file_path = "../backend/uploads/639241047821654951.pdf"


# Extract PDF text
text = extract_text(file_path)

print("\n========== EXTRACTED TEXT ==========\n")
print(text)


# Create chunks
chunks = chunk_text(text)

print("\n========== CHUNKS ==========\n")
print("Total chunks:", len(chunks))

for i, chunk in enumerate(chunks):
    print(f"\n--- Chunk {i + 1} ---")
    print(chunk)