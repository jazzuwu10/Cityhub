import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [upiId, setUpiId] = useState("");
  const [processing, setProcessing] = useState(false);

  if (!state) {
    return <div className="container">No payment data</div>;
  }

  // 🔥 VERY IMPORTANT: include `type`
  const { type, cinema, show, seats, total } = state;

  const handlePayment = () => {
    setProcessing(true);

    // Fake processing delay
    setTimeout(() => {
      navigate("/success", {
        state: {
          type,        // 🔥 PASS TYPE FOR SUCCESS PAGE
          cinema,
          show,
          seats,
          total,
        },
      });
    }, 2500);
  };

  return (
    <div className="container">
      <h1 className="title">UPI Payment</h1>
      <p className="subtitle">Secure & fast payment</p>

      {/* SUMMARY */}
      <div className="payment-card">
        <p><strong>{type === "shopping" ? "Product" : "Cinema"}:</strong> {cinema}</p>
        <p><strong>{type === "shopping" ? "Order Type" : "Show"}:</strong> {show.time}</p>
        <p><strong>{type === "shopping" ? "Quantity" : "Seats"}:</strong> {seats.join(", ")}</p>
        <p className="pay-total">₹{total}</p>
      </div>

      {/* PAYMENT AREA */}
      {!processing ? (
        <div className="payment-box">
          <input
            className="upi-input"
            placeholder="Enter UPI ID (example@upi)"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />

          <button
            className="confirm-btn"
            disabled={!upiId}
            onClick={handlePayment}
          >
            Pay ₹{total}
          </button>
        </div>
      ) : (
        <div className="processing-box">
          <div className="loader"></div>
          <p className="subtitle">Processing UPI payment…</p>
          <p className="subtitle" style={{ fontSize: "14px", opacity: 0.6 }}>
            Please do not refresh or press back
          </p>
        </div>
      )}
    </div>
  );
}

export default Payment;
