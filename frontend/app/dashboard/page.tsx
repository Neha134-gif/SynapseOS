"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

interface Document {
  id: string;
  name: string;
  uploadDate: string;
}

export default function DashboardPage() {
  const [documents] = useState<Document[]>([
    { id: "1", name: "Research_Paper.pdf", uploadDate: "12 Aug 2026" },
    { id: "2", name: "Lecture_Notes.pdf", uploadDate: "10 Aug 2026" },
  ]);

  return (
    <div className="flex h-screen bg-[var(--color-paper)]">
      <Sidebar />
      <div className="flex-1 overflow-y-auto px-8 py-10">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-medium text-[var(--color-highlight)]">Your library</p>
          <h1 className="font-display mb-8 text-3xl font-semibold text-[var(--color-ink)]">
            Documents
          </h1>

          {documents.length === 0 ? (
            <p className="text-[var(--color-ink)]/60">No documents yet. Upload one to get started.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {documents.map((doc) => {
                const chatLink = "/chat?doc=" + doc.id;
                return (
                  <a key={doc.id} href={chatLink} className="group rounded-2xl border border-[var(--color-line)] bg-white p-5 transition hover:border-[var(--color-highlight)] hover:shadow-md">
                    <div className="mb-3 inline-block rounded-full bg-[var(--color-surface)] px-2.5 py-1 text-xs font-medium text-[var(--color-ink)]/70">
                      PDF
                    </div>
                    <h2 className="font-display text-lg font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-highlight)]">
                      {doc.name}
                    </h2>
                    <p className="mt-1 text-sm text-[var(--color-ink)]/50">Uploaded {doc.uploadDate}</p>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}