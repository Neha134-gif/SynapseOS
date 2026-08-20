
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SynapseIcon from "@/components/SynapseIcon";
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
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-ink)]">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* ================================================= */}
        {/* LEFT - SIGN UP FORM */}
        {/* ================================================= */}

        <section className="flex min-h-screen flex-col px-6 py-8 sm:px-10 lg:px-16 xl:px-24">

          {/* Logo */}
          <Link
            href="/"
            className="group flex w-fit items-center gap-3"
          >
            <SynapseIcon className="h-11 w-11" />

            <span className="font-display text-xl font-semibold tracking-tight">
              SynapseOS{" "}
              <span className="text-[var(--color-primary)]">
                Lite
              </span>
            </span>
          </Link>


          {/* Form area */}
          <div className="mx-auto flex w-full max-w-md flex-1 items-center py-12">

            <div className="w-full">

              {/* Heading */}
              <div className="mb-8">

                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                  Get started
                </p>

                <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-[42px]">
                  Create your account.
                </h1>

                <p className="mt-4 text-sm leading-6 text-[var(--color-ink-muted)] sm:text-base">
                  Start exploring your documents with
                  source-grounded answers.
                </p>

              </div>


              {/* Error */}
              {error && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}


              {/* Form */}
              <form onSubmit={handleSignup} className="space-y-5">

                {/* Full Name */}
                <div>

                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium"
                  >
                    Full name
                  </label>

                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-[var(--color-line)] bg-white px-4 py-3.5 text-sm text-[var(--color-ink)] outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-indigo-500/10"
                  />

                </div>


                {/* Email */}
                <div>

                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    placeholder="Enter your email address"
                    className="w-full rounded-xl border border-[var(--color-line)] bg-white px-4 py-3.5 text-sm text-[var(--color-ink)] outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-indigo-500/10"
                  />

                </div>


                {/* Password */}
                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <label
                      htmlFor="password"
                      className="block text-sm font-medium"
                    >
                      Password
                    </label>

                    <span className="text-xs text-[var(--color-ink-muted)]">
                      6+ characters
                    </span>

                  </div>

                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    placeholder="Create a password"
                    className="w-full rounded-xl border border-[var(--color-line)] bg-white px-4 py-3.5 text-sm text-[var(--color-ink)] outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-indigo-500/10"
                  />

                </div>


                {/* Terms */}
                <div className="flex items-start gap-3 pt-1">

                  <input
                    id="terms"
                    type="checkbox"
                    required
                    className="mt-0.5 h-4 w-4 rounded border-[var(--color-line)] accent-[var(--color-primary)]"
                  />

                  <label
                    htmlFor="terms"
                    className="text-xs leading-5 text-[var(--color-ink-muted)]"
                  >
                    I agree to the{" "}
                    <span className="font-medium text-[var(--color-ink)]">
                      Terms of Use
                    </span>{" "}
                    and understand how SynapseOS handles my documents.
                  </label>

                </div>


                {/* Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(99,91,255,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-primary-hover)] hover:shadow-[0_16px_35px_rgba(99,91,255,0.28)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Creating account..." : "Create account"}

                  {!loading && (
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  )}
                </button>

              </form>


              {/* Login */}
              <p className="mt-7 text-center text-sm text-[var(--color-ink-muted)]">

                Already have an account?{" "}

                <Link
                  href="/login"
                  className="font-semibold text-[var(--color-primary)] transition-colors hover:text-[var(--color-primary-hover)]"
                >
                  Log in
                </Link>

              </p>

            </div>

          </div>


          {/* Bottom */}
          <p className="pt-4 text-xs text-[var(--color-ink-muted)]">
            © 2026 SynapseOS Lite · Student mini-project
          </p>

        </section>


        {/* ================================================= */}
        {/* RIGHT - SYNAPSEOS VISUAL PANEL */}
        {/* ================================================= */}

        <section className="relative hidden min-h-screen overflow-hidden lg:flex">

          {/* Base background */}
          <div className="absolute inset-0 bg-[#100E1C]" />

          {/* SynapseOS purple glow */}
          <div className="absolute left-1/2 top-[48%] h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/20 blur-[130px]" />

          <div className="absolute -right-32 -top-32 h-[450px] w-[450px] rounded-full bg-violet-500/15 blur-[120px]" />

          <div className="absolute -bottom-40 left-1/4 h-[400px] w-[500px] rounded-full bg-indigo-500/10 blur-[120px]" />


          {/* Panel content */}
          <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">


            {/* Small logo */}
            <div className="flex items-center gap-3 text-white">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/15 ring-1 ring-indigo-300/20">

                <svg
                  viewBox="0 0 48 48"
                  className="h-5 w-5 text-indigo-200"
                  fill="none"
                >
                  <circle cx="24" cy="24" r="4" fill="currentColor" />
                  <circle cx="10" cy="16" r="3" fill="currentColor" />
                  <circle cx="38" cy="16" r="3" fill="currentColor" />
                  <circle cx="10" cy="32" r="3" fill="currentColor" />
                  <circle cx="38" cy="32" r="3" fill="currentColor" />

                  <path
                    d="M13 17.5L21 22M35 17.5L27 22M13 30.5L21 26M35 30.5L27 26"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>

              </div>

              <span className="text-sm font-medium text-white/80">
                SynapseOS Lite
              </span>

            </div>


            {/* Main visual */}
            <div className="mx-auto w-full max-w-xl">

              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
                Document intelligence
              </p>

              <h2 className="font-display text-4xl font-semibold leading-tight text-white xl:text-5xl">
                Understand your
                <br />
                <span className="text-indigo-300">
                  documents faster.
                </span>
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-white/50">
                Search your files, ask questions, and trace
                answers back to the exact source.
              </p>


              {/* Product mockup */}
              <div className="mt-9 rounded-2xl border border-white/10 bg-white/[0.055] p-3 shadow-2xl backdrop-blur-xl">

                {/* Top bar */}
                <div className="flex items-center border-b border-white/10 px-3 pb-3">

                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  </div>

                  <span className="mx-auto text-[10px] text-white/35">
                    SynapseOS Lite
                  </span>

                </div>


                <div className="grid grid-cols-[125px_1fr] gap-3 p-3">

                  {/* Document sidebar */}
                  <div className="rounded-xl bg-white/[0.04] p-3">

                    <p className="mb-3 text-[9px] font-semibold uppercase tracking-wider text-white/30">
                      Documents
                    </p>

                    <div className="rounded-lg border border-indigo-400/20 bg-indigo-500/10 p-3">

                      <p className="text-[11px] font-medium text-white">
                        Data Structures
                      </p>

                      <p className="mt-1 text-[9px] text-white/35">
                        PDF · 24 pages
                      </p>

                    </div>

                    <p className="mt-4 px-2 text-[10px] text-white/30">
                      Operating Systems
                    </p>

                    <p className="mt-4 px-2 text-[10px] text-white/30">
                      Project Report
                    </p>

                  </div>


                  {/* Chat */}
                  <div className="rounded-xl border border-white/10 bg-white/[0.035] p-4">

                    <p className="text-[9px] font-semibold uppercase tracking-wider text-white/30">
                      Ask your document
                    </p>

                    <div className="mt-3 rounded-lg bg-indigo-500/10 p-3 text-[11px] leading-5 text-white/65">
                      What is the main idea behind
                      self-attention?
                    </div>


                    {/* Answer */}
                    <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.045] p-4">

                      <div className="flex items-center gap-2">

                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-semibold text-white">
                          S
                        </div>

                        <span className="text-[11px] font-semibold text-white">
                          SynapseOS
                        </span>

                      </div>

                      <p className="mt-3 text-[11px] leading-6 text-white/50">
                        Self-attention allows each word to
                        consider the relevance of other words
                        in the sequence.
                      </p>

                      <span className="mt-3 inline-flex rounded-md bg-amber-200/90 px-2 py-1 text-[9px] font-semibold text-amber-950">
                        [Page 3]
                      </span>

                    </div>

                  </div>

                </div>

              </div>


              {/* Feature mini cards */}
              <div className="mt-4 grid grid-cols-3 gap-3">

                <div className="rounded-xl border border-white/10 bg-white/[0.035] p-3">
                  <p className="text-[11px] font-semibold text-white">
                    Search
                  </p>
                  <p className="mt-1 text-[9px] text-white/35">
                    Find information
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.035] p-3">
                  <p className="text-[11px] font-semibold text-white">
                    Summarize
                  </p>
                  <p className="mt-1 text-[9px] text-white/35">
                    Key ideas quickly
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.035] p-3">
                  <p className="text-[11px] font-semibold text-white">
                    Verify
                  </p>
                  <p className="mt-1 text-[9px] text-white/35">
                    Check sources
                  </p>
                </div>

              </div>

            </div>


            {/* Bottom */}
            <div className="flex items-center justify-between text-[11px] text-white/25">
              <span>Source-grounded document AI</span>
              <span>SynapseOS Lite</span>
            </div>

          </div>

        </section>

      </div>
    </main>
  );
}