import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="title">Your City. One Hub.</h1>
      <p className="subtitle">
        Movies • Events • Restaurants • Shopping
      </p>

      <div className="card-grid">
        <div className="card" onClick={() => navigate("/movies")}>🎬 Movies</div>
        <div className="card" onClick={() => navigate("/events")}>🎉 Events</div>
        <div className="card" onClick={() => navigate("/restaurants")}>🍽️ Restaurants</div>
        <div className="card" onClick={() => navigate("/shopping")}>🛍️ Shopping</div>
      </div>
    </div>
  );
}

export default Home;
