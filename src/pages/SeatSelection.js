import {  useLocation, useNavigate } from "react-router-dom";
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
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "#0f2027",
        color: "white",
        textAlign: "center",
      }}
    >
      <h1>🎟️ Seat Selection</h1>
      <p>
        🎬 Cinema: <b>{cinema}</b>
      </p>

      {/* SHOW TIMINGS */}
      <h3 style={{ marginTop: "30px" }}>⏰ Select Show Time</h3>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        {SHOWS.map((show) => (
          <button
            key={show.time}
            onClick={() => setSelectedShow(show)}
            style={{
              padding: "10px 18px",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              background:
                selectedShow?.time === show.time
                  ? "linear-gradient(90deg,#00f260,#0575e6)"
                  : "rgba(255,255,255,0.2)",
              color: "white",
            }}
          >
            {show.time}
            <br />₹{show.price}
          </button>
        ))}
      </div>

      {/* SCREEN */}
      <div
        style={{
          margin: "30px auto",
          padding: "10px",
          width: "60%",
          background: "linear-gradient(90deg,#00f260,#0575e6)",
          borderRadius: "20px",
          fontWeight: "bold",
        }}
      >
        SCREEN
      </div>

      {/* SEATS */}
      {ROWS.map((row) => (
        <div
          key={row}
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "10px",
          }}
        >
          <span style={{ width: "30px" }}>{row}</span>

          {Array.from({ length: SEATS_PER_ROW }).map((_, i) => {
            const seat = `${row}${i + 1}`;
            const isSelected = selectedSeats.includes(seat);

            return (
              <div
                key={seat}
                onClick={() => toggleSeat(seat)}
                style={{
                  width: "36px",
                  height: "36px",
                  margin: "6px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  background: isSelected
                    ? "linear-gradient(90deg,#ff3b3b,#ff7a18)"
                    : "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                }}
              >
                {i + 1}
              </div>
            );
          })}
        </div>
      ))}

      {/* SUMMARY */}
      <div style={{ marginTop: "30px" }}>
        <p>
          🎟️ Seats:{" "}
          {selectedSeats.length ? selectedSeats.join(", ") : "None"}
        </p>

        <p>
          💰 Price:{" "}
          {selectedShow
            ? `₹${selectedShow.price} × ${selectedSeats.length} = ₹${totalPrice}`
            : "Select show time"}
        </p>

        <button
          disabled={!selectedSeats.length || !selectedShow}
          style={{
            marginTop: "20px",
            padding: "12px 30px",
            fontSize: "16px",
            borderRadius: "30px",
            border: "none",
            cursor: "pointer",
            background:
              selectedSeats.length && selectedShow
                ? "linear-gradient(90deg,#00f260,#0575e6)"
                : "#555",
            color: "white",
          }}
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
