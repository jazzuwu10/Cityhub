import { useParams, useNavigate } from "react-router-dom";
import cinemas from "../data/cinemas";
import { useState, useEffect } from "react";
import EventMap from "../components/EventMap";
import "./SelectCinema.css";

function SelectCinema() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userLocation, setUserLocation] = useState(null);
  const [sortByDistance, setSortByDistance] = useState(false);
  const [showMap, setShowMap] = useState(false);

  // 📍 Get User Location
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

  // 📏 Distance Calculation (Haversine Formula)
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
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

  // 🔄 Sort Cinemas by Distance
  const sortedCinemas = [...cinemas].sort((a, b) => {
    if (!sortByDistance || !userLocation) return 0;
    if (!a.lat || !a.lng || !b.lat || !b.lng) return 0;

    const distA = parseFloat(
      calculateDistance(userLocation.lat, userLocation.lng, a.lat, a.lng)
    );

    const distB = parseFloat(
      calculateDistance(userLocation.lat, userLocation.lng, b.lat, b.lng)
    );

    return distA - distB;
  });

  return (
    <div className="cinema-page">
      <h1 className="cinema-title">Select Cinema</h1>

      {/* Controls */}
      <div className="cinema-controls">
        <button
          onClick={() => setSortByDistance(!sortByDistance)}
          className="control-btn"
        >
          {sortByDistance ? "Default Order" : "📍 Sort by Nearest"}
        </button>

        <button
          onClick={() => setShowMap(!showMap)}
          className="control-btn green"
        >
          {showMap ? "Hide Map" : "🗺 View on Map"}
        </button>
      </div>

      {/* Map Section */}
      {showMap && (
        <div className="map-container">
          <EventMap events={sortedCinemas} />
        </div>
      )}

      {/* Cinema List */}
      <div className="cinema-list">
        {sortedCinemas.map((cinema) => (
          <div key={cinema.id} className="cinema-card">
            <div className="cinema-header">
              <div>
                <h3>{cinema.name}</h3>
                <p className="location">{cinema.location}</p>

                {userLocation && cinema.lat && cinema.lng && (
                  <p className="distance">
                    📍{" "}
                    {calculateDistance(
                      userLocation.lat,
                      userLocation.lng,
                      cinema.lat,
                      cinema.lng
                    )}{" "}
                    km away
                  </p>
                )}
              </div>

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${cinema.lat},${cinema.lng}`}
                target="_blank"
                rel="noreferrer"
                className="direction-btn"
              >
                Get Directions
              </a>
            </div>

            {/* Screens + Showtimes */}
            {cinema.screens?.map((screen, sIndex) => (
              <div key={sIndex} className="screen-block">
                <strong>{screen.screenName}</strong>

                <div className="showtimes">
                  {screen.shows.map((show, showIndex) => (
                    <button
                      key={showIndex}
                      className="show-btn"
                      onClick={() =>
                        navigate(`/seats/${id}`, {
                          state: {
                            cinema: cinema.name,
                            screen: screen.screenName,
                            showTime: show.time,
                            price: show.price,
                          },
                        })
                      }
                    >
                      {show.time}
                      <span>₹{show.price}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectCinema;