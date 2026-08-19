"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface ChatHistoryItem {
  id: string;
  docName: string;
  lastMessage: string;
  date: string;
}

const historyData: ChatHistoryItem[] = [
  { id: "1", docName: "Research_Paper.pdf", lastMessage: "Summarized the methodology section", date: "12 Aug" },
  { id: "2", docName: "Lecture_Notes.pdf", lastMessage: "Asked about chapter 4", date: "10 Aug" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeDoc = searchParams.get("doc");

  const filtered = historyData.filter((item) =>
    item.docName.toLowerCase().includes(search.toLowerCase())
  );

  if (collapsed) {
    return (
      <div className="flex h-screen w-16 flex-shrink-0 flex-col items-center border-r border-[var(--color-line)] bg-[var(--color-surface)] py-4">
        <button
          onClick={() => setCollapsed(false)}
          className="mb-6 rounded-lg p-2 text-[var(--color-ink)] hover:bg-[var(--color-line)]/40"
          title="Expand sidebar"
        >
          »
        </button>
        <Link
          href="/upload"
          className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-ink)] text-[var(--color-paper)]"
          title="New document"
        >
          +
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-64 flex-shrink-0 flex-col border-r border-[var(--color-line)] bg-[var(--color-surface)]">
      <div className="flex items-center justify-between p-4">
        <Link href="/dashboard" className="font-display text-lg font-semibold text-[var(--color-ink)]">
          SynapseOS <span className="text-[var(--color-highlight)]">Lite</span>
        </Link>
        <button
          onClick={() => setCollapsed(true)}
          className="rounded-lg p-1.5 text-[var(--color-ink)]/60 hover:bg-[var(--color-line)]/40"
          title="Collapse sidebar"
        >
          «
        </button>
      </div>

      <div className="px-3">
        <Link
          href="/upload"
          className="mb-3 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-ink)] py-2 text-sm font-medium text-[var(--color-paper)] hover:opacity-90"
        >
          + New document
        </Link>
      </div>

      <div className="px-3 pb-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search chats..."
          className="w-full rounded-lg border border-[var(--color-line)] bg-white px-3 py-1.5 text-sm focus:border-[var(--color-highlight)] focus:outline-none"
        />
      </div>

      <div className="flex-1 overflow-y-auto px-2">
        <p className="mb-1 px-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-ink)]/40">
          Chat History
        </p>
        {filtered.length === 0 ? (
          <p className="px-2 py-4 text-sm text-[var(--color-ink)]/40">No chats found.</p>
        ) : (
          filtered.map((item) => {
            const isActive = item.id === activeDoc && pathname === "/chat";
            const linkClass = isActive
              ? "mb-1 block rounded-lg bg-[var(--color-highlight)]/20 p-2.5 text-sm"
              : "mb-1 block rounded-lg p-2.5 text-sm hover:bg-[var(--color-line)]/30";
            return (
              <Link key={item.id} href={"/chat?doc=" + item.id} className={linkClass}>
                <p className="truncate font-medium text-[var(--color-ink)]">{item.docName}</p>
                <p className="truncate text-xs text-[var(--color-ink)]/50">{item.lastMessage}</p>
              </Link>
            );
          })
        )}
      </div>

      <div className="border-t border-[var(--color-line)] p-3">
        <Link href="/profile" className="mb-1 block rounded-lg px-2 py-2 text-sm text-[var(--color-ink)] hover:bg-[var(--color-line)]/30">
          Profile
        </Link>
        <Link href="/login" className="block rounded-lg px-2 py-2 text-sm text-[var(--color-ink)]/60 hover:bg-[var(--color-line)]/30">
          Log out
        </Link>
      </div>
    </div>
  );
}