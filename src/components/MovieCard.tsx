import { useNavigate } from "react-router-dom";
import Movie from "../models/Movie";
import "../styles/MovieCard.css";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const base_url = "https://image.tmdb.org/t/p/w500/";
  const fullImageUrl = `${base_url}${movie.poster_path}`;

  const navigate = useNavigate();

  const MovieClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const releaseYear = new Date(movie.release_date).getFullYear();
  const genresString = movie.genres.join(", ");
  return (
    <li className="container-card-movie" onClick={MovieClick}>
      <div className="container-card-image-movie">
        <img src={fullImageUrl} className="movie-image" />
      </div>
      <div className="text-card-movie">
        <p className="text-card-title">{movie.original_title}</p>
        <p className="text-card-genres">{genresString}</p>
        <p className="text-card-year">{releaseYear}</p>
      </div>
    </li>
  );
};

export default MovieCard;
