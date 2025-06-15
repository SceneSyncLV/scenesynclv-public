type SortOpt = "dateAsc" | "dateDesc" | "priceAsc" | "priceDesc";
interface Props { sort: SortOpt; setSort: (s: SortOpt) => void; }
export default function SortSelect({ sort, setSort }: Props) {
  return (
    <select value={sort} onChange={e => setSort(e.target.value as SortOpt)}
      className="rounded bg-slate-800 px-3 py-2 mb-4 ml-4">
      <option value="dateAsc">Date ↑</option>
      <option value="dateDesc">Date ↓</option>
      <option value="priceAsc">Price ↑</option>
      <option value="priceDesc">Price ↓</option>
    </select>
  );
}
