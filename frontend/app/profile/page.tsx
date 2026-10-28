
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import api from "@/lib/api";

interface UserProfile {
  id: number;
  username: string;
  email: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/auth/me");
        setUser(response.data);
      } catch (err: any) {
        console.error("Profile fetch error:", err);

        if (err.response?.status === 401) {
          setError("Your session has expired. Please log in again.");
        } else {
          setError("Unable to load your profile. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-paper)]">
      <Navbar />

      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-md">
          <h1 className="font-display mb-6 text-2xl font-semibold text-[var(--color-ink)]">
            Your Profile
          </h1>

          {loading ? (
            <p className="text-sm text-gray-500">
              Loading profile...
            </p>
          ) : error ? (
            <div className="mb-6 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
              <Link
                href="/login"
                className="mt-2 block font-medium underline"
              >
                Go to Login
              </Link>
            </div>
          ) : user ? (
            <>
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500">
                  Username
                </p>
                <p className="break-words text-[var(--color-ink)]">
                  {user.username || "Username not provided"}
                </p>
              </div>

              <div className="mb-6">
                <p className="text-sm font-medium text-gray-500">
                  Email
                </p>
                <p className="break-words text-[var(--color-ink)]">
                  {user.email || "Email not provided"}
                </p>
              </div>
            </>
          ) : (
            <p className="mb-6 text-sm text-gray-500">
              No profile information found.
            </p>
          )}

          <Link
            href="/dashboard"
            className="block text-center text-sm text-[var(--color-highlight)] hover:underline"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
