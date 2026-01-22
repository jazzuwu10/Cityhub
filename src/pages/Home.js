import { useNavigate } from "react-router-dom";
import { useState } from "react";
import movies from "../data/movies";
import events from "../data/events";

function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const loading = false; // ✅ NOW CORRECT

  const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      {/* HERO */}
      <h1 className="title">CityHub</h1>
      <p className="subtitle">
        Movies, Events & Experiences — all in one place
      </p>

      {/* GLOBAL SEARCH */}
      <input
        className="event-search"
        placeholder="Search movies, events, shows..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* QUICK ACTIONS */}
      <div className="card-grid">
        <div className="card" onClick={() => navigate("/movies")}>
          🎬 Movies
        </div>
        <div className="card" onClick={() => navigate("/events")}>
          🎉 Events
        </div>
        <div className="card" onClick={() => navigate("/restaurants")}>
          🍽 Restaurants
        </div>
        <div className="card" onClick={() => navigate("/shopping")}>
          🛍 Shopping
        </div>
        <div className="card" onClick={() => navigate("/coming-soon")}>
          🚀 More
        </div>
      </div>

      {/* FEATURED MOVIES */}
      <h2 style={{ marginTop: "70px", textAlign: "left" }}>
        🎬 Popular Movies
      </h2>

      <div className="movies-grid">
        {loading
          ? [1, 2, 3].map((i) => (
              <div
                key={i}
                className="movie-card skeleton skeleton-card"
              ></div>
            ))
          : movies.slice(0, 3).map((movie) => (
              <div
                key={movie.id}
                className="movie-card"
                onClick={() => navigate(`/movies/${movie.id}`)}
              >
                <img src={movie.image} alt={movie.title} />
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <span>⭐ {movie.rating}</span>
                </div>
              </div>
            ))}
      </div>

      {/* FEATURED EVENTS */}
      <h2 style={{ marginTop: "60px", textAlign: "left" }}>
        🎉 Trending Events
      </h2>

      <div className="movies-grid">
        {(search ? filteredEvents : events).slice(0, 4).map((event) => (
          <div
            key={event.id}
            className="movie-card"
            onClick={() => navigate(`/events/${event.id}`)}
          >
            <img src={event.image} alt={event.title} />
            <div className="movie-info">
              <h3>{event.title}</h3>
              <span>{event.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
