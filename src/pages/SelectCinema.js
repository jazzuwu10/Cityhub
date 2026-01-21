import { useParams, useNavigate } from "react-router-dom";
import cinemas from "../data/cinemas";

function SelectCinema() {
  const { id } = useParams(); // movie id
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "#0f2027",
        color: "white",
      }}
    >
      <h1 style={{ textAlign: "center" }}>🏢 Select Cinema Mall</h1>

      <div style={{ maxWidth: "500px", margin: "40px auto" }}>
        {cinemas.map((cinema) => (
          <div
            key={cinema.id}
            style={{
              background: "rgba(255,255,255,0.1)",
              padding: "20px",
              borderRadius: "14px",
              marginBottom: "20px",
              cursor: "pointer",
            }}
            onClick={() =>
              navigate(`/seats/${id}?cinema=${cinema.name}`)
            }
          >
            <h3>{cinema.name}</h3>
            <p style={{ opacity: 0.8 }}>{cinema.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectCinema;
