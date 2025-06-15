import { useState } from "react";
import type { AlertPref } from "../lib/types";
import { supabase } from "../lib/supabase";

interface AlertFormProps {
  genres: (string | null)[];
}

export default function AlertForm({ genres }: AlertFormProps) {
  const [genre, setGenre] = useState<string | null>("");
  const [cheapOnly, setCheapOnly] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSave() {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
      setMessage("You must be signed in.");
      return;
    }
    const { error } = await supabase.from("alert_prefs").upsert({
      user_id: user.id,
      genre,
      cheap_only: cheapOnly,
    });
    setMessage(error ? error.message : "Alert preference saved!");
  }

  return (
    <form className="mb-6 p-4 bg-slate-800 rounded flex flex-col gap-2" onSubmit={e => { e.preventDefault(); handleSave(); }}>
      <label className="flex flex-col">
        Genre
        <select className="border rounded px-2 py-1 mt-1" value={genre ?? ""} onChange={e => setGenre(e.target.value || null)}>
          <option value="">All Genres</option>
          {genres.filter(Boolean).map(g => (
            <option key={g!} value={g!}>{g}</option>
          ))}
        </select>
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={cheapOnly} onChange={e => setCheapOnly(e.target.checked)} />
        Cheap only (≤ $15)
      </label>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save Alert</button>
      {message && <div className="text-xs text-green-400 mt-1">{message}</div>}
    </form>
  );
}
