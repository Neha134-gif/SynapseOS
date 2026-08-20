"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  return (
    <nav className="sticky top-0 z-50 border-b border-[#d6d4e2] bg-[#eeedf5]/95 shadow-[0_4px_24px_rgba(30,27,60,0.07)] backdrop-blur-xl">
      <div className="mx-auto flex h-[74px] max-w-6xl items-center justify-between px-6">

        {/* ================= LOGO ================= */}
        <Link
          href="/"
          className="group flex items-center gap-3"
        >
          {/* Premium SynapseOS Logo */}
          <div className="relative flex h-10 w-10 items-center justify-center rounded-[13px] bg-gradient-to-br from-[#6d63ff] via-[#635bff] to-[#8b5cf6] shadow-[0_7px_22px_rgba(99,91,255,0.28)] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[0_10px_28px_rgba(99,91,255,0.38)]">

            <svg
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
            >
              {/* Outer neural orbit */}
              <path
                d="M20 5.5C27.8 5.5 34.5 11.9 34.5 20C34.5 28.1 27.8 34.5 20 34.5C12.2 34.5 5.5 28.1 5.5 20C5.5 11.9 12.2 5.5 20 5.5Z"
                stroke="white"
                strokeWidth="1.5"
                strokeOpacity="0.35"
              />

              {/* Synapse connections */}
              <path
                d="M20 20L12 12M20 20L28 12M20 20L12 28M20 20L28 28"
                stroke="white"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeOpacity="0.9"
              />

              {/* Horizontal + vertical connections */}
              <path
                d="M20 7.5V14M20 26V32.5M7.5 20H14M26 20H32.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeOpacity="0.75"
              />

              {/* Outer nodes */}
              <circle cx="11" cy="11" r="2.4" fill="white" />
              <circle cx="29" cy="11" r="2.4" fill="white" />
              <circle cx="11" cy="29" r="2.4" fill="white" />
              <circle cx="29" cy="29" r="2.4" fill="white" />

              {/* Cardinal nodes */}
              <circle cx="20" cy="7" r="1.9" fill="white" />
              <circle cx="20" cy="33" r="1.9" fill="white" />
              <circle cx="7" cy="20" r="1.9" fill="white" />
              <circle cx="33" cy="20" r="1.9" fill="white" />

              {/* Center */}
              <circle cx="20" cy="20" r="5" fill="white" />
              <circle cx="20" cy="20" r="2.2" fill="#635BFF" />
            </svg>
          </div>

          {/* Brand name */}
          <span className="font-display text-xl font-semibold tracking-tight text-[var(--color-ink)]">
            SynapseOS{" "}
            <span className="text-[var(--color-primary)]">Lite</span>
          </span>
        </Link>


        {/* ================= LANDING NAV ================= */}
        {isLanding ? (
          <div className="flex items-center gap-1">

            {/* Home */}
            <Link
              href="/"
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-[var(--color-ink-muted)] transition-all hover:bg-white hover:text-[var(--color-ink)] hover:shadow-sm"
            >
              Home
            </Link>

            {/* How It Works */}
            <Link
              href="/#how-it-works"
              className="hidden rounded-xl px-4 py-2.5 text-sm font-medium text-[var(--color-ink-muted)] transition-all hover:bg-white hover:text-[var(--color-ink)] hover:shadow-sm sm:block"
            >
              How it Works
            </Link>

            {/* Features */}
            <Link
              href="/#features"
              className="hidden rounded-xl px-4 py-2.5 text-sm font-medium text-[var(--color-ink-muted)] transition-all hover:bg-white hover:text-[var(--color-ink)] hover:shadow-sm sm:block"
            >
              Features
            </Link>

            {/* Sign In */}
            <Link
              href="/login"
              className="ml-1 rounded-xl px-4 py-2.5 text-sm font-semibold text-[var(--color-ink)] transition-all hover:bg-white hover:text-[var(--color-primary)] hover:shadow-sm"
            >
              Sign In
            </Link>

            {/* Get Started */}
            <Link
              href="/signup"
              className="ml-2 flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_7px_20px_rgba(99,91,255,0.25)] transition-all hover:-translate-y-0.5 hover:bg-[var(--color-primary-hover)] hover:shadow-[0_10px_28px_rgba(99,91,255,0.36)]"
            >
              Get Started
              <span className="text-base">→</span>
            </Link>

          </div>
        ) : (

          /* ================= APP NAV ================= */
          <div className="flex items-center gap-1">

            {/* Home */}
            <Link
              href="/"
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-[var(--color-ink-muted)] transition-all hover:bg-white hover:text-[var(--color-ink)] hover:shadow-sm"
            >
              Home
            </Link>

            {/* Documents */}
            <Link
              href="/dashboard"
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-[var(--color-ink-muted)] transition-all hover:bg-white hover:text-[var(--color-ink)] hover:shadow-sm"
            >
              Documents
            </Link>

            {/* Chat */}
            <Link
              href="/chat"
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-[var(--color-ink-muted)] transition-all hover:bg-white hover:text-[var(--color-ink)] hover:shadow-sm"
            >
              Chat
            </Link>

            {/* Ingest */}
            <Link
              href="/upload"
              className="ml-2 rounded-xl bg-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_6px_18px_rgba(99,91,255,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[var(--color-primary-hover)]"
            >
              + Ingest
            </Link>

            {/* Profile */}
            <Link
              href="/profile"
              className="ml-1 rounded-xl px-4 py-2.5 text-sm font-medium text-[var(--color-ink-muted)] transition-all hover:bg-white hover:text-[var(--color-ink)] hover:shadow-sm"
            >
              Profile
            </Link>

          </div>
        )}
      </div>
    </nav>
  );
}