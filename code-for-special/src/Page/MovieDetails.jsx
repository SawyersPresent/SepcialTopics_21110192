
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './MovieDetails.module.css';

const API_KEY = 'b9fc1990d16649d82c63ff79ae882e98';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then(res => setMovie(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className={styles.details}>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <strong>Rating: {movie.vote_average}</strong>
    </div>
  );
}

export default MovieDetails;
