import { useNavigate } from "react-router-dom";
import { useState } from "react";
import movies from "../data/movies";
import events from "../data/events";
import "./Home.css";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

function Home() {
  const navigate = useNavigate();
  const [city, setCity] = useState("Amritsar");

  return (
    <div className="home-page">

      {/* CITY SELECTOR */}
      <div className="city-selector">
        <span>📍 {city}</span>
        <select onChange={(e) => setCity(e.target.value)}>
          <option>Amritsar</option>
          <option>Delhi</option>
          <option>Mumbai</option>
          <option>Chandigarh</option>
        </select>
      </div>

      {/* HERO SLIDER */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="hero-slider"
      >
        {movies.slice(0, 3).map((movie) => (
          <SwiperSlide key={movie.id}>
            <div
              className="hero-slide"
              style={{ backgroundImage: `url(${movie.image})` }}
              onClick={() => navigate(`/movies/${movie.id}`)}
            >
              <div className="hero-overlay">
                <h1>{movie.title}</h1>
                <p>⭐ {movie.rating}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* FEATURED MOVIES */}    

      <Section
        title="🔥 Trending Movies"
        data={movies}
        navigate={navigate}
        type="movie"
      />  
 

      {/* EVENTS */}
      <Section
        title="🎉 Upcoming Events"
        data={events}
        navigate={navigate}
        type="event"
      />

    </div>
  );
}

function Section({ title, data, navigate, type }) {
  return (
    <div className="home-section fade-in">
      <h2>{title}</h2>

      <div className="horizontal-scroll">
        {data.slice(0, 6).map((item) => (
          <div
            key={item.id}
            className="home-card"
            onClick={() =>
              navigate(`/${type === "movie" ? "movies" : "events"}/${item.id}`)
            }
          >
            {item.rating >= 8.2 && (
              <div className="trending-badge">🔥 Trending</div>
            )}
            <img src={item.image} alt={item.title} />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;