
"use client";

import { useState } from "react";
import Link from "next/link";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <div className="flex h-screen w-16 flex-shrink-0 flex-col items-center border-r border-[var(--color-line)] bg-[var(--color-surface)] py-4">
        <button
          onClick={() => setCollapsed(false)}
          className="rounded-lg p-2 text-[var(--color-ink)] hover:bg-[var(--color-line)]/40"
          title="Expand sidebar"
        >
          »
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-64 flex-shrink-0 flex-col border-r border-[var(--color-line)] bg-[var(--color-surface)]">
      <div className="flex items-center justify-between p-4">
        <Link
          href="/dashboard"
          className="font-display text-lg font-semibold text-[var(--color-ink)]"
        >
          SynapseOS{" "}
          <span className="text-[var(--color-highlight)]">Lite</span>
        </Link>

        <button
          onClick={() => setCollapsed(true)}
          className="rounded-lg p-1.5 text-[var(--color-ink)]/60 hover:bg-[var(--color-line)]/40"
          title="Collapse sidebar"
        >
          «
        </button>
      </div>

      <div className="flex-1 px-3 py-4">
        <p className="text-sm text-[var(--color-ink)]/50">
          Your workspace
        </p>
      </div>

      <div className="border-t border-[var(--color-line)] p-3">
        <Link
          href="/profile"
          className="mb-1 block rounded-lg px-2 py-2 text-sm text-[var(--color-ink)] hover:bg-[var(--color-line)]/30"
        >
          Profile
        </Link>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="block w-full rounded-lg px-2 py-2 text-left text-sm text-[var(--color-ink)]/60 hover:bg-[var(--color-line)]/30"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
