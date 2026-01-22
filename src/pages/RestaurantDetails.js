import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import restaurants from "../data/restaurants";

function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurant = restaurants.find(r => r.id === Number(id));

  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  if (!restaurant) {
    return <div className="container">Restaurant not found</div>;
  }

  const canBook = guests && date && time;

  return (
    <div className="container">
      <h1 className="title">{restaurant.name}</h1>
      <p className="subtitle">{restaurant.cuisine}</p>
      <p className="subtitle">{restaurant.location}</p>

      <img
        src={restaurant.image}
        alt={restaurant.name}
        style={{
          width: "100%",
          maxWidth: "420px",
          borderRadius: "18px",
          marginTop: "20px",
        }}
      />

      <div className="summary">
        <p>{restaurant.price}</p>

        {/* GUESTS */}
        <p style={{ marginTop: "15px" }}>👥 Guests</p>
        <div>
          <button
            className="book-btn"
            onClick={() => setGuests(Math.max(1, guests - 1))}
          >
            -
          </button>
          <span style={{ margin: "0 15px" }}>{guests}</span>
          <button
            className="book-btn"
            onClick={() => setGuests(guests + 1)}
          >
            +
          </button>
        </div>

        {/* DATE */}
        <p style={{ marginTop: "20px" }}>📅 Date</p>
        <input
          type="date"
          className="event-search"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {/* TIME */}
        <p style={{ marginTop: "15px" }}>⏰ Time</p>
        <select
          className="event-search"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          <option value="">Select Time</option>
          <option>12:30 PM</option>
          <option>2:00 PM</option>
          <option>7:30 PM</option>
          <option>9:00 PM</option>
        </select>

        {/* CONFIRM */}
        <button
          className="confirm-btn"
          disabled={!canBook}
          onClick={() =>
            navigate("/success", {
              state: {
                type: "restaurant",
                cinema: restaurant.name,
                show: { time: `${date} • ${time}` },
                seats: [`${guests} Guests`],
                total: 0,
              },
            })
          }
          style={{ marginTop: "25px" }}
        >
          Confirm Table
        </button>
      </div>
    </div>
  );
}

export default RestaurantDetails;
