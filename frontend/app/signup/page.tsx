"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      console.log("Signup attempt:", { name, email, password });
      await new Promise((resolve) => setTimeout(resolve, 800));
      router.push("/login");
    } catch (err) {
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[--color-paper]">
      <form onSubmit={handleSignup} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-md">
        <h1 className="font-display mb-6 text-2xl font-semibold text-[--color-ink]">
          Create your account
        </h1>

        {error && (
          <p className="mb-4 rounded bg-red-50 p-2 text-sm text-red-600">{error}</p>
        )}

        <label className="mb-1 block text-sm font-medium text-[--color-ink]">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mb-4 w-full rounded border border-[--color-line] px-3 py-2 focus:border-[--color-highlight] focus:outline-none"
          placeholder="Neha Mishra"
        />

        <label className="mb-1 block text-sm font-medium text-[--color-ink]">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-4 w-full rounded border border-[--color-line] px-3 py-2 focus:border-[--color-highlight] focus:outline-none"
          placeholder="you@example.com"
        />

        <label className="mb-1 block text-sm font-medium text-[--color-ink]">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mb-6 w-full rounded border border-[--color-line] px-3 py-2 focus:border-[--color-highlight] focus:outline-none"
          placeholder="At least 6 characters"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-[--color-ink] py-2.5 font-medium text-[--color-paper] hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p className="mt-4 text-center text-sm text-[--color-ink]/60">
          Already have an account?{" "}
          <a href="/login" className="text-[--color-highlight] hover:underline">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
}