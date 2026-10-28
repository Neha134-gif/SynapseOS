import rag_pipeline

print("RAG FILE:", rag_pipeline.__file__)

from rag_pipeline import answer_question


doc_id = "test_doc_1"

question = "Which course and semester is the student enrolled in?"


print("\n========== RAG TEST ==========\n")

print("Question:", question)

result = answer_question(
    query=question,
    doc_id=doc_id
)

print("\n========== ANSWER ==========\n")
print(result["answer"])

print("\n========== SOURCES ==========\n")

for i, source in enumerate(result["sources"]):
    print(f"\n--- Source {i + 1} ---")
    print(source)