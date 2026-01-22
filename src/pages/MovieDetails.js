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
      <h1 className="title">{movie.title}</h1>
      <p className="subtitle">⭐ Rating: {movie.rating}</p>

      <img
        src={movie.image}
        alt={movie.title}
        style={{
          width: "100%",
          maxWidth: "420px",
          borderRadius: "18px",
          marginTop: "20px",
        }}
      />

      <div className="summary">
        <p>🎭 Genre: {movie.genre || "Action / Drama"}</p>
        <p>⏱ Duration: {movie.duration || "2h 30m"}</p>
        <p>🗣 Language: {movie.language || "Hindi"}</p>

        <button
          className="confirm-btn"
          onClick={() =>
           navigate(`/seats/${movie.id}?cinema=PVR Cinemas`)

          }
        >
          Select Seats
        </button>
      </div>
    </div>
  );
}

export default MovieDetails;
