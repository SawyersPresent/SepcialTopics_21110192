import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Page/Home';
import Movies from './Page/Movies';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/movies">Movies</Link>
          </li>
        </ul>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
