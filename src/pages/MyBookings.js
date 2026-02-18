import { useEffect, useState } from "react";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    const data = JSON.parse(localStorage.getItem("cityhubBookings")) || [];
    setBookings(data.reverse());
  };

  const deleteBooking = (bookingId) => {
    const updated = bookings.filter((b) => b.bookingId !== bookingId);

    // reverse back before saving (because we reversed while displaying)
    localStorage.setItem("cityhubBookings", JSON.stringify([...updated].reverse()));
    setBookings(updated);
  };

  if (bookings.length === 0) {
    return (
      <div className="container">
        <h1>No Bookings Yet</h1>
        <p>Your confirmed tickets will appear here.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="title">My Bookings</h1>

      {bookings.map((b, index) => (
        <div key={index} className="ticket-card" style={{marginBottom:"20px"}}>

          <div className="ticket-row">
            <span>Type</span>
            <strong>{b.type}</strong>
          </div>

          <div className="ticket-row">
            <span>Place</span>
            <strong>{b.cinema}</strong>
          </div>

          <div className="ticket-row">
            <span>Time</span>
            <strong>{b.show?.time}</strong>
          </div>

          <div className="ticket-row">
            <span>Details</span>
            <strong>{b.seats?.join(", ")}</strong>
          </div>

          <div className="ticket-row">
            <span>Total</span>
            <strong>₹{b.total}</strong>
          </div>

          <div className="ticket-row">
            <span>Booking ID</span>
            <strong>{b.bookingId}</strong>
          </div>

          <div className="ticket-row">
            <span>Payment ID</span>
            <strong>{b.paymentId}</strong>
          </div>

          {/* DELETE BUTTON */}
          <div style={{marginTop:"15px", textAlign:"right"}}>
            <button
              onClick={() => deleteBooking(b.bookingId)}
              style={{
                background:"#ff4d4f",
                color:"white",
                border:"none",
                padding:"8px 16px",
                borderRadius:"8px",
                cursor:"pointer"
              }}
            >
              Delete Ticket
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}

export default MyBookings;
