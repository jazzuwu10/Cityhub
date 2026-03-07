import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./SeatSelection.css";

function SeatSelection() {
  const location = useLocation();
  const navigate = useNavigate();

  const { cinema, screen, showTime, price } = location.state || {};

  // Seat Row Configuration (Multiplex Style)
  const rowsData = [
    { row: "A", type: "Platinum", price: price + 100 },
    { row: "B", type: "Platinum", price: price + 100 },
    { row: "C", type: "Gold", price: price + 50 },
    { row: "D", type: "Gold", price: price + 50 },
    { row: "E", type: "Silver", price: price },
    { row: "F", type: "Silver", price: price },
    { row: "G", type: "Silver", price: price },
    { row: "H", type: "Silver", price: price },
  ];

  const cols = 10;

  // Demo Booked Seats
  const bookedSeats = ["A3", "A4", "C7", "D2", "F5", "G8"];

  const [selectedSeats, setSelectedSeats] = useState([]);

  // Toggle Seat
  const toggleSeat = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return;

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  // Dynamic Total Calculation (based on row type)
  const totalAmount = selectedSeats.reduce((total, seat) => {
    const rowLetter = seat.charAt(0);
    const rowInfo = rowsData.find((r) => r.row === rowLetter);
    return total + (rowInfo ? rowInfo.price : 0);
  }, 0);

  return (
    <div className="seat-page">
      <div className="seat-container">

        {/* LEFT SIDE */}
        <div className="seat-layout">
          <h2>{cinema}</h2>
          <p>{screen} | {showTime}</p>

          {/* SCREEN */}
          <div className="screen">SCREEN</div>

          {/* SEAT GRID */}
          <div className="seats-grid">
            {rowsData.map((rowData) =>
              [...Array(cols)].map((_, colIndex) => {
                const seatNumber = `${rowData.row}${colIndex + 1}`;
                const isSelected = selectedSeats.includes(seatNumber);
                const isBooked = bookedSeats.includes(seatNumber);

                return (
                  <div
                    key={seatNumber}
                    className={`seat 
                      ${rowData.type.toLowerCase()} 
                      ${isSelected ? "selected" : ""} 
                      ${isBooked ? "booked" : ""}`}
                    onClick={() => toggleSeat(seatNumber)}
                  >
                    {seatNumber}
                  </div>
                );
              })
            )}
          </div>

          {/* LEGEND */}
          <div className="legend">
            <div><span className="box available"></span> Available</div>
            <div><span className="box selected"></span> Selected</div>
            <div><span className="box silver"></span> Silver</div>
            <div><span className="box gold-box"></span> Gold</div>
            <div><span className="box platinum-box"></span> Platinum</div>
            <div><span className="box booked"></span> Booked</div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="booking-summary">
          <h3>Booking Summary</h3>

          <p><strong>Cinema:</strong> {cinema}</p>
          <p><strong>Screen:</strong> {screen}</p>
          <p><strong>Time:</strong> {showTime}</p>

          <div className="selected-info">
            <p><strong>Seats:</strong> {selectedSeats.join(", ") || "None"}</p>
            <p><strong>Total:</strong> ₹{totalAmount}</p>
          </div>

          <button
            disabled={selectedSeats.length === 0}
            onClick={() =>
              navigate("/payment", {
                state: {
                  cinema,
                  screen,
                  showTime,
                  seats: selectedSeats,
                  totalAmount,
                },
              })
            }
          >
            Continue to Payment
          </button>
        </div>

      </div>
    </div>
  );
}

export default SeatSelection;