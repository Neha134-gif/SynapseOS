from ai_engine.rag_pipeline import process_document, get_answer, get_summary

n = process_document("ai_engine/sample.pdf", doc_id="doc1")
print(f"{n} chunks store hue\n")

for q in ["Is document ka main topic kya hai?",
          "Aisa sawaal jiska answer document mein NAHI hai"]:
    r = get_answer(q, doc_id="doc1")
    print("Q:", q)
    print("A:", r["answer"], "\n")

print("SUMMARY:\n", get_summary("doc1"))
