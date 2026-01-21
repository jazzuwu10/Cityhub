import movies from "../data/movies";
import MovieCard from "../components/MovieCard";

function Movies() {
  return (
    <div className="container">
      <h1 className="title">🎬 Movies</h1>

      <div className="movies-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Movies;
