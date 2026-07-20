import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(getApiUrl('users'));
        if (!response.ok) throw new Error('Failed to load users');
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.results ?? [];
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Users</h2>
        {loading && <p className="text-muted">Loading...</p>}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && (
          <ul className="list-group list-group-flush">
            {users.map((user) => (
              <li className="list-group-item" key={user._id ?? user.id ?? user.email ?? user.name}>
                <strong>{user.name}</strong> - {user.role}
                <div className="text-muted small">{user.email}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
