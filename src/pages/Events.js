import { useState } from "react";
import { useNavigate } from "react-router-dom";
import eventsData from "../data/events";

function Events() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredEvents = eventsData.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container">
      <h1 className="title">Events</h1>
      <p className="subtitle">Discover live events near you</p>

      {/* SEARCH */}
      <input
        className="event-search"
        placeholder="Search events, artists, venues"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FILTERS */}
      <div className="event-filters">
        {["All", "Music", "Comedy", "Theatre"].map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${
              category === cat ? "active" : ""
            }`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* EVENTS GRID */}
      <div className="movies-grid">
        {filteredEvents.map((event) => (
          <div className="movie-card" key={event.id}>
            <img src={event.image} alt={event.title} />

            <div className="movie-info">
              <div>
                <h3>{event.title}</h3>
                <span>{event.date}</span>
                <br />
                <span>{event.venue}</span>
              </div>

              <button
                className="book-btn"
                onClick={() =>
                  navigate(`/events/${event.id}`)
                }
              >
                Book
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <p className="subtitle" style={{ marginTop: "30px" }}>
          No events found
        </p>
      )}
    </div>
  );
}

export default Events;
