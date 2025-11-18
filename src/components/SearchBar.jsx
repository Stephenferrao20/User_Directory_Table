export default function SearchBar({ value, onChange }) {
  return (
    <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
      Search
      <input
        type="search"
        placeholder="Search by name or email"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-base font-normal text-slate-900 shadow-sm transition focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
      />
    </label>
  );
}


