import { Link, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <div className="container py-5">
      <header className="pb-4 border-bottom">
        <h1 className="display-5 fw-bold">OctoFit Tracker</h1>
        <p className="text-muted">
          A modern multi-tier fitness and team experience with React 19 and an Express API.
        </p>
        <p className="text-muted small">
          Configure VITE_CODESPACE_NAME in .env.local to use Codespaces URLs, or leave it unset to use localhost.
        </p>
        <nav className="nav gap-3">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/users">Users</Link>
          <Link className="nav-link" to="/teams">Teams</Link>
          <Link className="nav-link" to="/activities">Activities</Link>
          <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
          <Link className="nav-link" to="/workouts">Workouts</Link>
        </nav>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <section className="row g-4 mt-3">
              <div className="col-md-6">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h2 className="h4">Welcome</h2>
                    <p className="card-text">
                      Track workouts, view rankings, and coordinate teams from one polished experience.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h2 className="h4">Live services</h2>
                    <ul className="mb-0">
                      <li>Frontend on port 5173</li>
                      <li>Backend on port 8000</li>
                      <li>MongoDB on port 27017</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
