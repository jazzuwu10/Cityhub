import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Payment.css";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const { cinema, screen, showTime, seats, totalAmount } =
    location.state || {};

  const [method, setMethod] = useState("upi");
  const [showFees, setShowFees] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [processing, setProcessing] = useState(false);

  const convenienceFee = 40;
  const discount = coupon === "CITY50" ? 50 : 0;
  const finalTotal = totalAmount + convenienceFee - discount;

  const handlePayment = () => {
    setProcessing(true);

    setTimeout(() => {
      navigate("/success", {
        state: {
          cinema,
          screen,
          showTime,
          seats,
          totalAmount: finalTotal,
        },
      });
    }, 2000);
  };

  return (
    <div className="bms-payment-page">
      <div className="bms-container">

        {/* LEFT MENU */}
        <div className="bms-left">
          <h3>Payment options</h3>

          {["upi", "card", "wallet", "netbanking"].map((m) => (
            <div
              key={m}
              className={`bms-method ${method === m ? "active" : ""}`}
              onClick={() => setMethod(m)}
            >
              {m === "upi" && "Pay by any UPI App"}
              {m === "card" && "Debit / Credit Card"}
              {m === "wallet" && "Mobile Wallets"}
              {m === "netbanking" && "Net Banking"}
            </div>
          ))}
        </div>

        {/* CENTER CONTENT */}
        <div className="bms-center">

          {method === "upi" && (
            <>
              <h4>Pay by any UPI App</h4>
              <input placeholder="Enter UPI ID" />
            </>
          )}

          {method === "card" && (
            <>
              <h4>Enter Card Details</h4>
              <input placeholder="Card Number" />
              <input placeholder="Card Holder Name" />
              <div className="row">
                <input placeholder="MM/YY" />
                <input placeholder="CVV" />
              </div>
            </>
          )}

          {/* Coupon Section */}
          <div className="coupon-box">
            <input
              placeholder="Apply Coupon"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button>Apply</button>
          </div>

          {discount > 0 && (
            <p className="discount-text">Coupon Applied: -₹{discount}</p>
          )}

          {/* Pay Button */}
          <button
            className="bms-pay-btn"
            onClick={handlePayment}
            disabled={processing}
          >
            {processing ? "Processing..." : `Pay ₹${finalTotal}`}
          </button>
        </div>

        {/* RIGHT SUMMARY */}
        <div className="bms-right">
          <h4>Booking Summary</h4>

          <p><strong>Cinema:</strong> {cinema}</p>
          <p><strong>Screen:</strong> {screen}</p>
          <p><strong>Time:</strong> {showTime}</p>
          <p><strong>Seats:</strong> {seats?.join(", ")}</p>

          <div className="price-box">

            <div onClick={() => setShowFees(!showFees)} className="clickable">
              <span>Tickets Price</span>
              <span>₹{totalAmount}</span>
            </div>

            {showFees && (
              <>
                <div>
                  <span>Convenience Fee</span>
                  <span>₹{convenienceFee}</span>
                </div>
                {discount > 0 && (
                  <div>
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
              </>
            )}

            <div className="total">
              <span>Total</span>
              <span>₹{finalTotal}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Payment;