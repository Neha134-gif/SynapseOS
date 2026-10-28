from embeddings.embed import generate_embeddings
from vector_store.store import (
    store_in_chromadb,
    retrieve_relevant_chunks
)


# Test document
doc_id = "test_doc_1"

chunks = [
    "G. L. Bajaj Institute of Technology & Management is located in Greater Noida.",
    "The student is enrolled in B.TECH.(CSE), Semester V.",
    "The total tuition fee due is 105450 rupees."
]


# Generate embeddings
embeddings = generate_embeddings(chunks)

print("\n========== STORING IN CHROMADB ==========\n")

store_in_chromadb(
    doc_id=doc_id,
    chunks=chunks,
    embeddings=embeddings
)

print("Chunks stored successfully!")


# Search question
query = "Which course and semester is the student enrolled in?"

print("\n========== SEARCHING ==========\n")
print("Question:", query)

results = retrieve_relevant_chunks(
    query=query,
    doc_id=doc_id,
    top_k=2
)

print("\nRelevant chunks:")

for i, result in enumerate(results):
    print(f"\n--- Result {i + 1} ---")
    print(result)