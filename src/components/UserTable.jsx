const headers = [
  { key: 'first_name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'id', label: 'ID', sortable: false },
];

function SortIcon({ active, direction }) {
  if (!active) {
    return <span className="text-slate-400">↕</span>;
  }

  return (
    <span className="text-slate-900">
      {direction === 'asc' ? <span>↑</span> : <span>↓</span>}
    </span>
  );
}

export default function UserTable({ users, sortKey, sortDirection, onSort }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            {headers.map(({ key, label, sortable }) => (
              <th
                key={key}
                scope="col"
                className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wide text-slate-500"
              >
                {sortable ? (
                  <button
                    type="button"
                    onClick={() => onSort(key)}
                    className="flex items-center gap-2 text-slate-700 hover:text-slate-900"
                  >
                    {label}
                    <SortIcon active={sortKey === key} direction={sortDirection} />
                  </button>
                ) : (
                  label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white text-sm text-slate-700">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-slate-50">
              <td className="flex items-center gap-3 px-4 py-4">
                <img
                  src={user.avatar}
                  alt={user.fullName}
                  className="h-12 w-12 rounded-full border border-slate-200 object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="font-semibold text-slate-900">{user.fullName}</p>
                  <p className="text-xs text-slate-500">{user.first_name}</p>
                </div>
              </td>
              <td className="px-4 py-4">
                <a
                  href={`mailto:${user.email}`}
                  className="font-medium text-sky-600 hover:underline"
                >
                  {user.email}
                </a>
              </td>
              <td className="px-4 py-4 font-mono text-xs text-slate-500">{user.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


