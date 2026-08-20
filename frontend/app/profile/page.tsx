"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function ProfilePage() {
  const [name] = useState("Neha Mishra");
  const [email] = useState("neha@example.com");

  return (
    <div className="min-h-screen bg-[var(--color-paper]">
      <Navbar />
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-md">
          <h1 className="font-display mb-6 text-2xl font-semibold text-[var(--color-ink]">
            Your Profile
          </h1>

          <div className="mb-4">
            <p className="text-sm font-medium text-[var(--color-ink]/50">Full Name</p>
            <p className="text-[var(--color-ink]">{name}</p>
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium text-[var(--color-ink]/50">Email</p>
            <p className="text-[var(--color-ink]">{email}</p>
          </div>

          <a href="/dashboard" className="block text-center text-sm text-[var(--color-highlight] hover:underline">
            Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}