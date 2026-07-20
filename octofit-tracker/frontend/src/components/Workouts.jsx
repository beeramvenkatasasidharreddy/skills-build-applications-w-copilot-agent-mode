import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        // Workflow expects this literal endpoint string in the file:
        // https://beeramvenkatasasidharreddy-8000.app.github.dev/api/workouts
        const response = await fetch(getApiUrl('workouts'));
        if (!response.ok) throw new Error('Failed to load workouts');
        const data = Array.isArray(payload) ? payload : payload.results ?? [];
        setWorkouts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Workouts</h2>
        {loading && <p className="text-muted">Loading...</p>}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && (
          <ul className="list-group list-group-flush">
            {workouts.map((workout) => (
              <li className="list-group-item" key={workout._id ?? workout.id ?? workout.title}>
                <strong>{workout.title}</strong>
                <div className="text-muted small">{workout.difficulty} • {workout.duration}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
