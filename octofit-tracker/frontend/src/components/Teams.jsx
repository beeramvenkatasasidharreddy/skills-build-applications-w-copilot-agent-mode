import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(getApiUrl('teams'));
        if (!response.ok) throw new Error('Failed to load teams');
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.results ?? [];
        setTeams(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Teams</h2>
        {loading && <p className="text-muted">Loading...</p>}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && (
          <ul className="list-group list-group-flush">
            {teams.map((team) => (
              <li className="list-group-item" key={team._id ?? team.id ?? team.name}>
                <strong>{team.name}</strong>
                <div className="text-muted small">{team.sport} • {team.goal}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
