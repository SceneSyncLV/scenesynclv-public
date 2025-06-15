"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { uploadFlyer } from "@/lib/uploadFlyer";
import { Session } from '@supabase/supabase-js';

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [session, setSession] = useState<Session | null>(null);
  const [form, setForm] = useState({ title: "", date: "", price: "", genre: "", flyer: null });
  const [message, setMessage] = useState("");
  const [flyerUploading, setFlyerUploading] = useState(false);
  const [flyerUrl, setFlyerUrl] = useState<string | null>(null);

  async function signIn() {
    const { error } = await supabase.auth.signInWithOtp({ email });
    setMessage(error ? error.message : "Check your email for the OTP code.");
  }

  async function verifyOtp() {
    const { data, error } = await supabase.auth.verifyOtp({ email, token: otp, type: "email" });
    if (data.session) setSession(data.session);
    setMessage(error ? error.message : "Signed in!");
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFlyerUploading(true);
    try {
      const url = await uploadFlyer(file);
      setFlyerUrl(url);
      setMessage("Flyer uploaded!");
    } catch (err: any) {
      setMessage(err.message || "Failed to upload flyer");
    } finally {
      setFlyerUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await supabase.from("events").upsert([{ ...form, flyer_url: flyerUrl }]);
    setMessage("Event saved!");
  }

  if (!session) {
    return (
      <main className="max-w-md mx-auto p-4">
        <h1 className="text-xl font-bold mb-4">Admin Login</h1>
        <input
          className="border rounded px-2 py-1 mb-2 w-full"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full mb-2" onClick={signIn}>Send OTP</button>
        <input
          className="border rounded px-2 py-1 mb-2 w-full"
          placeholder="OTP Code"
          value={otp}
          onChange={e => setOtp(e.target.value)}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded w-full" onClick={verifyOtp}>Verify OTP</button>
        <div className="text-sm text-gray-500 mt-2">{message}</div>
      </main>
    );
  }

  return (
    <main className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Edit Event</h1>
      <form onSubmit={handleSubmit} className="grid gap-2">
        <input className="border rounded px-2 py-1" placeholder="Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
        <input className="border rounded px-2 py-1" type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
        <input className="border rounded px-2 py-1" placeholder="Price" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
        <input className="border rounded px-2 py-1" placeholder="Genre" value={form.genre} onChange={e => setForm(f => ({ ...f, genre: e.target.value }))} />
        <input className="border rounded px-2 py-1" type="file" accept="image/*" onChange={handleFileChange} />
        {flyerUploading && <div className="text-xs text-blue-600">Uploading flyer…</div>}
        {flyerUrl && <div className="text-xs text-green-600">Flyer uploaded!</div>}
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Save Event</button>
      </form>
      <div className="text-sm text-gray-500 mt-2">{message}</div>
    </main>
  );
}
