import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [upiId, setUpiId] = useState("");

  if (!state) {
    return <h2 style={{ color: "white", padding: 40 }}>No payment data</h2>;
  }

  const { cinema, show, seats, total } = state;

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "#0f2027",
        color: "white",
        textAlign: "center",
      }}
    >
      <h1>📱 UPI Payment</h1>

      {/* SUMMARY */}
      <div
        style={{
          maxWidth: "400px",
          margin: "30px auto",
          background: "rgba(255,255,255,0.1)",
          padding: "20px",
          borderRadius: "16px",
          textAlign: "left",
        }}
      >
        <p><b>Cinema:</b> {cinema}</p>
        <p><b>Show:</b> {show.time}</p>
        <p><b>Seats:</b> {seats.join(", ")}</p>
        <p><b>Total:</b> ₹{total}</p>
      </div>

      {/* UPI INPUT */}
      <div style={{ maxWidth: "400px", margin: "auto" }}>
        <input
          placeholder="Enter UPI ID (example@upi)"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          style={input}
        />

        <button
          disabled={!upiId}
          style={{
            ...payBtn,
            background: upiId
              ? "linear-gradient(90deg,#00f260,#0575e6)"
              : "#555",
          }}
          onClick={() => {
            alert(`UPI Payment Successful\nUPI ID: ${upiId}`);
            navigate("/success");
          }}
        >
          Pay ₹{total}
        </button>
      </div>

      {/* QR (DEMO) */}
      <p style={{ marginTop: "25px", opacity: 0.8 }}>
        OR scan QR using any UPI app
      </p>

      <div
        style={{
          margin: "20px auto",
          width: "160px",
          height: "160px",
          background: "white",
          color: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "12px",
          fontWeight: "bold",
        }}
      >
        QR CODE
      </div>

      <p style={{ marginTop: "20px", opacity: 0.6 }}>
        * Demo UPI payment (no real transaction)
      </p>
    </div>
  );
}

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "none",
};

const payBtn = {
  width: "100%",
  padding: "14px",
  borderRadius: "30px",
  border: "none",
  fontSize: "16px",
  cursor: "pointer",
  color: "white",
};

export default Payment;
