"use client";
import { supabase } from "../lib/supabase";
import Image from "next/image";
import { useEffect, useState } from "react";
import Map from "../components/Map";
import Filters from '../components/Filters';
import EventCard from '../components/EventCard';
import type { Event } from "../lib/types";

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [genreFilter, setGenreFilter] = useState("");
  const [cheapOnly, setCheapOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      const { data } = await supabase.from('events').select('*').order('starts_at', { ascending: true });
      setEvents(data || []);
      setLoading(false);
    }
    fetchEvents();
  }, []);

  const genres = Array.from(new Set(events.map(e => e.genre).filter(Boolean)));
  const filtered = events.filter(e =>
    (!genreFilter || e.genre === genreFilter) &&
    (!cheapOnly || (e.price && !isNaN(parseFloat(e.price)) && parseFloat(e.price) <= 15))
  );

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Las Vegas Events</h1>
      <Filters
        genres={genres}
        onGenre={setGenreFilter}
        cheapOnly={cheapOnly}
        onCheap={setCheapOnly}
      />
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
