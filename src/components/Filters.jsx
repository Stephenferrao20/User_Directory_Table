export default function Filters({
  domains,
  domainValue,
  onDomainChange,
  initials,
  initialValue,
  onInitialChange,
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
        Email domain
        <select
          value={domainValue}
          onChange={(event) => onDomainChange(event.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-base font-normal text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
        >
          <option value="all">All domains</option>
          {domains.map((domain) => (
            <option key={domain} value={domain}>
              {domain}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
        First letter
        <select
          value={initialValue}
          onChange={(event) => onInitialChange(event.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-base font-normal text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
        >
          <option value="all">All letters</option>
          {initials.map((letter) => (
            <option key={letter} value={letter}>
              {letter}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}


