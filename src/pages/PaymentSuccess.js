import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./PaymentSuccess.css";

function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state;

  useEffect(() => {
    setTimeout(() => {
      navigate("/ticket", { state: bookingData });
    }, 2500);
  }, []);

  return (
    <div className="success-page">
      <div className="success-box">
        <div className="checkmark">✔</div>
        <h2>Payment Successful</h2>
        <p>Your tickets are confirmed 🎉</p>
      </div>
    </div>
  );
}

export default PaymentSuccess;