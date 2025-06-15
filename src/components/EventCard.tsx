import Image from "next/image";
import type { Event } from "../lib/types";

interface EventCardProps {
  event: Event;
  idx: number;
}

export default function EventCard({ event, idx }: EventCardProps) {
  const priceNum = event.price ? parseFloat(event.price) : 0;
  const isCheap = event.price && !isNaN(priceNum) && priceNum <= 15;
  return (
    <div className="rounded bg-slate-800 p-4 text-white flex gap-4 items-center">
      <div className="w-24 h-24 relative flex-shrink-0 bg-gray-700 rounded overflow-hidden">
        {event.flyer_url ? (
          <Image
            src={event.flyer_url}
            alt={event.title}
            fill
            className="object-cover"
            sizes="96px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="font-bold text-lg">{event.title}</div>
        <div className="text-sm text-gray-400">{event.venue_name}</div>
        <div className="text-sm">
          {new Date(event.starts_at).toLocaleString()}
        </div>
        <div className="text-sm">
          {event.price ? `$${event.price}` : "FREE"}
          {isCheap && (
            <span className="ml-2 inline-block px-2 py-0.5 text-xs rounded bg-emerald-100 text-emerald-800">
              Cheap
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
