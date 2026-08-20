"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files ? e.target.files[0] : null;
    if (selected) {
      const validTypes = ["application/pdf", "text/plain"];
      if (!validTypes.includes(selected.type)) {
        setError("Only PDF or TXT files are allowed.");
        setFile(null);
        return;
      }
      setError("");
      setFile(selected);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      console.log("Uploading file:", file.name);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/dashboard");
    } catch (err) {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[--color-paper]">
      <Navbar />
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
          <h1 className="font-display mb-6 text-2xl font-semibold text-[--color-ink]">
            Upload a Document
          </h1>

          {error && (
            <p className="mb-4 rounded bg-red-50 p-2 text-sm text-red-600">{error}</p>
          )}

          <label
            htmlFor="file-upload"
            className="mb-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[--color-line] p-8 text-center hover:border-[--color-highlight]"
          >
            <span className="text-[--color-ink]/60">
              {file ? file.name : "Click to choose a PDF or TXT file"}
            </span>
            <input
              id="file-upload"
              type="file"
              accept=".pdf,.txt"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <button
            onClick={handleUpload}
            disabled={uploading || !file}
            className="w-full rounded-full bg-[--color-ink] py-2.5 font-medium text-[--color-paper] hover:opacity-90 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>

          <a href="/dashboard" className="mt-4 block text-center text-sm text-[--color-ink]/60 hover:underline">
            Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}