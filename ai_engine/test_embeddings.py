print("TEST FILE STARTED")

from embeddings.embed import generate_embeddings


chunks = [
    "G. L. Bajaj Institute of Technology & Management",
    "The student is enrolled in B.TECH.(CSE), Semester V."
]

embeddings = generate_embeddings(chunks)

print("\n========== EMBEDDINGS TEST ==========\n")
print("Number of chunks:", len(embeddings))

for i, embedding in enumerate(embeddings):
    print(f"Chunk {i + 1} vector size:", len(embedding))
    print("First 5 values:", embedding[:5])
from embeddings.embed import generate_embeddings


chunks = [
    "G. L. Bajaj Institute of Technology & Management",
    "The student is enrolled in B.TECH.(CSE), Semester V."
]


embeddings = generate_embeddings(chunks)


print("\n========== EMBEDDINGS TEST ==========\n")

print("Number of chunks:", len(embeddings))

for i, embedding in enumerate(embeddings):
    print(f"Chunk {i + 1} vector size:", len(embedding))
    print("First 5 values:", embedding[:5])