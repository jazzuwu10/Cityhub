import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EventBooking.css";

function EventBooking() {

  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState([]);

  const seatPrice = 300;

  // Curved seat rows
  const rows = [
    [1,2,3,4],
    [5,6,7,8,9,10],
    [11,12,13,14,15,16,17,18],
    [19,20,21,22,23,24,25,26,27,28],
    [29,30,31,32,33,34,35,36,37,38],
    [39,40,41,42,43,44,45,46,47,48],
    [49,50,51,52,53,54,55,56,57,58],
    [59,60,61,62,63,64,65,66,67,68],
    [69,70,71,72,73,74,75,76,77,78],
    [79,80,81,82,83,84,85,86,87,88],
    [89,90,91,92,93,94,95,96,97,98,99,100]
  ];

  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const total = selectedSeats.length * seatPrice;

  return (
    <div className="event-booking">

      <h2>Select Seats for Event</h2>

      <div className="stage">🎤 STAGE</div>

      <div className="seat-layout">
        {rows.map((row, i) => (
          <div key={i} className="seat-row">
            {row.map((seat) => (
              <div
                key={seat}
                className={`seat ${selectedSeats.includes(seat) ? "selected" : ""}`}
                onClick={() => toggleSeat(seat)}
              >
                {seat}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="booking-info">

        <p>
          Selected Seats: {selectedSeats.length ? selectedSeats.join(", ") : "None"}
        </p>

        <p>Total Price: ₹{total}</p>

        {selectedSeats.length > 0 && (
          <button onClick={() => navigate("/payment")}>
            Proceed to Payment
          </button>
        )}

      </div>

    </div>
  );
}

export default EventBooking;