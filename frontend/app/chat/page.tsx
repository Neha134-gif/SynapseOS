"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  source?: string;
}

export default function ChatPage() {
  const searchParams = useSearchParams();
  const docId = searchParams.get("doc");

  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "assistant", text: "Hi! Ask me anything about this document, and I will answer using its actual content." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const fakeAnswer: Message = {
        id: Date.now().toString() + "-ai",
        role: "assistant",
        text: "This is a placeholder answer. Once the AI engine is connected, real answers grounded in the document will appear here.",
        source: "Page 2, Paragraph 3",
      };
      setMessages((prev) => [...prev, fakeAnswer]);
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const summary: Message = { id: Date.now().toString() + "-summary", role: "assistant", text: "Summary: This is a placeholder summary of the full document." };
      setMessages((prev) => [...prev, summary]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[var(--color-paper)]">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <div className="border-b border-[var(--color-line)] bg-white p-4">
          <div className="mx-auto flex max-w-2xl items-center justify-between">
            <div>
              <h1 className="font-semibold text-[var(--color-ink)]">Document Chat</h1>
              <p className="text-xs text-[var(--color-ink)]/50">Document ID: {docId || "unknown"}</p>
            </div>
            <button onClick={handleSummarize} disabled={loading} className="rounded-full bg-[var(--color-surface)] px-3 py-1.5 text-sm font-medium text-[var(--color-ink)] hover:opacity-80 disabled:opacity-50">
              Summarize
            </button>
          </div>
        </div>

        <div className="mx-auto w-full max-w-2xl flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((msg) => {
            const isUser = msg.role === "user";
            const wrapperClass = isUser ? "flex justify-end" : "flex justify-start";
            const bubbleClass = isUser
              ? "max-w-xs rounded-2xl bg-[var(--color-ink)] px-4 py-2 text-[var(--color-paper)]"
              : "max-w-md rounded-2xl bg-white px-4 py-2 text-[var(--color-ink)] shadow-sm";
            return (
              <div key={msg.id} className={wrapperClass}>
                <div className={bubbleClass}>
                  <p className="text-sm">{msg.text}</p>
                  {msg.source && (
                    <p className="mt-1 inline-block rounded bg-[var(--color-highlight)]/30 px-1.5 py-0.5 text-xs text-[var(--color-ink)]">
                      Source: {msg.source}
                    </p>
                  )}
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex justify-start">
              <div className="max-w-md rounded-2xl bg-white px-4 py-2 text-[var(--color-ink)]/40 shadow-sm">
                <p className="text-sm">Thinking...</p>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="border-t border-[var(--color-line)] bg-white p-4">
          <div className="mx-auto flex max-w-2xl gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about this document..."
              className="flex-1 rounded-full border border-[var(--color-line)] px-4 py-2 focus:border-[var(--color-highlight)] focus:outline-none"
            />
            <button type="submit" disabled={loading || !input.trim()} className="rounded-full bg-[var(--color-ink)] px-5 py-2 font-medium text-[var(--color-paper)] hover:opacity-90 disabled:opacity-50">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}