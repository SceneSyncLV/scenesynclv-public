"use client";
import { supabase } from "../lib/supabase";
import Image from "next/image";
import { useEffect, useState } from "react";
import Map from "../components/Map";
import Filters from '../components/Filters';
import EventCard from '../components/EventCard';
import AlertForm from '../components/AlertForm';
import AdBanner from '../components/AdBanner';
import SearchBar from '../components/SearchBar';
import SortSelect from '../components/SortSelect';
import EventSkeleton from '../components/EventSkeleton';
import InfiniteScroll from 'react-infinite-scroll-component';
import type { Event } from "../lib/types";

type SortOpt = "dateAsc" | "dateDesc" | "priceAsc" | "priceDesc";

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [genreFilter, setGenreFilter] = useState("");
  const [cheapOnly, setCheapOnly] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState<SortOpt>("dateAsc");
  const [offset, setOffset] = useState(0);
  const PAGE_SIZE = 20;

  useEffect(() => {
    // Load filters from localStorage
    const g = typeof window !== 'undefined' ? localStorage.getItem('genre') : null;
    const c = typeof window !== 'undefined' ? localStorage.getItem('cheap') : null;
    if (g) setGenreFilter(g);
    if (c) setCheapOnly(c === '1');
  }, []);
  useEffect(() => { if (typeof window !== 'undefined') localStorage.setItem('genre', genreFilter ?? ''); }, [genreFilter]);
  useEffect(() => { if (typeof window !== 'undefined') localStorage.setItem('cheap', cheapOnly ? '1' : '0'); }, [cheapOnly]);

  useEffect(() => {
    async function fetchInitial() {
      const { data } = await supabase.from('events').select('*').order('starts_at', { ascending: true }).range(0, PAGE_SIZE - 1);
      setEvents(data || []);
      setOffset(PAGE_SIZE);
      setHasMore((data?.length || 0) === PAGE_SIZE);
    }
    fetchInitial();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  const genres = Array.from(new Set((events || []).map(e => e.genre).filter(Boolean)));
  const filtered = (events || []).filter(e =>
    (!genreFilter || e.genre === genreFilter) &&
    (!cheapOnly || (e.price && !isNaN(parseFloat(e.price)) && parseFloat(e.price) <= 15)) &&
    (!searchTerm || e.title.toLowerCase().includes(searchTerm.toLowerCase()) || e.venue_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case "dateAsc": return +new Date(a.starts_at) - +new Date(b.starts_at);
      case "dateDesc": return +new Date(b.starts_at) - +new Date(a.starts_at);
      case "priceAsc": return (+a.price || 1e9) - (+b.price || 1e9);
      case "priceDesc": return (+b.price || 0) - (+a.price || 0);
    }
  });

  async function fetchNext() {
    const { data } = await supabase.from('events').select('*').order('starts_at', { ascending: true }).range(offset, offset + PAGE_SIZE - 1);
    setEvents(prev => [...(prev || []), ...(data || [])]);
    setOffset(prev => prev + PAGE_SIZE);
    setHasMore((data?.length || 0) === PAGE_SIZE);
  }

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Las Vegas Events</h1>
      {user && <AlertForm genres={genres} />}
      <div className="flex flex-col md:flex-row md:items-center mb-2">
        <div className="flex-1">
          <SearchBar term={searchTerm} setTerm={setSearchTerm} />
        </div>
        <SortSelect sort={sort} setSort={setSort} />
      </div>
      <Filters
        genres={genres}
        genre={genreFilter}
        setGenre={setGenreFilter}
        cheap={cheapOnly}
        setCheap={setCheapOnly}
      />
      <InfiniteScroll
        dataLength={sorted.length}
        next={fetchNext}
        hasMore={hasMore}
        loader={<EventSkeleton />}
      >
        <div className="grid gap-4 md:grid-cols-3">
          {sorted.length === 0 ? (
            <div className="col-span-3">No events found.</div>
          ) : (
            sorted.map((event, idx) => [
              <EventCard key={event.id} event={event} idx={idx} />, (idx + 1) % 4 === 0 ? <AdBanner key={`ad-${idx}`} /> : null
            ])
          )}
        </div>
      </InfiniteScroll>
      <div className="my-8">
        <Map />
      </div>
    </main>
  );
}
