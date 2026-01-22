import { useLocation, useNavigate } from "react-router-dom";

function EventBooking() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <div className="container">No booking data</div>;
  }

  const { event, tickets, total } = state;

  return (
    <div className="container">
      <h1 className="title">Booking Summary</h1>
      <p className="subtitle">Please confirm your event details</p>

      <div className="payment-card">
        <p><strong>Event:</strong> {event.title}</p>
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Venue:</strong> {event.venue}</p>
        <p><strong>Tickets:</strong> {tickets}</p>
        <p className="pay-total">₹{total}</p>
      </div>

      <button
        className="confirm-btn"
        onClick={() =>
          navigate("/payment", {
            state: {
              cinema: event.title,
              show: { time: event.date },
              seats: [`${tickets} Ticket(s)`],
              total,
            },
          })
        }
      >
        Proceed to Payment
      </button>
    </div>
  );
}

export default EventBooking;
