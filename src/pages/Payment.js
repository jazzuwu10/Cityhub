import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";


function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [processing, setProcessing] = useState(false);

  if (!state) {
    return <div className="container">No payment data</div>;
  }

  const { type, cinema, show, seats, total } = state;

 const handlePayment = async () => {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    alert("Razorpay SDK failed to load");
    return;
  }

  const options = {
    key: "rzp_test_1DP5mmOlF5G5ag",
    amount: total * 100,
    currency: "INR",
    name: "CityHub",
    description: "Booking Payment",

    handler: function (response) {
      navigate("/success", {
        state: {
          type,
          cinema,
          show,
          seats,
          total,
          paymentId: response.razorpay_payment_id || "demo_payment",
        },
      });
    },

    modal: {
      ondismiss: function () {
        alert("Payment cancelled");
      },
    },

    prefill: {
      name: "Test User",
      email: "test@cityhub.com",
      contact: "9999999999",
    },

    theme: {
      color: "#4f46e5",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};


  return (
    <div className="container payment-page">

      <div className="payment-header">
        <h1>Confirm & Pay</h1>
        <p>Complete your booking securely</p>
      </div>

      <div className="payment-card">

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

        {!processing ? (
          <div className="payment-action">
            <button onClick={handlePayment}>
              Pay ₹{total}
            </button>
          </div>
                ) : (
          <div className="processing-box">
            <div className="loader"></div>
            <p>Opening secure payment…</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;

