import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import products from "../data/products";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));
  const [qty, setQty] = useState(1);

  if (!product) return <div className="container">Product not found</div>;

  const total = product.price * qty;

  return (
    <div className="container">
      <h1 className="title">{product.name}</h1>
      <p className="subtitle">{product.category}</p>

      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          maxWidth: "420px",
          borderRadius: "18px",
          marginTop: "20px",
        }}
      />

      <div className="summary">
        <p>{product.description}</p>
        <p style={{ marginTop: "10px" }}>
          <strong>Price: ₹{product.price}</strong>
        </p>

        {/* QUANTITY */}
        <p style={{ marginTop: "15px" }}>Quantity</p>
        <div>
          <button className="book-btn" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
          <span style={{ margin: "0 15px" }}>{qty}</span>
          <button className="book-btn" onClick={() => setQty(qty + 1)}>+</button>
        </div>

        <p style={{ marginTop: "15px" }}>
          <strong>Total: ₹{total}</strong>
        </p>

        <button
          className="confirm-btn"
          onClick={() =>
            navigate("/payment", {
              state: {
                type: "shopping",
                cinema: product.name,
                show: { time: "Product Purchase" },
                seats: [`Qty: ${qty}`],
                total,
              },
            })
          }
          style={{ marginTop: "25px" }}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
