"use client";

import { useState } from "react";

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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Your Documents</h1>
          <a href="/upload" className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            + Upload Document
          </a>
        </div>

        {documents.length === 0 ? (
          <p className="text-gray-500">No documents uploaded yet. Upload one to get started.</p>
        ) : (
          <div className="space-y-3">
            {documents.map((doc) => (
              <a key={doc.id} href={"/chat?doc=" + doc.id} className="block rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md">
                <h2 className="font-medium text-gray-800">{doc.name}</h2>
                <p className="text-sm text-gray-500">Uploaded on {doc.uploadDate}</p>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}