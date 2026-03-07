import { useState } from "react";

function MyBookings() {
  const [bookings, setBookings] = useState(
    JSON.parse(localStorage.getItem("cityhub_bookings")) || []
  );

  function cancelBooking(index) {
    const updated = bookings.filter((_, i) => i !== index);
    localStorage.setItem("cityhub_bookings", JSON.stringify(updated));
    setBookings(updated);
  }

  return (
    <div style={{ padding: "40px", color: "white", background: "#0f2027", minHeight: "100vh" }}>
      <h1>🎟 My Bookings</h1>

      {bookings.length === 0 && <p>No bookings yet.</p>}

      {bookings.map((booking, index) => (
        <div
          key={index}
          style={{
            background: "rgba(255,255,255,0.1)",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        >
          <p><strong>Cinema:</strong> {booking.cinema}</p>
          <p><strong>Seats:</strong> {booking.seats.join(", ")}</p>
          <p><strong>Total:</strong> ₹ {booking.total}</p>

          <button
            onClick={() => cancelBooking(index)}
            style={{
              marginTop: "10px",
              padding: "8px 20px",
              borderRadius: "20px",
              border: "none",
              background: "#ff4d4d",
              color: "white",
              cursor: "pointer",
            }}
          >
            Cancel Booking
          </button>
        </div>
      ))}
    </div>
  );
}

export default MyBookings;