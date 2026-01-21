import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const ROWS = ["A", "B", "C", "D", "E"];
const SEATS_PER_ROW = 8;

const SHOWS = [
  { time: "10:30 AM", price: 200 },
  { time: "4:00 PM", price: 250 },
  { time: "9:00 PM", price: 300 },
];

function SeatSelection() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const cinema = params.get("cinema");

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);

  const toggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  const totalPrice =
    selectedShow ? selectedSeats.length * selectedShow.price : 0;

  return (
    <div className="container">
      <h1 className="title">Seat Selection</h1>
      <p className="subtitle">🎬 {cinema}</p>

      {/* SHOW TIMES */}
      <h3 className="subtitle" style={{ marginTop: "30px" }}>
        ⏰ Select Show Time
      </h3>

      <div className="showtime-row">
        {SHOWS.map((show) => (
          <button
            key={show.time}
            className={`showtime-btn ${
              selectedShow?.time === show.time ? "active" : ""
            }`}
            onClick={() => setSelectedShow(show)}
          >
            {show.time}
            <span>₹{show.price}</span>
          </button>
        ))}
      </div>

      {/* SCREEN */}
      <div className="screen">SCREEN THIS WAY</div>

      {/* SEATS */}
      <div className="seats">
        {ROWS.map((row) => (
          <div className="seat-row" key={row}>
            <div className="row-label">{row}</div>
            {Array.from({ length: SEATS_PER_ROW }).map((_, i) => {
              const seat = `${row}${i + 1}`;
              return (
                <div
                  key={seat}
                  className={`seat ${
                    selectedSeats.includes(seat) ? "selected" : ""
                  }`}
                  onClick={() => toggleSeat(seat)}
                >
                  {i + 1}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* SUMMARY */}
      <div className="summary">
        <p>
          🎟 Seats:{" "}
          <strong>
            {selectedSeats.length ? selectedSeats.join(", ") : "None"}
          </strong>
        </p>

        <p>
          💰 Total:{" "}
          <strong>
            {selectedShow ? `₹${totalPrice}` : "Select show time"}
          </strong>
        </p>

        <button
          className="confirm-btn"
          disabled={!selectedSeats.length || !selectedShow}
          onClick={() =>
            navigate("/payment", {
              state: {
                cinema,
                show: selectedShow,
                seats: selectedSeats,
                total: totalPrice,
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

export default SeatSelection;
