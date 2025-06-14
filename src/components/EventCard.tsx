import Image from "next/image";

export default function EventCard({ event, idx }: { event: any; idx: number }) {
  const priceParsed = parseFloat(event.price);
  return (
    <div className="bg-white rounded shadow p-4 flex gap-4 items-center mb-4">
      <div className="w-24 h-24 relative flex-shrink-0">
        <Image
          src={event.flyer_url || "/placeholder.png"}
          alt={event.title}
          fill
          className="object-cover rounded"
          sizes="96px"
        />
      </div>
      <div className="flex-1">
        <div className="font-bold text-lg">{event.title}</div>
        <div className="text-sm text-gray-500">{event.venue_name}</div>
        <div className="text-sm">{event.date}</div>
        <div className="text-xs text-gray-400">{event.genre}</div>
        {priceParsed <= 15 && (
          <span className="inline-block px-2 py-0.5 text-xs rounded bg-emerald-100 text-emerald-800 badge-emerald ml-1">Cheap</span>
        )}
      </div>
      {((idx + 1) % 4 === 0) && (
        <div className="w-full flex justify-center mt-4">
          <div id={`ad-${idx}`} className="bg-gray-200 rounded shadow flex items-center justify-center" style={{ width: 300, height: 250 }}>
            <span className="text-gray-400">Ad Slot</span>
          </div>
        </div>
      )}
    </div>
  );
}
