import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-ink)]">

      <Navbar />

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden">
        
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[8%] top-[-180px] h-[520px] w-[520px] rounded-full bg-indigo-200/30 blur-[120px]" />

          <div className="absolute right-[5%] top-[80px] h-[420px] w-[420px] rounded-full bg-purple-200/30 blur-[110px]" />

          <div className="absolute left-1/2 top-[400px] h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-violet-100/50 blur-[100px]" />
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 pb-24 pt-20 lg:grid-cols-[1fr_0.9fr] lg:gap-20 lg:pt-28">

          {/* LEFT SIDE */}
          <div>

            {/* Small badge */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-white/80 px-4 py-2 text-sm font-medium text-[var(--color-ink-muted)] shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[var(--color-primary)]" />
              Document intelligence, made simple
            </div>

            {/* Main heading */}
            <h1 className="font-display max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
              Upload a document.
              <br />

              <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-purple)] bg-clip-text text-transparent">
                Ask it anything.
              </span>

              <br />

              Get answers with sources.
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--color-ink-muted)]">
              SynapseOS Lite indexes your PDFs and text files so you can
              search, summarize, and get answers with exact page citations.
            </p>

            {/* CTA buttons */}
            <div className="mt-9 flex flex-wrap items-center gap-4">

              <Link
                href="/signup"
                className="rounded-full bg-[var(--color-primary)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(99,91,255,0.25)] hover:-translate-y-0.5 hover:bg-[var(--color-primary-hover)] hover:shadow-[0_16px_35px_rgba(99,91,255,0.32)]"
              >
                Get Started →
              </Link>

              <Link
                href="/chat?doc=demo"
                className="rounded-full border border-[var(--color-line)] bg-white px-7 py-3.5 text-sm font-semibold text-[var(--color-ink)] shadow-sm hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              >
                Try Demo
              </Link>
            </div>

            {/* Small flow */}
            <div className="mt-6 text-sm font-medium text-[var(--color-ink-muted)]">
              Upload → Ask → Verify
            </div>
          </div>


          {/* RIGHT SIDE — PRODUCT MOCKUP */}
          <div className="relative">

            {/* Main browser card */}
            <div className="relative rounded-[28px] border border-white/80 bg-white/85 p-3 shadow-[0_30px_80px_rgba(45,40,100,0.15)] backdrop-blur-xl">

              {/* Browser top */}
              <div className="flex items-center justify-between border-b border-[var(--color-line)] px-4 py-3">

                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                </div>

                <span className="text-xs font-medium text-[var(--color-ink-muted)]">
                  SynapseOS Lite
                </span>

                <div className="w-10" />
              </div>


              {/* App UI */}
              <div className="grid grid-cols-[0.7fr_1.3fr] gap-3 p-3">

                {/* Documents */}
                <div className="rounded-2xl bg-[var(--color-bg-soft)] p-4">

                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-ink-muted)]">
                    Documents
                  </p>

                  <div className="mt-4 space-y-2">

                    <div className="rounded-xl border border-[var(--color-line)] bg-white p-3 shadow-sm">
                      <p className="text-xs font-semibold text-[var(--color-ink)]">
                        Data Structures
                      </p>
                      <p className="mt-1 text-[10px] text-[var(--color-ink-muted)]">
                        PDF · 24 pages
                      </p>
                    </div>

                    <div className="rounded-xl p-3">
                      <p className="text-xs font-medium text-[var(--color-ink-muted)]">
                        Operating Systems
                      </p>
                    </div>

                    <div className="rounded-xl p-3">
                      <p className="text-xs font-medium text-[var(--color-ink-muted)]">
                        Project Report
                      </p>
                    </div>

                  </div>
                </div>


                {/* Chat */}
                <div className="rounded-2xl border border-[var(--color-line)] bg-white p-4">

                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-ink-muted)]">
                    Ask your document
                  </p>

                  {/* Question */}
                  <div className="mt-4 rounded-xl bg-[var(--color-bg-soft)] p-3">
                    <p className="text-xs leading-5 text-[var(--color-ink)]">
                      What is the main idea behind self-attention?
                    </p>
                  </div>

                  {/* Answer */}
                  <div className="mt-3 rounded-xl border border-[var(--color-line)] p-4">

                    <div className="flex items-center gap-2">

                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-bold text-white">
                        S
                      </div>

                      <span className="text-xs font-semibold">
                        SynapseOS
                      </span>

                    </div>

                    <p className="mt-3 text-xs leading-6 text-[var(--color-ink-muted)]">
                      Self-attention allows each word to consider the
                      relevance of other words in the sequence.
                    </p>

                    <span className="mt-3 inline-block rounded-md bg-[var(--color-highlight)]/25 px-2 py-1 text-[10px] font-semibold text-[var(--color-ink)]">
                      [Page 3]
                    </span>

                  </div>

                </div>
              </div>
            </div>


            {/* Floating source card */}
            <div className="absolute -bottom-6 -left-6 rounded-2xl border border-[var(--color-line)] bg-white p-4 shadow-[0_18px_40px_rgba(30,25,70,0.15)]">

              <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-ink-muted)]">
                Source
              </p>

              <p className="mt-1 text-xs font-semibold text-[var(--color-ink)]">
                Page 3 · Paragraph 2
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* =========================================================
    HOW IT WORKS
========================================================= */}
<section
  id="how-it-works"
  className="relative overflow-hidden bg-white py-28"
>
  {/* Soft purple background glow */}
  <div className="pointer-events-none absolute left-1/2 top-20 -z-0 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-[#635bff]/[0.06] blur-[120px]" />

  <div className="relative mx-auto max-w-6xl px-6">

    {/* Section Heading */}
    <div className="mx-auto max-w-3xl text-center">

      <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-[#635bff]">
        How it works
      </p>

      <h2 className="font-display text-4xl font-semibold leading-tight tracking-[-0.025em] text-[#171629] md:text-5xl">
        From document to answer in{" "}
        <span className="text-[#635bff]">
          three steps.
        </span>
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#77748b]">
        Everything you need to understand your documents without
        digging through pages manually.
      </p>

    </div>


    {/* Steps */}
    <div className="mt-16 grid gap-6 md:grid-cols-3">

      {/* =====================================================
          CARD 1
      ===================================================== */}
      <div
        className="group relative overflow-hidden rounded-[26px]
        border border-[#dedcf0] bg-white p-8
        shadow-[0_8px_30px_rgba(40,35,90,0.05)]
        transition-[transform,box-shadow,border-color]
        duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]
        hover:-translate-y-3
        hover:border-[#c9c4ff]
        hover:shadow-[0_24px_55px_rgba(91,82,210,0.16)]"
      >

        {/* Hover glow */}
        <div
          className="pointer-events-none absolute -right-16 -top-16
          h-40 w-40 rounded-full bg-[#635bff]/10 blur-3xl
          opacity-0 transition-opacity duration-500
          group-hover:opacity-100"
        />

        <div className="relative z-10">

          <div className="flex items-start justify-between">

            <span className="text-sm font-semibold tracking-wide text-[#635bff]">
              01
            </span>

            <span
              className="text-xl text-[#8d899c]
              transition-all duration-500
              group-hover:translate-x-1
              group-hover:text-[#635bff]"
            >
              →
            </span>

          </div>


          {/* Icon */}
          <div
            className="mt-10 flex h-12 w-12 items-center justify-center
            rounded-2xl bg-[#eeecff] text-[#635bff]
            transition-all duration-500 ease-out
            group-hover:scale-110
            group-hover:rotate-3
            group-hover:bg-[#635bff]
            group-hover:text-white
            group-hover:shadow-[0_10px_25px_rgba(99,91,255,0.28)]"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M12 16V4" />
              <path d="M7 9l5-5 5 5" />
              <path d="M5 20h14" />
            </svg>
          </div>


          <h3 className="mt-8 font-display text-2xl font-semibold text-[#171629]">
            Upload
          </h3>

          <p className="mt-4 leading-7 text-[#77748b]">
            Drop in your PDF or TXT file and let SynapseOS prepare it for you.
          </p>


          {/* Hover line */}
          <div
            className="mt-7 h-px w-0 bg-[#635bff]
            transition-all duration-500
            group-hover:w-12"
          />

        </div>
      </div>


      {/* =====================================================
          CARD 2
      ===================================================== */}
      <div
        className="group relative overflow-hidden rounded-[26px]
        border border-[#dedcf0] bg-white p-8
        shadow-[0_8px_30px_rgba(40,35,90,0.05)]
        transition-[transform,box-shadow,border-color]
        duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]
        hover:-translate-y-3
        hover:border-[#c9c4ff]
        hover:shadow-[0_24px_55px_rgba(91,82,210,0.16)]"
      >

        <div
          className="pointer-events-none absolute -right-16 -top-16
          h-40 w-40 rounded-full bg-[#8b5cf6]/10 blur-3xl
          opacity-0 transition-opacity duration-500
          group-hover:opacity-100"
        />

        <div className="relative z-10">

          <div className="flex items-start justify-between">

            <span className="text-sm font-semibold tracking-wide text-[#635bff]">
              02
            </span>

            <span
              className="text-xl text-[#8d899c]
              transition-all duration-500
              group-hover:translate-x-1
              group-hover:text-[#635bff]"
            >
              →
            </span>

          </div>


          {/* Icon */}
          <div
            className="mt-10 flex h-12 w-12 items-center justify-center
            rounded-2xl bg-[#eeecff] text-[#635bff]
            transition-all duration-500 ease-out
            group-hover:scale-110
            group-hover:rotate-3
            group-hover:bg-[#635bff]
            group-hover:text-white
            group-hover:shadow-[0_10px_25px_rgba(99,91,255,0.28)]"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M5 5h14v14H5z" />
              <path d="M8 9h8" />
              <path d="M8 13h5" />
            </svg>
          </div>


          <h3 className="mt-8 font-display text-2xl font-semibold text-[#171629]">
            Ask or Summarize
          </h3>

          <p className="mt-4 leading-7 text-[#77748b]">
            Ask natural language questions or generate a quick summary of your document.
          </p>


          <div
            className="mt-7 h-px w-0 bg-[#635bff]
            transition-all duration-500
            group-hover:w-12"
          />

        </div>
      </div>


      {/* =====================================================
          CARD 3
      ===================================================== */}
      <div
        className="group relative overflow-hidden rounded-[26px]
        border border-[#dedcf0] bg-white p-8
        shadow-[0_8px_30px_rgba(40,35,90,0.05)]
        transition-[transform,box-shadow,border-color]
        duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]
        hover:-translate-y-3
        hover:border-[#c9c4ff]
        hover:shadow-[0_24px_55px_rgba(91,82,210,0.16)]"
      >

        <div
          className="pointer-events-none absolute -right-16 -top-16
          h-40 w-40 rounded-full bg-[#635bff]/10 blur-3xl
          opacity-0 transition-opacity duration-500
          group-hover:opacity-100"
        />

        <div className="relative z-10">

          <div className="flex items-start justify-between">

            <span className="text-sm font-semibold tracking-wide text-[#635bff]">
              03
            </span>

            <span
              className="text-xl text-[#8d899c]
              transition-all duration-500
              group-hover:translate-x-1
              group-hover:text-[#635bff]"
            >
              →
            </span>

          </div>


          {/* Icon */}
          <div
            className="mt-10 flex h-12 w-12 items-center justify-center
            rounded-2xl bg-[#eeecff] text-[#635bff]
            transition-all duration-500 ease-out
            group-hover:scale-110
            group-hover:rotate-3
            group-hover:bg-[#635bff]
            group-hover:text-white
            group-hover:shadow-[0_10px_25px_rgba(99,91,255,0.28)]"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="12" cy="12" r="8" />
              <path d="M12 8v4l3 2" />
            </svg>
          </div>


          <h3 className="mt-8 font-display text-2xl font-semibold text-[#171629]">
            Verify Sources
          </h3>

          <p className="mt-4 leading-7 text-[#77748b]">
            Follow citation pills back to the exact page and paragraph behind an answer.
          </p>


          <div
            className="mt-7 h-px w-0 bg-[#635bff]
            transition-all duration-500
            group-hover:w-12"
          />

        </div>
      </div>

    </div>
  </div>
</section>


      {/* =========================================================
          FEATURES
      ========================================================= */}
      <section
  id="features"
  className="relative overflow-hidden bg-[#f2f0ff] py-28"
>
  {/* Background glow */}
  <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-[#766cff]/10 blur-[120px]" />

  <div className="relative mx-auto max-w-6xl px-6">

    {/* Section heading */}
    <div className="max-w-2xl">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#635bff]">
        Built for documents
      </p>

      <h2 className="font-display text-4xl font-semibold tracking-tight text-[#171629] md:text-5xl">
        Understand more.
        <br />
        <span className="text-[#635bff]">Search less.</span>
      </h2>

      <p className="mt-6 max-w-xl text-lg leading-8 text-[#6d6a82]">
        SynapseOS keeps document AI simple: get answers, generate
        summaries, and verify every response against the source.
      </p>
    </div>

    {/* Feature cards */}
    <div className="mt-16 grid gap-6 md:grid-cols-3">

      {/* Card 1 */}
      <div className="group relative overflow-hidden rounded-[28px] border border-[#dedcf0] bg-white p-8 shadow-[0_10px_35px_rgba(50,45,100,0.06)] transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#c9c5ff] hover:shadow-[0_24px_60px_rgba(80,70,180,0.14)]">
        
        {/* Hover glow */}
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#635bff]/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative">
          <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eeecff] text-[#635bff] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#635bff] group-hover:text-white">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M4 5h16M4 12h16M4 19h10" />
            </svg>
          </div>

          <h3 className="font-display text-2xl font-semibold text-[#171629]">
            Source-grounded answers
          </h3>

          <p className="mt-4 leading-7 text-[#77748b]">
            Get answers directly connected to your documents so you
            can always understand where the information came from.
          </p>

          <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-[#635bff] opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
            Explore feature
            <span>→</span>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="group relative overflow-hidden rounded-[28px] border border-[#dedcf0] bg-white p-8 shadow-[0_10px_35px_rgba(50,45,100,0.06)] transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#c9c5ff] hover:shadow-[0_24px_60px_rgba(80,70,180,0.14)]">

        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#8b5cf6]/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative">
          <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eeecff] text-[#635bff] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#635bff] group-hover:text-white">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M4 5h16v14H4z" />
              <path d="M8 9h8M8 13h6" />
            </svg>
          </div>

          <h3 className="font-display text-2xl font-semibold text-[#171629]">
            One-click summaries
          </h3>

          <p className="mt-4 leading-7 text-[#77748b]">
            Turn long documents into clear key ideas without having
            to manually read through every page.
          </p>

          <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-[#635bff] opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
            Explore feature
            <span>→</span>
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="group relative overflow-hidden rounded-[28px] border border-[#dedcf0] bg-white p-8 shadow-[0_10px_35px_rgba(50,45,100,0.06)] transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#c9c5ff] hover:shadow-[0_24px_60px_rgba(80,70,180,0.14)]">

        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#635bff]/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative">
          <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eeecff] text-[#635bff] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#635bff] group-hover:text-white">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="12" cy="12" r="8" />
              <path d="M12 8v4l3 2" />
            </svg>
          </div>

          <h3 className="font-display text-2xl font-semibold text-[#171629]">
            Source inspector
          </h3>

          <p className="mt-4 leading-7 text-[#77748b]">
            Follow citations back to the original page and inspect
            the exact context before trusting an answer.
          </p>

          <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-[#635bff] opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
            Explore feature
            <span>→</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="relative overflow-hidden bg-white py-28">
  {/* Purple atmospheric glow */}
  <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#635bff]/10 blur-[130px]" />

  <div className="relative mx-auto max-w-4xl px-6 text-center">

    <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-[#635bff]">
      Start exploring
    </p>

    <h2 className="font-display text-4xl font-semibold tracking-tight text-[#171629] md:text-6xl">
      Your documents
      <br />
      have answers.
    </h2>

    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#77748b]">
      Upload a document and start asking questions with
      SynapseOS Lite. Find the information you need without
      digging through pages manually.
    </p>

    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

      <Link
        href="/signup"
        className="group flex items-center gap-2 rounded-full bg-[#635bff] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(99,91,255,0.28)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#554cf0] hover:shadow-[0_18px_40px_rgba(99,91,255,0.36)]"
      >
        Get Started
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </Link>

      <Link
        href="/#how-it-works"
        className="rounded-full border border-[#dddbea] bg-white px-7 py-3.5 text-sm font-semibold text-[#29273a] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c9c5ff] hover:bg-[#faf9ff] hover:shadow-md"
      >
        See how it works
      </Link>

    </div>

    {/* Small trust line */}
    <div className="mt-10 flex items-center justify-center gap-2 text-sm text-[#9290a2]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#635bff]" />
      Search · Summarize · Verify
    </div>

  </div>
</section>


      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="border-t border-[#29283a] bg-[#11101d] text-white">
  <div className="mx-auto max-w-6xl px-6 py-16">

    <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">

      {/* Brand */}
      <div>
        <Link
          href="/"
          className="group flex items-center gap-3"
        >
          {/* Small SynapseOS icon */}
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#6d63ff] to-[#8b5cf6] shadow-[0_6px_20px_rgba(99,91,255,0.28)] transition-transform duration-300 group-hover:-translate-y-0.5">

            <svg
              viewBox="0 0 40 40"
              fill="none"
              className="h-6 w-6"
            >
              <path
                d="M20 6C27.7 6 34 12.3 34 20C34 27.7 27.7 34 20 34C12.3 34 6 27.7 6 20C6 12.3 12.3 6 20 6Z"
                stroke="white"
                strokeWidth="1.4"
                strokeOpacity="0.4"
              />

              <path
                d="M20 20L12 12M20 20L28 12M20 20L12 28M20 20L28 28"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
              />

              <circle cx="12" cy="12" r="2.2" fill="white" />
              <circle cx="28" cy="12" r="2.2" fill="white" />
              <circle cx="12" cy="28" r="2.2" fill="white" />
              <circle cx="28" cy="28" r="2.2" fill="white" />

              <circle cx="20" cy="20" r="5" fill="white" />
              <circle cx="20" cy="20" r="2.2" fill="#635BFF" />
            </svg>

          </div>

          <span className="font-display text-lg font-semibold">
            SynapseOS{" "}
            <span className="text-[#827aff]">Lite</span>
          </span>
        </Link>

        <p className="mt-5 max-w-sm text-sm leading-7 text-[#9794a8]">
          Document intelligence made simple — search, summarize,
          and verify your files with source-grounded answers.
        </p>

        <div className="mt-6 flex items-center gap-2 text-xs text-[#6f6c80]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#635bff]" />
          Built for students & document-heavy workflows
        </div>
      </div>

      {/* Explore */}
      <div>
        <h3 className="mb-5 text-sm font-semibold text-white">
          Explore
        </h3>

        <div className="flex flex-col gap-3">
          <Link
            href="/#how-it-works"
            className="w-fit text-sm text-[#9996aa] transition-colors duration-200 hover:text-white"
          >
            How it works
          </Link>

          <Link
            href="/#features"
            className="w-fit text-sm text-[#9996aa] transition-colors duration-200 hover:text-white"
          >
            Features
          </Link>
        </div>
      </div>

      {/* Account */}
      <div>
        <h3 className="mb-5 text-sm font-semibold text-white">
          Account
        </h3>

        <div className="flex flex-col gap-3">
          <Link
            href="/login"
            className="w-fit text-sm text-[#9996aa] transition-colors duration-200 hover:text-white"
          >
            Sign In
          </Link>

          <Link
            href="/signup"
            className="w-fit text-sm text-[#9996aa] transition-colors duration-200 hover:text-white"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Project */}
      <div>
        <h3 className="mb-5 text-sm font-semibold text-white">
          Project
        </h3>

        <p className="text-sm leading-6 text-[#9996aa]">
          SynapseOS Lite
          <br />
          Student mini-project
        </p>
      </div>

    </div>

    {/* Bottom line */}
    <div className="mt-14 flex flex-col gap-4 border-t border-[#29283a] pt-6 text-xs text-[#706d80] sm:flex-row sm:items-center sm:justify-between">

      <p>
        © 2026 SynapseOS Lite · Student mini-project
      </p>

      <div className="flex gap-6">
        <Link
          href="/#how-it-works"
          className="transition-colors hover:text-white"
        >
          How it works
        </Link>

        <Link
          href="/login"
          className="transition-colors hover:text-white"
        >
          Sign In
        </Link>
      </div>

    </div>

  </div>
</footer>
          

    </div>
  );
}