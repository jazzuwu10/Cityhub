import { useParams, useNavigate } from "react-router-dom";
import movies from "../data/movies";


function BookMovie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const movie = movies.find(m => m.id === Number(id));

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "#0f2027",
        color: "white",
        textAlign: "center"
      }}
    >
      <h1>BOOK MOVIE PAGE</h1>

      {movie ? (
        <>
          <h2 style={{ marginTop: "20px" }}>{movie.title}</h2>

          <img
            src={movie.poster}
            alt={movie.title}
            style={{
              width: "250px",
              marginTop: "20px",
              borderRadius: "12px"
            }}
          />

          <p style={{ marginTop: "15px" }}>
            ⭐ Rating: {movie.rating}
          </p>

          <button
            style={{
              marginTop: "25px",
              padding: "12px 30px",
              fontSize: "16px",
              borderRadius: "30px",
              border: "none",
              cursor: "pointer",
              background: "linear-gradient(90deg, #ff3b3b, #ff7a18)",
              color: "white"
            }}
             onClick={() => navigate(`/select-cinema/${movie.id}`)}

            >
            Confirm Booking
          </button>
        </>
      ) : (
        <p>Movie not found</p>
      )}
    </div>
  );
}

export default BookMovie;
