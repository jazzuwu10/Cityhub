import { useState ,useEffect } from "react";
import EventMap from "../components/EventMap";
import { useNavigate } from "react-router-dom";
import eventsData from "../data/events";


function Events() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showMap, setShowMap] = useState(false);
  const [mood, setMood] = useState("all"); // 🔥 NEW
const [points, setPoints] = useState(
  Number(localStorage.getItem("cityhub_points")) || 0
);
const [userLocation, setUserLocation] = useState(null);

useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }
}, []);
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return (R * c).toFixed(2);
}
function handleBooking(id) {
  const newPoints = points + 50;
  setPoints(newPoints);
  localStorage.setItem("cityhub_points", newPoints);
  navigate(`/events/${id}`);
}
  const filteredEvents = eventsData
  .filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || event.category === category;

    const matchesMood =
      mood === "all" || event.mood?.toLowerCase() === mood;

    return matchesSearch && matchesCategory && matchesMood;
  })
  .sort((a, b) => {
    if (!userLocation) return 0;
    if (!a.lat || !a.lng || !b.lat || !b.lng) return 0;

    const distA = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      a.lat,
      a.lng
    );

    const distB = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      b.lat,
      b.lng
    );

    return distA - distB;
  });

    

  return (
    <div className="container">
      <h1 className="title">Events</h1>
      <p className="subtitle">Discover live events near you</p>
<div className="points-bar">
  🎮 CityHub Points: <strong>{points}</strong>
  {points >= 200 && (
    <span className="badge"> 🏆 Event Explorer</span>
  )}
</div>
      {/* 🔎 SEARCH */}
      <input
        className="event-search"
        placeholder="Search events, artists, venues"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
<button
  className="map-toggle-btn"
  onClick={() => setShowMap(!showMap)}
>
  {showMap ? "Hide Map" : "🗺 Explore on Map"}
</button>
     <div className="filters-wrapper">

  {/* Mood Filters */}
  <div className="filter-group">
    {[
      { label: "All", value: "all" },
      { label: "🔥 Party", value: "party" },
      { label: "😍 Fun", value: "fun" },
      { label: "👨‍👩‍👧 Family", value: "family" },
      { label: "🎮 Gaming", value: "gaming" },
    ].map((item) => (
      <button
        key={item.value}
        className={`premium-filter ${mood === item.value ? "active" : ""}`}
        onClick={() => setMood(item.value)}
      >
        {item.label}
      </button>
    ))}
  </div>

  {/* Category Filters */}
  <div className="filter-group">
    {["All", "Music", "Comedy", "Theatre"].map((cat) => (
      <button
        key={cat}
        className={`premium-filter ${category === cat ? "active" : ""}`}
        onClick={() => setCategory(cat)}
      >
        {cat}
      </button>
    ))}
  </div>
</div>
{showMap && <EventMap events={filteredEvents} />}
{/* 🎬 EVENTS GRID */}
<div className="movies-grid">
  {filteredEvents.map((event) => (
    <div className="movie-card" key={event.id}>

      {/* 🔥 Auto Trending Badge */}
      {event.crowd > 75 && (
        <div className="trending-badge">🔥 Trending</div>
      )}

      <img src={event.image} alt={event.title} />

      <div className="movie-info">
        <div>
          <h3>{event.title}</h3>
          <span>{event.date}</span>
          <br />
          <span>{event.venue}</span>
          {userLocation && event.lat && event.lng && (
  <div style={{ fontSize: "12px", marginTop: "4px" }}>
    📍 {calculateDistance(
      userLocation.lat,
      userLocation.lng,
      event.lat,
      event.lng
    )} km away
  </div>
)}

          

          {/* Crowd Meter */}
          <div className="crowd-meter">
            <div
              className="crowd-bar"
              style={{
                width: `${event.crowd}%`,
                background:
                  event.crowd < 40
                    ? "#22c55e"
                    : event.crowd < 75
                    ? "#f59e0b"
                    : "#ef4444",
              }}
            ></div>
          </div>

          <small>
            {event.crowd < 40
              ? "🟢 Seats Available"
              : event.crowd < 75
              ? "🟡 Filling Fast"
              : "🔴 Almost Sold Out"}
          </small>
        </div>

        <button
          className="book-btn"
         onClick={() => handleBooking(event.id)}
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