import Image from "next/image";

interface EventCardProps {
  event: any;
  idx: number;
}

export default function EventCard({ event, idx }: EventCardProps) {
  return (
    <div className="rounded bg-slate-800 p-4 text-white">
      <p className="text-lg font-bold">Placeholder EventCard #{idx + 1}</p>
      <pre className="text-xs whitespace-pre-wrap break-words mt-2">
        {JSON.stringify(event, null, 2)}
      </pre>
    </div>
  );
}
