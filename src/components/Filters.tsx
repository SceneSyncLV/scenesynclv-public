import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface FiltersProps {
  genre: string;
  setGenre: (g: string) => void;
  cheapOnly: boolean;
  setCheapOnly: (c: boolean) => void;
}

export default function Filters({ genre, setGenre, cheapOnly, setCheapOnly }: FiltersProps) {
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    async function fetchGenres() {
      const { data, error } = await supabase.from("events").select("genre");
      if (!error && data) {
        setGenres(Array.from(new Set(data.map((e: any) => e.genre).filter(Boolean))));
      }
    }
    fetchGenres();
  }, []);

  return (
    <div className="flex gap-2 flex-wrap items-center mb-4">
      <select
        className="border rounded px-2 py-1"
        value={genre}
        onChange={e => setGenre(e.target.value)}
      >
        <option value="">All Genres</option>
        {genres.map(g => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>
      <label className="flex items-center gap-1 cursor-pointer">
        <input
          type="checkbox"
          checked={cheapOnly}
          onChange={e => setCheapOnly(e.target.checked)}
        />
        <span>Cheap only (≤ $15)</span>
      </label>
    </div>
  );
}
