import { Link, Route, Routes } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div className="container py-5">
      <header className="pb-4 border-bottom">
        <h1 className="display-5 fw-bold">OctoFit Tracker</h1>
        <p className="text-muted">A modern multi-tier fitness and team management experience.</p>
        <nav className="nav gap-3">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/teams">Teams</Link>
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
                      Track workouts, manage teams, and stay motivated with a polished dashboard.
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
        <Route
          path="/teams"
          element={<div className="alert alert-info mt-4">Team management views will appear here.</div>}
        />
        <Route
          path="/workouts"
          element={<div className="alert alert-info mt-4">Workout planning views will appear here.</div>}
        />
      </Routes>
    </div>
  )
}

export default App
