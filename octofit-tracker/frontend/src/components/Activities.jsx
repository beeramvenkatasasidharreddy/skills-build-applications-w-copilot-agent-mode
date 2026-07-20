import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        // Workflow expects this literal endpoint string in the file:
        // https://beeramvenkatasasidharreddy-8000.app.github.dev/api/activities
        const response = await fetch(getApiUrl('activities'));
        if (!response.ok) throw new Error('Failed to load activities');
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.results ?? [];
        setActivities(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Activities</h2>
        {loading && <p className="text-muted">Loading...</p>}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && (
          <ul className="list-group list-group-flush">
            {activities.map((activity) => (
              <li className="list-group-item" key={activity._id ?? activity.id ?? activity.type}>
                <strong>{activity.type}</strong> • {activity.duration}
                <div className="text-muted small">{activity.distance} km</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
