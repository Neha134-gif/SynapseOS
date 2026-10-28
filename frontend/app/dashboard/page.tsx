
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import api from "@/lib/api";

interface Document {
  id: number;
  filename: string;
  filepath: string;
  owner_id: number;
}

export default function DashboardPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const fetchDocuments = async () => {
    try {
      setError("");
      const response = await api.get("/documents/all");
      setDocuments(
        Array.isArray(response.data) ? response.data : []
      );
    } catch (err: any) {
      console.error("Error loading documents:", err);
      setError(
        err.response?.data?.detail || "Failed to load documents."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) =>
      doc.filename.toLowerCase().includes(search.toLowerCase())
    );
  }, [documents, search]);

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    documentId: number
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!window.confirm("Are you sure you want to delete this document?")) {
      return;
    }

    try {
      setDeletingId(documentId);
      await api.delete(`/documents/${documentId}`);
      setDocuments((prev) =>
        prev.filter((doc) => doc.id !== documentId)
      );
    } catch (err: any) {
      console.error("Delete error:", err);
      alert(
        err.response?.data?.detail || "Failed to delete document."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />

      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12">
          {/* Header */}
          <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold tracking-wide text-orange-500">
                YOUR WORKSPACE
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Document Library
              </h1>
              <p className="mt-2 text-sm text-slate-500 sm:text-base">
                Manage your files and get answers from your documents.
              </p>
            </div>

            <Link
              href="/upload"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-500"
            >
              <span className="text-lg">+</span>
              Upload document
            </Link>
          </header>

          {/* Welcome banner */}
          <section className="relative mb-8 overflow-hidden rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
            <div className="relative z-10 max-w-2xl">
              <p className="mb-3 text-sm font-semibold text-orange-400">
                SYNAPSEOS AI
              </p>
              <h2 className="text-2xl font-bold sm:text-3xl">
                Your documents. Smarter conversations.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                Upload a PDF or text file, ask questions, and explore
                information from your documents in one place.
              </p>
            </div>
            <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full border-[35px] border-orange-400/10" />
            <div className="pointer-events-none absolute -bottom-24 right-24 h-48 w-48 rounded-full bg-orange-500/10 blur-2xl" />
          </section>

          {/* Stats */}
          <section className="mb-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Total documents
              </p>
              <div className="mt-3 flex items-end justify-between">
                <p className="text-3xl font-bold text-slate-900">
                  {loading ? "—" : documents.length}
                </p>
                <span className="rounded-xl bg-orange-50 px-3 py-2 text-xl">
                  📄
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Available to search
              </p>
              <div className="mt-3 flex items-end justify-between">
                <p className="text-3xl font-bold text-slate-900">
                  {loading ? "—" : filteredDocuments.length}
                </p>
                <span className="rounded-xl bg-blue-50 px-3 py-2 text-xl">
                  🔎
                </span>
              </div>
            </div>
          </section>

          {/* Documents heading and search */}
          <section>
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Your documents
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Open a file to start asking questions.
                </p>
              </div>

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search documents..."
                aria-label="Search documents"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 sm:max-w-xs"
              />
            </div>

            {loading && (
              <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">
                Loading your documents...
              </div>
            )}

            {!loading && error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
                <p className="font-semibold text-red-700">
                  Could not load documents
                </p>
                <p className="mt-2 text-sm text-red-600">{error}</p>
                <button
                  onClick={() => {
                    setLoading(true);
                    fetchDocuments();
                  }}
                  className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                >
                  Try again
                </button>
              </div>
            )}

            {!loading && !error && filteredDocuments.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-3xl">
                  📁
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {documents.length === 0
                    ? "Your library is waiting"
                    : "No matching documents"}
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  {documents.length === 0
                    ? "Upload your first document to start asking questions and exploring its content."
                    : "Try another filename or clear your search."}
                </p>

                {documents.length === 0 ? (
                  <Link
                    href="/upload"
                    className="mt-6 inline-flex rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                  >
                    Upload your first document
                  </Link>
                ) : (
                  <button
                    onClick={() => setSearch("")}
                    className="mt-5 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}

            {!loading && !error && filteredDocuments.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredDocuments.map((doc) => {
                  const isPdf = doc.filename.toLowerCase().endsWith(".pdf");

                  return (
                    <article
                      key={doc.id}
                      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md"
                    >
                      <div className="mb-5 flex items-start justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-2xl">
                          {isPdf ? "📕" : "📄"}
                        </div>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                          {isPdf ? "PDF" : "DOCUMENT"}
                        </span>
                      </div>

                      <h3
                        title={doc.filename}
                        className="truncate text-base font-bold text-slate-900"
                      >
                        {doc.filename}
                      </h3>
                      <p className="mt-2 text-xs text-slate-400">
                        Document ID: {doc.id}
                      </p>

                      <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
                        <Link
                          href={`/chat?doc=${doc.id}`}
                          className="flex-1 rounded-lg bg-slate-900 px-3 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-orange-500"
                        >
                          Ask AI →
                        </Link>

                        <button
                          onClick={(e) => handleDelete(e, doc.id)}
                          disabled={deletingId === doc.id}
                          className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                        >
                          {deletingId === doc.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>

          <footer className="mt-12 border-t border-slate-200 py-5 text-center text-xs text-slate-400">
            SynapseOS Lite · Your personal document intelligence workspace
          </footer>
        </div>
      </main>
    </div>
  );
}
