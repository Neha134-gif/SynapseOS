"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      console.log("Login attempt:", { email, password });
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-paper)]">
      <form onSubmit={handleLogin} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-md">
        <h1 className="font-display mb-6 text-2xl font-semibold text-[var(--color-ink)]">Log in to SynapseOS Lite</h1>

        {error && <p className="mb-4 rounded bg-red-50 p-2 text-sm text-red-600">{error}</p>}

        <label className="mb-1 block text-sm font-medium text-[var(--color-ink)]">Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mb-4 w-full rounded border border-[var(--color-line)] px-3 py-2 focus:border-[var(--color-highlight)] focus:outline-none" placeholder="you@example.com" />

        <label className="mb-1 block text-sm font-medium text-[var(--color-ink)]">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mb-6 w-full rounded border border-[var(--color-line)] px-3 py-2 focus:border-[var(--color-highlight)] focus:outline-none" placeholder="••••••••" />

        <button type="submit" disabled={loading} className="w-full rounded-full bg-[var(--color-ink)] py-2.5 font-medium text-[var(--color-paper)] hover:opacity-90 disabled:opacity-50">
          {loading ? "Logging in..." : "Log In"}
        </button>

        <p className="mt-4 text-center text-sm text-[var(--color-ink)]/60">
          Don't have an account? <a href="/signup" className="font-medium text-[var(--color-highlight)] underline">Sign up</a>
        </p>
      </form>
    </div>
  );
}