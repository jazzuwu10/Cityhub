import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Success() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const bookingId = "CH" + Math.floor(100000 + Math.random() * 900000);

  // Save booking safely
  useEffect(() => {
    if (!state) return;

    const { type, cinema, show, seats, total, paymentId } = state;

    const bookings = JSON.parse(localStorage.getItem("cityhubBookings")) || [];

    bookings.push({
      type,
      cinema,
      show,
      seats,
      total,
      paymentId,
      bookingId
    });

    localStorage.setItem("cityhubBookings", JSON.stringify(bookings));
  }, [state]);

  if (!state) {
    return <div className="container">No booking found</div>;
  }

  const { type, cinema, show, seats, total, paymentId } = state;

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
Payment ID: ${paymentId}

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
    setTimeout(() => setEmail(""), 2000);
  };

  return (
    <div className="container">

      <div className="success-header">
        <div className="success-badge">✓</div>
        <h1 className="title">Booking Confirmed</h1>
        <p className="subtitle">Your booking details are below</p>
      </div>

      <div className="ticket-card">

        <div className="email-row">
          {!sent ? (
            <>
              <input
                type="email"
                placeholder="Enter email to receive ticket"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={sendEmail}>Send</button>
            </>
          ) : (
            <p className="email-success">✅ Confirmation sent successfully</p>
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

        <div className="ticket-row">
          <span>Payment ID</span>
          <strong>{paymentId}</strong>
        </div>
      </div>

      <div className="action-row">
        <button className="primary" onClick={downloadTicket}>
          Download Ticket
        </button>
        <button className="secondary" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>

    </div>
  );
}

export default Success;
