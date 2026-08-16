"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

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
    <div className="min-h-screen bg-[--color-paper]">
      <Navbar />
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-[--color-highlight]">Your library</p>
            <h1 className="font-display text-3xl font-semibold text-[--color-ink]">Documents</h1>
          </div>
          <a href="/upload" className="rounded-full bg-[--color-ink] px-5 py-2.5 text-sm font-medium text-[--color-paper] hover:opacity-90">
            + Upload document
          </a>
        </div>
        {documents.length === 0 ? (
          <p className="text-[--color-ink]/60">No documents yet. Upload one to get started.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {documents.map((doc) => {
              const chatLink = "/chat?doc=" + doc.id;
              return (
                <a key={doc.id} href={chatLink} className="group rounded-2xl border border-[--color-line] bg-white p-5 transition hover:border-[--color-highlight] hover:shadow-md">
                  <div className="mb-3 inline-block rounded-full bg-[--color-surface] px-2.5 py-1 text-xs font-medium text-[--color-ink]/70">
                    PDF
                  </div>
                  <h2 className="font-display text-lg font-semibold text-[--color-ink] group-hover:text-[--color-highlight]">
                    {doc.name}
                  </h2>
                  <p className="mt-1 text-sm text-[--color-ink]/50">Uploaded {doc.uploadDate}</p>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}