"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  source?: string;
}

interface ChatHistoryItem {
  id: string;
  docName: string;
  lastMessage: string;
  date: string;
}

export default function ChatPage() {
  const searchParams = useSearchParams();
  const docId = searchParams.get("doc");

  const [history] = useState<ChatHistoryItem[]>([
    { id: "1", docName: "Research_Paper.pdf", lastMessage: "Summarized the methodology section", date: "12 Aug" },
    { id: "2", docName: "Lecture_Notes.pdf", lastMessage: "Asked about chapter 4", date: "10 Aug" },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Hi! Ask me anything about this document, and I will answer using its actual content.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      text: input,
    };

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
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString() + "-err", role: "assistant", text: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const summary: Message = {
        id: Date.now().toString() + "-summary",
        role: "assistant",
        text: "Summary: This is a placeholder summary of the full document.",
      };
      setMessages((prev) => [...prev, summary]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="hidden w-64 flex-shrink-0 flex-col border-r border-gray-200 bg-white md:flex">
        <div className="border-b border-gray-200 p-4">
          <a href="/dashboard" className="text-sm font-medium text-blue-600 hover:underline">
            Back to Dashboard
          </a>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          <p className="mb-2 px-2 text-xs font-semibold uppercase text-gray-400">Chat History</p>
          {history.map((item) => {
            const isActive = item.id === docId;
            const linkClass = isActive
              ? "mb-1 block rounded-lg bg-blue-50 p-3 text-sm"
              : "mb-1 block rounded-lg p-3 text-sm hover:bg-gray-50";
            const linkHref = "/chat?doc=" + item.id;

            return (
              <a key={item.id} href={linkHref} className={linkClass}>
                <p className="truncate font-medium text-gray-800">{item.docName}</p>
                <p className="truncate text-xs text-gray-500">{item.lastMessage}</p>
                <p className="mt-1 text-xs text-gray-400">{item.date}</p>
              </a>
            );
          })}
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="border-b border-gray-200 bg-white p-4">
          <div className="mx-auto flex max-w-2xl items-center justify-between">
            <div>
              <h1 className="font-semibold text-gray-800">Document Chat</h1>
              <p className="text-xs text-gray-500">Document ID: {docId || "unknown"}</p>
            </div>
            <button
              onClick={handleSummarize}
              disabled={loading}
              className="rounded bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-50"
            >
              Summarize
            </button>
          </div>
        </div>

        <div className="mx-auto w-full max-w-2xl flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((msg) => {
            const isUser = msg.role === "user";
            const wrapperClass = isUser ? "flex justify-end" : "flex justify-start";
            const bubbleClass = isUser
              ? "max-w-xs rounded-lg bg-blue-600 px-4 py-2 text-white"
              : "max-w-md rounded-lg bg-white px-4 py-2 text-gray-800 shadow-sm";

            return (
              <div key={msg.id} className={wrapperClass}>
                <div className={bubbleClass}>
                  <p className="text-sm">{msg.text}</p>
                  {msg.source && (
                    <p className="mt-1 text-xs text-gray-400">Source: {msg.source}</p>
                  )}
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex justify-start">
              <div className="max-w-md rounded-lg bg-white px-4 py-2 text-gray-400 shadow-sm">
                <p className="text-sm">Thinking...</p>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="border-t border-gray-200 bg-white p-4">
          <div className="mx-auto flex max-w-2xl gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about this document..."
              className="flex-1 rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}