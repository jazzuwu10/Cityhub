import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import SeatSelection from "./pages/SeatSelection";
import SelectCinema from "./pages/SelectCinema";
import Payment from "./pages/Payment";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import MovieDetails from "./pages/MovieDetails";
import EventBooking from "./pages/EventBooking";
import ComingSoon from "./pages/ComingSoon";
import MyBookings from "./pages/MyBookings";
import Ticket from "./pages/Ticket";
import PaymentSuccess from "./pages/PaymentSuccess";
import Login from "./pages/Login";
function App() {

  // ✅ State MUST be inside the function
  const [filter, setFilter] = useState("all");

  return (
    <BrowserRouter>
      <Navbar />

      {/* Optional: If you want mood filter globally */}
      {/* <MoodFilter onFilter={setFilter} /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/seats/:id" element={<SeatSelection />} />
        <Route path="/select-cinema/:id" element={<SelectCinema />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/event-booking" element={<EventBooking />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/success" element={<PaymentSuccess />} />
      <Route path="/ticket" element={<Ticket />} />
      <Route path="/login" element={<Login />} />
      <Route path="/event-booking/:id" element={<EventBooking />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;