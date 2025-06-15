"use client";
import { signInAnon } from "../../lib/supabase";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white">
      <h1 className="text-2xl font-bold mb-4">Sign in to enable alerts</h1>
      <button
        className="bg-gray-900 px-6 py-3 rounded text-white font-semibold hover:bg-gray-800"
        onClick={() => signInAnon()}
      >
        Sign in with GitHub
      </button>
    </main>
  );
}
