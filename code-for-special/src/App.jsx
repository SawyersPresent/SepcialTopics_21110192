import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Page/Home';
import Events from './Page/Events';
import EventDetails from './Page/EventDetails';
import HashDetails from './Page/HashDetails';
import HashSearch from './Page/HashSearch';
import Management from './Page/Management';
import Login from './Page/Login';
import Signup from './Page/Signup';

function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 'admin';

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    window.location.reload();
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Cyber Event Manager
          </Link>
          
          <div className="navbar-nav me-auto">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/events">Events</Link>
            <Link className="nav-link" to="/search">Hash Search</Link>
            {isAdmin && (
              <Link className="nav-link" to="/management">Management</Link>
            )}
          </div>
          
          <div className="navbar-nav">
            {isLoggedIn ? (
              <>
                <span className="navbar-text me-3">
                  Welcome, {user.name} ({user.role})
                </span>
                <button className="btn btn-outline-primary" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/login">Login</Link>
                <Link className="nav-link" to="/signup">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/scan/:id" element={<HashDetails />} />
          <Route path="/search" element={<HashSearch />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {isAdmin && <Route path="/management" element={<Management />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;