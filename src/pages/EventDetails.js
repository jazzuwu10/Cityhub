import { useParams, useNavigate } from "react-router-dom";
import events from "../data/events";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = events.find((e) => e.id === Number(id));

  if (!event) {
    return <div className="container">Event not found</div>;
  }

  return (
    <div className="container">

      {/* HEADER */}
      <div className="event-header">
        <h1 className="event-title">{event.title}</h1>
        <p className="event-meta">
          {event.date} • {event.venue}
        </p>
      </div>

      {/* BANNER */}
      <div className="event-banner">
        <img src={event.image} alt={event.title} />
      </div>

      {/* CONTENT */}
      <div className="event-layout">

        {/* LEFT */}
        <div className="event-main">

          <section className="info-card">
            <h3>About the event</h3>
            <p>
              Experience an unforgettable {event.category.toLowerCase()} event
              featuring live performances, engaging moments, and an energetic
              atmosphere. Perfect for fans looking for a memorable evening.
            </p>
          </section>

        </div>

        {/* RIGHT */}
        <aside className="event-sidebar">

          <div className="info-card">
            <h3>Event details</h3>

            <div className="event-info-row">
              <span>Category</span>
              <strong>{event.category}</strong>
            </div>

            <div className="event-info-row">
              <span>Date</span>
              <strong>{event.date}</strong>
            </div>

            <div className="event-info-row">
              <span>Venue</span>
              <strong>{event.venue}</strong>
            </div>

            <div className="event-info-row">
              <span>Price</span>
              <strong>₹{event.price}</strong>
            </div>
          </div>

        <button
  className="book-btn large"
  onClick={() => navigate(`/event-booking/${event.id}`)}
>
  Book Tickets
</button>

        </aside>

      </div>
    </div>
  );
}

export default EventDetails;
