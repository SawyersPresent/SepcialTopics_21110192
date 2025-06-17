import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Page/Home';
import Events from './Page/Events';
import EventDetails from './Page/EventDetails';
import HashSearch from './Page/HashSearch';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="navbar-brand" style={{ fontWeight: 'bold', color: '#007bff' }}>
          🎉 Event Manager
        </div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/events">All Events</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/search">Hash Search</Link>
          </li>
        </ul>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/search" element={<HashSearch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
