import { useParams, useNavigate } from "react-router-dom";
import movies from "../data/movies";
import "./MovieDetails.css";
import { useState } from "react";
function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTrailer, setActiveTrailer] = useState(null);

  const movie = movies.find((m) => m.id === parseInt(id));

  if (!movie) {
    return <h2 className="not-found">Movie Not Found</h2>;
  }

  return (
    <div
      className="movie-hero"
      style={{
        backgroundImage: `url(${movie.image})`,
      }}
    >
      <div className="overlay"></div>

      <div className="movie-container">
        <div className="movie-poster">
          <img src={movie.image} alt={movie.title} />
        </div>

        <div className="movie-info">
          <h1>{movie.title}</h1>

          <div className="rating">
            ⭐ {movie.rating}/10
          </div>

          <div className="meta">
            <span>{movie.genre}</span>
            <span>{movie.duration}</span>
            <span>{movie.language}</span>
          </div>

          <p className="description">
            {movie.description}
          </p>

          <div style={{ marginTop: "20px", display: "flex", gap: "15px" }}>
  <button
    onClick={() => navigate(`/select-cinema/${movie.id}`)}
    className="book-btn"
  >
    🎟 Select Cinema
  </button>

  <button
    className="trailer-btn"
    onClick={() => setActiveTrailer(movie.trailer)}
  >
    ▶ Watch Trailer
  </button>
  {activeTrailer && (
  <div className="trailer-modal">
    <div className="trailer-content">
      <span
        className="close-btn"
        onClick={() => setActiveTrailer(null)}
      >
        ✕
      </span>

      <iframe
        src={activeTrailer}
        title="Trailer"
        allowFullScreen
      ></iframe>
    </div>
  </div>
)}
</div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;