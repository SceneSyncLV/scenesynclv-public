import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

interface FiltersProps {
  genres: (string | null)[];
  genre: string | null;
  setGenre: (g: string | null) => void;
  cheap: boolean;
  setCheap: (b: boolean) => void;
}

export default function Filters({ genres, genre, setGenre, cheap, setCheap }: FiltersProps) {
  return (
    <div className="flex gap-2 flex-wrap items-center mb-4">
      <select
        className="border rounded px-2 py-1"
        value={genre || ""}
        onChange={e => setGenre(e.target.value || null)}
      >
        <option value="">All Genres</option>
        {genres.filter(Boolean).map(g => (
          <option key={g!} value={g!}>{g}</option>
        ))}
      </select>
      <label className="flex items-center gap-1 cursor-pointer">
        <input
          type="checkbox"
          checked={cheap}
          onChange={e => setCheap(e.target.checked)}
        />
        <span>Cheap only (≤ $15)</span>
      </label>
    </div>
  );
}
