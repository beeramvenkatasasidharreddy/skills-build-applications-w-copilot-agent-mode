import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(getApiUrl('leaderboard'));
        if (!response.ok) throw new Error('Failed to load leaderboard');
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.results ?? [];
        setEntries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Leaderboard</h2>
        {loading && <p className="text-muted">Loading...</p>}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && (
          <ol className="list-group list-group-numbered">
            {entries.map((entry) => (
              <li className="list-group-item" key={entry._id ?? entry.id ?? entry.name}>
                <strong>{entry.name}</strong> — {entry.points} pts
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
