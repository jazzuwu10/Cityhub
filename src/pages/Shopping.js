import products from "../data/products";
import { useNavigate } from "react-router-dom";

function Shopping() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="title">Shopping</h1>
      <p className="subtitle">Buy products from CityHub</p>

      <div className="movies-grid">
        {products.map((p) => (
          <div
            key={p.id}
            className="movie-card"
            onClick={() => navigate(`/shopping/${p.id}`)}
          >
            <img src={p.image} alt={p.name} />
            <div className="movie-info">
              <div>
                <h3>{p.name}</h3>
                <span>₹{p.price}</span>
              </div>
              <button className="book-btn">Buy</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shopping;
