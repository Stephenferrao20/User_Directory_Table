import { useCallback, useEffect, useState } from 'react';

const API_URL = 'https://reqres.in/api/users';
const REQUEST_OPTIONS = {
  headers: {
    'x-api-key': 'reqres-free-v1',
  },
};

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const firstResponse = await fetch(`${API_URL}?page=1&per_page=6`, REQUEST_OPTIONS);

      if (!firstResponse.ok) {
        throw new Error('Failed to fetch users');
      }

      const firstJson = await firstResponse.json();
      const totalPages = firstJson.total_pages ?? 1;
      const requests = [];

      for (let page = 2; page <= totalPages; page += 1) {
        requests.push(
          fetch(`${API_URL}?page=${page}&per_page=6`, REQUEST_OPTIONS).then((res) => {
            if (!res.ok) {
              throw new Error('Failed to fetch users');
            }
            return res.json();
          }),
        );
      }

      const remaining = await Promise.all(requests);
      const consolidated = [firstJson, ...remaining]
        .map((payload) => payload.data ?? [])
        .flat()
        .map((user) => ({
          ...user,
          fullName: `${user.first_name} ${user.last_name}`.trim(),
        }));

      setUsers(consolidated);
    } catch (err) {
      setError(err.message || 'Unable to fetch users.');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, error, refetch: fetchUsers };
}

