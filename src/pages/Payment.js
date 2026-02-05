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

  const { type, cinema, show, seats, total } = state;

  const handlePayment = () => {
    setProcessing(true);

    setTimeout(() => {
      navigate("/success", {
        state: {
          type,
          cinema,
          show,
          seats,
          total,
        },
      });
    }, 2500);
  };

  return (
    <div className="container payment-page">

      {/* HEADER */}
      <div className="payment-header">
        <h1>Confirm & Pay</h1>
        <p>Complete your booking securely</p>
      </div>

      {/* PAYMENT CARD */}
      <div className="payment-card">

        {/* SUMMARY */}
        <div className="payment-summary">
          <div className="summary-row">
            <span>{type === "shopping" ? "Product" : "Cinema"}</span>
            <strong>{cinema}</strong>
          </div>

          <div className="summary-row">
            <span>{type === "shopping" ? "Order Type" : "Show Time"}</span>
            <strong>{show.time}</strong>
          </div>

          <div className="summary-row">
            <span>{type === "shopping" ? "Quantity" : "Seats"}</span>
            <strong>{seats.join(", ")}</strong>
          </div>

          <div className="summary-total">
            <span>Total Amount</span>
            <strong>₹{total}</strong>
          </div>
        </div>

        {/* PAYMENT ACTION */}
        {!processing ? (
          <div className="payment-action">
            <input
              type="text"
              placeholder="Enter UPI ID (example@upi)"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />

            <button
              disabled={!upiId}
              onClick={handlePayment}
            >
              Pay ₹{total}
            </button>
          </div>
        ) : (
          <div className="processing-box">
            <div className="loader"></div>
            <p>Processing UPI payment…</p>
            <span>Please do not refresh or press back</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;
