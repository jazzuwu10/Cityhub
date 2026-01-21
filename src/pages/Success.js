import { useLocation, useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return <div className="container">No booking found</div>;
  }

  const { cinema, show, seats, total } = state;

  const bookingId = "CH" + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="container">
      <h1 className="title">Booking Confirmed 🎉</h1>
      <p className="subtitle">Enjoy your movie!</p>

      <div className="ticket-card">
        <h2 className="ticket-title">🎬 Movie Ticket</h2>

        <div className="ticket-row">
          <span>Cinema</span>
          <strong>{cinema}</strong>
        </div>

        <div className="ticket-row">
          <span>Show Time</span>
          <strong>{show.time}</strong>
        </div>

        <div className="ticket-row">
          <span>Seats</span>
          <strong>{seats.join(", ")}</strong>
        </div>

        <div className="ticket-row">
          <span>Total Paid</span>
          <strong>₹{total}</strong>
        </div>

        <div className="ticket-row">
          <span>Booking ID</span>
          <strong>{bookingId}</strong>
        </div>
      </div>

      <button
        className="confirm-btn"
        style={{ marginTop: "30px" }}
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
}

export default Success;
