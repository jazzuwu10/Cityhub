import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import events from "../data/events";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find((e) => e.id === Number(id));
  const [tickets, setTickets] = useState(1);

  if (!event) return <div className="container">Event not found</div>;

  return (
    <div className="container">
      <h1 className="title">{event.title}</h1>
      <p className="subtitle">{event.venue}</p>
      <p className="subtitle">{event.date}</p>

      <img
        src={event.image}
        alt={event.title}
        style={{
          width: "100%",
          maxWidth: "420px",
          borderRadius: "18px",
          marginTop: "20px",
        }}
      />

      <div className="summary">
        <p>🎟 Price: ₹{event.price}</p>

        <div style={{ margin: "15px 0" }}>
          <button
            className="book-btn"
            onClick={() => setTickets(Math.max(1, tickets - 1))}
          >
            -
          </button>

          <span style={{ margin: "0 15px" }}>{tickets}</span>

          <button
            className="book-btn"
            onClick={() => setTickets(tickets + 1)}
          >
            +
          </button>
        </div>

        <p>
          <strong>Total: ₹{tickets * event.price}</strong>
        </p>

      <button
  className="confirm-btn"
  onClick={() =>
    navigate("/event-booking", {
      state: {
        event,
        tickets,
        total: tickets * event.price,
      },
    })
  }
>
  Proceed to Payment
</button>
        </div>
           </div>
  );
}

export default EventDetails;
