import restaurants from "../data/restaurants";
import { useNavigate } from "react-router-dom";

function Restaurants() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="title">Restaurants</h1>
      <p className="subtitle">Book tables at top restaurants</p>

      <div className="movies-grid">
        {restaurants.map((res) => (
          <div
            key={res.id}
            className="movie-card"
            onClick={() => navigate(`/restaurants/${res.id}`)}
          >
            <img src={res.image} alt={res.name} />
            <div className="movie-info">
              <div>
                <h3>{res.name}</h3>
                <span>{res.cuisine}</span>
                <br />
                <span>{res.location}</span>
              </div>
              <button className="book-btn">Book Table</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Restaurants;
