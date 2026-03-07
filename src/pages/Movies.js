import { useState } from "react";
import { useNavigate } from "react-router-dom";
import movies from "../data/movies";
import "./Movies.css";

function Movies() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [sortByRating, setSortByRating] = useState(false);
  const [activeTrailer, setActiveTrailer] = useState(null);

  const filteredMovies = movies
    .filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortByRating ? b.rating - a.rating : 0
    );

  return (
    <div className="container">
      <h1 className="title">🎬 Movies</h1>

      <input
        className="event-search"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        className="map-toggle-btn"
        onClick={() => setSortByRating(!sortByRating)}
      >
        {sortByRating ? "Default Order" : "⭐ Sort by Rating"}
      </button>

      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            {movie.rating >= 8.2 && (
              <div className="trending-badge">🔥 Trending</div>
            )}

            <img src={movie.image} alt={movie.title} />

            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>⭐ {movie.rating}</p>

              <div className="movie-buttons">
                <button
                  className="details-btn"
                  onClick={() => navigate(`/movies/${movie.id}`)}
                >
                  View Details
                </button>

                <button
                  className="trailer-btn"
                  onClick={() => setActiveTrailer(movie.trailer)}
                >
                  ▶ Watch Trailer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TRAILER MODAL */}
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
  );
}

export default Movies;