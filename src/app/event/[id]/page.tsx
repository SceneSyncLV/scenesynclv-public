import { supabase } from '../../../lib/supabase';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  const { data: event } = await supabase.from('events').select('*').eq('id', params.id).single();
  if (!event) return notFound();
  return (
    <main className="max-w-xl mx-auto p-6">
      <div className="mb-4">
        {event.flyer_url ? (
          <Image src={event.flyer_url} alt={event.title} width={600} height={400} className="rounded w-full h-auto object-cover" />
        ) : (
          <div className="w-full h-64 bg-slate-700 flex items-center justify-center rounded text-gray-400">No Image</div>
        )}
      </div>
      <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
      <div className="mb-2 text-gray-300">{event.venue_name}</div>
      <div className="mb-2">{new Date(event.starts_at).toLocaleString()}</div>
      <div className="mb-2">{event.genre && <span className="inline-block px-2 py-1 bg-slate-900 rounded mr-2">{event.genre}</span>}</div>
      <div className="mb-4 text-lg font-semibold">{event.price ? `$${event.price}` : 'FREE'}</div>
      <ShareButton eventId={event.id} />
    </main>
  );
}

function ShareButton({ eventId }: { eventId: string }) {
  const url = typeof window !== 'undefined' ? window.location.href : `${process.env.NEXT_PUBLIC_BASE_URL}/event/${eventId}`;
  async function handleShare() {
    if (navigator.share) {
      await navigator.share({ url });
    } else {
      await navigator.clipboard.writeText(url);
      alert('Link copied!');
    }
  }
  return (
    <button onClick={handleShare} aria-label="Share event" className="mt-4 px-4 py-2 rounded bg-emerald-600 text-white font-bold hover:bg-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-400">Share</button>
  );
}
