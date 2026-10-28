"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import api from "@/lib/api";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  sources?: string[];
}

export default function ChatPage() {
  const searchParams = useSearchParams();
  const docId = searchParams.get("doc");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Hi! Ask me anything about this document, and I will answer using its actual content.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // ==========================================
  // LOAD CHAT HISTORY
  // ==========================================

  useEffect(() => {
    const loadChatHistory = async () => {
      if (!docId) return;

      try {
        const response = await api.get("/chat/history", {
          params: {
            document_id: Number(docId),
          },
        });

        const historyMessages: Message[] = [];

        response.data.forEach((item: any) => {
          // User question
          historyMessages.push({
            id: `${item.id}-user`,
            role: "user",
            text: item.message,
          });

          // AI answer
          historyMessages.push({
            id: `${item.id}-ai`,
            role: "assistant",
            text: item.response,
          });
        });

        if (historyMessages.length > 0) {
          setMessages(historyMessages);
        }
      } catch (error) {
        console.error("Chat history error:", error);
      }
    };

    loadChatHistory();
  }, [docId]);

  // ==========================================
  // SEND QUESTION
  // ==========================================

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    if (!docId) {
      alert("No document selected.");
      return;
    }

    const question = input.trim();

    // Show user question immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await api.post("/chat/ask", {
        document_id: Number(docId),
        question: question,
      });

      const assistantMessage: Message = {
        id: Date.now().toString() + "-ai",
        role: "assistant",
        text: response.data.answer,
        sources: response.data.sources || [],
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error("Chat error:", err);

      const errorMessage: Message = {
        id: Date.now().toString() + "-error",
        role: "assistant",
        text:
          err.response?.data?.detail ||
          "Sorry, something went wrong while processing your question.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // SUMMARIZE DOCUMENT
  // ==========================================

  const handleSummarize = async () => {
    if (!docId) {
      alert("No document selected.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(
        `/chat/summarize?document_id=${Number(docId)}`
      );

      const summaryMessage: Message = {
        id: Date.now().toString() + "-summary",
        role: "assistant",
        text: response.data.summary,
      };

      setMessages((prev) => [...prev, summaryMessage]);
    } catch (err: any) {
      console.error("Summarize error:", err);

      const errorMessage: Message = {
        id: Date.now().toString() + "-summary-error",
        role: "assistant",
        text:
          err.response?.data?.detail ||
          err.response?.data?.error ||
          "Sorry, something went wrong while summarizing the document.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="flex h-screen bg-[var(--color-paper)]">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        {/* ================= HEADER ================= */}

        <div className="border-b border-[var(--color-line)] bg-white p-4">
          <div className="mx-auto flex max-w-2xl items-center justify-between">
            <div>
              <h1 className="font-semibold text-[var(--color-ink)]">
                Document Chat
              </h1>

              <p className="text-xs text-[var(--color-ink)]/50">
                Document ID: {docId || "unknown"}
              </p>
            </div>

            <button
              onClick={handleSummarize}
              disabled={loading}
              className="rounded-full bg-[var(--color-surface)] px-3 py-1.5 text-sm font-medium text-[var(--color-ink)] hover:opacity-80 disabled:opacity-50"
            >
              Summarize
            </button>
          </div>
        </div>

        {/* ================= CHAT AREA ================= */}

        <div className="mx-auto w-full max-w-2xl flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((msg) => {
            const isUser = msg.role === "user";

            return (
              <div
                key={msg.id}
                className={isUser ? "flex justify-end" : "flex justify-start"}
              >
                <div
                  className={
                    isUser
                      ? "max-w-xs rounded-2xl bg-[var(--color-ink)] px-4 py-3 text-white"
                      : "max-w-md rounded-2xl bg-white px-4 py-3 text-[var(--color-ink)] shadow-sm"
                  }
                >
                  {/* MESSAGE */}

                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.text}
                  </p>

                  {/* ================= SOURCES ================= */}

                  {!isUser &&
                    msg.sources &&
                    msg.sources.length > 0 && (
                      <div className="mt-3 border-t border-[var(--color-line)] pt-3">
                       <p className="mb-1 text-[10px] font-semibold text-[var(--color-ink)]/70">
  Sources
</p>

<div className="space-y-1">                          {msg.sources.map((source, index) => (
                            <div
                              key={index}
                              className="rounded-md bg-[var(--color-surface)] px-2 py-1.5 text-[10px] leading-4 text-[var(--color-ink)]/70 break-words"
                            >
                              <span className="font-medium text-[var(--color-ink)]">
                                Source {index + 1}:
                              </span>{" "}
                              {source}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            );
          })}

          {/* ================= THINKING ================= */}

          {loading && (
            <div className="flex justify-start">
              <div className="max-w-md rounded-2xl bg-white px-4 py-3 text-[var(--color-ink)]/50 shadow-sm">
                <p className="text-sm">Thinking...</p>
              </div>
            </div>
          )}
        </div>

        {/* ================= INPUT ================= */}

        <form
          onSubmit={handleSend}
          className="border-t border-[var(--color-line)] bg-white p-4"
        >
          <div className="mx-auto flex max-w-2xl gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about this document..."
              className="flex-1 rounded-full border border-[var(--color-line)] px-4 py-2 text-[var(--color-ink)] placeholder:text-[var(--color-ink)]/40 focus:border-[var(--color-highlight)] focus:outline-none"
            />

            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-full bg-[var(--color-ink)] px-5 py-2 font-medium text-white hover:opacity-90 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}