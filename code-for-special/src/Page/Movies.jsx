
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Movies.module.css';

const API_KEY = 'cfe7ad166f56a49645270d7ca1dc7a8a';

function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
      .then(res => setMovies(res.data.results))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className={styles.grid}>
      {movies.map(movie => (
        <Link to={`/movies/${movie.id}`} key={movie.id} className={styles.card}>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <h3>{movie.title}</h3>
        </Link>
      ))}
    </div>
  );
}

export default Movies;
