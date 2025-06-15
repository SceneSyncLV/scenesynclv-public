"use client";

import { signInGitHub } from "../../lib/supabase";

export default function LoginPage() {
  return (
    <main className="flex h-screen items-center justify-center bg-slate-950 text-white">
      <button
        onClick={signInGitHub}
        className="rounded bg-emerald-600 px-6 py-3 text-lg font-semibold hover:bg-emerald-700"
      >
        Sign in with GitHub
      </button>
    </main>
  );
}
