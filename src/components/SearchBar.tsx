import { useState, useEffect } from "react";
interface Props { term: string; setTerm: (s: string) => void; }
export default function SearchBar({ term, setTerm }: Props) {
  const [local, setLocal] = useState(term);
  useEffect(() => {
    const id = setTimeout(() => setTerm(local), 500);
    return () => clearTimeout(id);
  }, [local]);
  return (
    <input
      value={local}
      onChange={e => setLocal(e.target.value)}
      placeholder="Search title or venue…"
      className="w-full rounded bg-slate-800 px-3 py-2 mb-4"
    />
  );
}
