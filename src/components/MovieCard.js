import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  return (
    <div className="movie-card">
      <img src={movie.image} alt={movie.title} />

      <div className="movie-info">
        <div>
          <h3>{movie.title}</h3>
          <span>⭐ {movie.rating}</span>
        </div>

        <button
          className="book-btn"
          onClick={() => navigate(`/movies/${movie.id}`)}
        >
          Book
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
