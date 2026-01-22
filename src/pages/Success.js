import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Success() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [email, setEmail] = useState("");
const [sent, setSent] = useState(false);


  if (!state) {
    return <div className="container">No booking found</div>;
  }

  const { type, cinema, show, seats, total } = state;

  const bookingId = "CH" + Math.floor(100000 + Math.random() * 900000);

  // Dynamic title & labels
  const titles = {
    movie: "🎬 Movie Ticket",
    event: "🎉 Event Ticket",
    restaurant: "🍽 Restaurant Booking",
    shopping: "🛍 Order Confirmed",
  };

  const mainLabel =
    type === "shopping"
      ? "Product"
      : type === "restaurant"
      ? "Restaurant"
      : type === "event"
      ? "Event"
      : "Cinema";

  const timeLabel =
    type === "shopping"
      ? "Order Type"
      : type === "restaurant"
      ? "Reservation Time"
      : "Show Time";
      const downloadTicket = () => {
  const content = `
CITYHUB BOOKING CONFIRMATION

${mainLabel}: ${cinema}
${timeLabel}: ${show.time}
Details: ${seats.join(", ")}
${total > 0 ? `Total Paid: ₹${total}` : ""}
Booking ID: ${bookingId}

Thank you for booking with CityHub!
`;

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `CityHub_Ticket_${bookingId}.txt`;
  a.click();

  URL.revokeObjectURL(url);
};
const sendEmail = () => {
  if (!email) return;
  setSent(true);

  setTimeout(() => {
    setEmail("");
  }, 2000);
};



  return (
    <div className="container">
<h1 className="title">Booking Confirmed 🎉</h1>
<p className="subtitle">Your details are below</p>

<div className="success-badge">✓</div>
      <div className="ticket-card">
        <div style={{ marginTop: "30px" }}>
  <p className="subtitle">📧 Get booking confirmation on email</p>

  {!sent ? (
    <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "15px" }}>
      <input
        className="upi-input"
        placeholder="Enter email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="book-btn" onClick={sendEmail}>
        Send
      </button>
    </div>
  ) : (
    <p style={{ color: "#00f260", marginTop: "15px", fontWeight: "600" }}>
      ✅ Confirmation sent successfully!
    </p>
  )}
</div>

        <h2 className="ticket-title">{titles[type]}</h2>

        <div className="ticket-row">
          <span>{mainLabel}</span>
          <strong>{cinema}</strong>
        </div>

        <div className="ticket-row">
          <span>{timeLabel}</span>
          <strong>{show.time}</strong>
        </div>

        <div className="ticket-row">
          <span>{type === "shopping" ? "Quantity" : "Details"}</span>
          <strong>{seats.join(", ")}</strong>
        </div>

        {total > 0 && (
          <div className="ticket-row">
            <span>Total Paid</span>
            <strong>₹{total}</strong>
          </div>
        )}

        <div className="ticket-row">
          <span>Booking ID</span>
          <strong>{bookingId}</strong>
        </div>
      </div>

  <div style={{ display: "flex", gap: "15px", justifyContent: "center", marginTop: "30px" }}>
  <button className="book-btn" onClick={downloadTicket}>
    Download Ticket
  </button>

  <button className="confirm-btn" onClick={() => navigate("/")}>
    Back to Home
  </button>
  
</div>

    </div>
  );
}

export default Success;
