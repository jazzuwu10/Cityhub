import { useLocation } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./Ticket.css";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";


function Ticket() {
  const location = useLocation();
  const ticketRef = useRef();
  const { user } = useContext(AuthContext);

  const { cinema, screen, showTime, seats, totalAmount } =
    location.state || {};

  const ticketId = "CH" + Math.floor(Math.random() * 1000000);

  const downloadPDF = async () => {
    const canvas = await html2canvas(ticketRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 180, 0);
    pdf.save("CityHub_Ticket.pdf");
  };

  return (
    <div className="ticket-page">
      <div className="ticket-wrapper">

        <div className="ticket-card" ref={ticketRef}>
          
          {/* LEFT INFO SECTION */}
          <div className="ticket-left">
            <h2>🎬 CityHub</h2>
            <p className="movie-title">Movie Ticket</p>

            <div className="ticket-details">
              <p><strong>Cinema:</strong> {cinema}</p>
              <p><strong>Screen:</strong> {screen}</p>
              <p><strong>Time:</strong> {showTime}</p>
              <p><strong>Seats:</strong> {seats?.join(", ")}</p>
              <p><strong>Booking ID:</strong> {ticketId}</p>
              <p><strong>Paid:</strong> ₹{totalAmount}</p>
            </div>
          </div>

          {/* PERFORATION LINE */}
          <div className="ticket-divider"></div>

          {/* QR SECTION */}
          <div className="ticket-right">
            <QRCodeCanvas
              value={`BookingID:${ticketId}|Cinema:${cinema}|Seats:${seats}`}
              size={120}
              bgColor="#ffffff"
              fgColor="#000000"
            />
            <p>Scan at Entry</p>
          </div>

        </div>

        <button className="download-btn" onClick={downloadPDF}>
          Download Ticket (PDF)
        </button>

      </div>
    </div>
  );
}

export default Ticket;