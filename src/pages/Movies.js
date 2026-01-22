import { useState } from "react";
import movies from "../data/movies";
import MovieCard from "../components/MovieCard";

function Movies() {
  const [search, setSearch] = useState("");

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="title">🎬 Movies</h1>
      <p className="subtitle">Search movies by name</p>

      {/* SEARCH BAR */}
      <input
        className="event-search"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {filteredMovies.length === 0 && (
        <p className="subtitle" style={{ marginTop: "30px" }}>
          No movies found
        </p>
      )}
    </div>
  );
}

export default Movies;
