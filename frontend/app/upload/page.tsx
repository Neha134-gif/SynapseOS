"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import api from "@/lib/api";

export default function UploadPage() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a PDF or TXT file.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post(
        "/documents/upload",
        formData
      );

      console.log("Upload response:", response.data);

      setMessage("Document uploaded successfully!");

      setFile(null);

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);

    } catch (err: any) {
      console.error("Upload error:", err);

      setError(
        err.response?.data?.detail ||
        "Failed to upload document."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[var(--color-paper)]">

      <Sidebar />

      <div className="flex-1 overflow-y-auto px-8 py-10">

        <div className="mx-auto max-w-2xl">

          <p className="text-sm font-medium text-[var(--color-highlight)]">
            Add a document
          </p>

          <h1 className="font-display mb-3 text-3xl font-semibold text-[var(--color-ink)]">
            Upload Document
          </h1>

          <p className="mb-8 text-[var(--color-ink)]/60">
            Upload a PDF or TXT file to start asking questions about it.
          </p>

          <form
            onSubmit={handleUpload}
            className="rounded-2xl border border-[var(--color-line)] bg-white p-8 shadow-sm"
          >

            <div className="mb-6">

              <label className="mb-3 block text-sm font-medium text-[var(--color-ink)]">
                Select Document
              </label>

              <input
                type="file"
                accept=".pdf,.txt"
                onChange={(e) => {
                  setFile(e.target.files?.[0] || null);
                  setError("");
                  setMessage("");
                }}
                className="block w-full cursor-pointer rounded-xl border border-[var(--color-line)] p-3 text-sm"
              />

              {file && (
                <p className="mt-3 text-sm text-[var(--color-ink)]/60">
                  Selected: {file.name}
                </p>
              )}

            </div>

            {error && (
              <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </p>
            )}

            {message && (
              <p className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-600">
                {message}
              </p>
            )}

           <button
  type="submit"
  disabled={loading || !file}
  className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
>
  {loading ? "Uploading..." : "Upload Document"}
</button>

          </form>

        </div>

      </div>

    </div>
  );
}