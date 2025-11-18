import { useEffect, useMemo, useState } from 'react';
import Filters from './components/Filters';
import LoadingSpinner from './components/LoadingSpinner';
import Pagination from './components/Pagination';
import SearchBar from './components/SearchBar';
import UserTable from './components/UserTable';
import { useUsers } from './hooks/useUsers';

const PAGE_SIZE = 5;

function App() {
  const { users, loading, error, refetch } = useUsers();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState('first_name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [domainFilter, setDomainFilter] = useState('all');
  const [initialFilter, setInitialFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, domainFilter, initialFilter]);

  const emailDomains = useMemo(() => {
    const domains = new Set(
      users
        .map((user) => user.email.split('@')[1]?.toLowerCase())
        .filter(Boolean),
    );
    return Array.from(domains).sort();
  }, [users]);

  const initials = useMemo(() => {
    const letters = new Set(
      users.map((user) => user.first_name?.[0]?.toUpperCase()).filter(Boolean),
    );
    return Array.from(letters).sort();
  }, [users]);

  const filteredUsers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return users.filter((user) => {
      const matchesQuery =
        !query ||
        user.fullName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query);

      const domain = user.email.split('@')[1]?.toLowerCase();
      const matchesDomain = domainFilter === 'all' || domain === domainFilter;

      const initial = user.first_name?.[0]?.toUpperCase();
      const matchesInitial = initialFilter === 'all' || initial === initialFilter;

      return matchesQuery && matchesDomain && matchesInitial;
    });
  }, [users, searchQuery, domainFilter, initialFilter]);

  const sortedUsers = useMemo(() => {
    const sortable = [...filteredUsers];
    sortable.sort((a, b) => {
      const valueA = a[sortKey]?.toLowerCase?.() ?? '';
      const valueB = b[sortKey]?.toLowerCase?.() ?? '';
      if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    return sortable;
  }, [filteredUsers, sortKey, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sortedUsers.length / PAGE_SIZE));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const pagedUsers = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sortedUsers.slice(start, start + PAGE_SIZE);
  }, [sortedUsers, currentPage]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Directory
          </p>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            User Directory Table
          </h1>
          <p className="text-base text-slate-600">
            Search, sort, filter, and paginate through users returned by the ReqRes API.
          </p>
        </header>

        <section className="space-y-6 rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
          <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <Filters
              domains={emailDomains}
              domainValue={domainFilter}
              onDomainChange={setDomainFilter}
              initials={initials}
              initialValue={initialFilter}
              onInitialChange={setInitialFilter}
            />
          </div>

          {loading && <LoadingSpinner />}

          {!loading && error && (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-rose-100 bg-rose-50/60 px-6 py-10 text-center">
              <p className="text-sm font-medium text-rose-700">{error}</p>
              <button
                type="button"
                onClick={refetch}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-slate-900/20"
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && pagedUsers.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm font-medium text-slate-600">
              No users match the current filters.
            </div>
          )}

          {!loading && !error && pagedUsers.length > 0 && (
            <>
              <UserTable
                users={pagedUsers}
                sortKey={sortKey}
                sortDirection={sortDirection}
                onSort={handleSort}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
