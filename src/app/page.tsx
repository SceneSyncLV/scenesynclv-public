"use client";
import { supabase } from "../lib/supabase";
import Image from "next/image";
import { useEffect, useState } from "react";
import Map from "../components/Map";
import Filters from '../components/Filters';
import EventCard from '../components/EventCard';

function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

export default async function Home() {
  const [events, setEvents] = useState<any[]>([]);
  const [genreFilter, setGenreFilter] = useState("");
  const [cheapOnly, setCheapOnly] = useState(false);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      let { data, error } = await supabase.from("events").select();
      if (!error) setEvents(data || []);
      setLoading(false);
    }
    fetchEvents();
  }, []);

  const genres = unique(events.map((e) => e.genre).filter(Boolean));
  const filtered = events.filter((e) =>
    (!genreFilter || e.genre === genreFilter) &&
    (!date || e.date === date) &&
    (!cheapOnly || parseFloat(e.price) <= 15)
  );

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Las Vegas Events</h1>
      <Filters
        genre={genreFilter}
        setGenre={setGenreFilter}
        cheapOnly={cheapOnly}
        setCheapOnly={setCheapOnly}
      />
      <div className="flex gap-2 mb-4 flex-wrap">
        <input
          type="date"
          className="border rounded px-2 py-1"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="grid gap-4">
        {loading ? (
          <div>Loading…</div>
        ) : filtered.length === 0 ? (
          <div>No events found.</div>
        ) : (
          filtered.map((event, idx) => (
            <EventCard key={event.id} event={event} idx={idx} />
          ))
        )}
      </div>
      <div className="my-8">
        <Map />
      </div>
    </main>
  );
}
