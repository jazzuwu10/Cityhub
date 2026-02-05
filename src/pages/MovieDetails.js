import { useParams, useNavigate } from "react-router-dom";
import movies from "../data/movies";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const movie = movies.find((m) => m.id === Number(id));

  if (!movie) {
    return <div className="container">Movie not found</div>;
  }

  return (
    <div className="container">

      {/* HEADER */}
      <div className="movie-header">
        <h1 className="movie-title">{movie.title}</h1>
        <p className="movie-meta">
          ⭐ {movie.rating} • {movie.language} • {movie.duration}
        </p>
      </div>

      {/* MAIN LAYOUT */}
      <div className="movie-layout">

        {/* LEFT */}
        <div className="movie-left">
          <img
            src={movie.image}
            alt={movie.title}
            className="movie-poster"
          />

          <button
            className="book-btn large"
            onClick={() =>
              navigate(`/seats/${movie.id}`, {
                state: {
                  type: "movie",
                  cinema: movie.title,
                  show: { time: "4:00 PM" },
                  seats: ["A4", "A5"],
                  total: 500,
                },
              })
            }
          >
            Select Seats
          </button>
        </div>

        {/* RIGHT */}
        <div className="movie-right">

          {/* ABOUT */}
          <section className="info-card">
            <h3>About the movie</h3>
            <p>{movie.overview}</p>
          </section>

          {/* INFO */}
          <section className="info-card">
            <h3>Movie information</h3>

            <div className="info-row">
              <span>Genre</span>
              <strong>{movie.genre}</strong>
            </div>

            <div className="info-row">
              <span>Duration</span>
              <strong>{movie.duration}</strong>
            </div>

            <div className="info-row">
              <span>Language</span>
              <strong>{movie.language}</strong>
            </div>

            <div className="info-row">
              <span>Rating</span>
              <strong>{movie.rating}</strong>
            </div>
          </section>

          {/* HIGHLIGHTS */}
          <section className="info-card">
            <h3>Highlights</h3>
            <div className="tag-row">
              <span>Action Packed</span>
              <span>Big Screen Experience</span>
              <span>Popular Cast</span>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
