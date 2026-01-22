import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/home";
import Movies from "./pages/Movies";
import SeatSelection from "./pages/SeatSelection";
import SelectCinema from "./pages/SelectCinema";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import MovieDetails from "./pages/MovieDetails";
import EventBooking from "./pages/EventBooking";
import Restaurants from "./pages/Restaurants";
import RestaurantDetails from "./pages/RestaurantDetails";
import Shopping from "./pages/Shopping";
import ComingSoon from "./pages/ComingSoon";
import ProductDetails from "./pages/ProductDetails";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/seats/:id" element={<SeatSelection />} />
      <Route path="/select-cinema/:id" element={<SelectCinema />} />
      <Route path="/payment" element={<Payment />} />
<Route path="/success" element={<Success />} />
<Route path="/events" element={<Events />} />
<Route path="/events/:id" element={<EventDetails />} />
<Route path="/movies/:id" element={<MovieDetails />} />
<Route path="/event-booking" element={<EventBooking />} />
<Route path="/restaurants" element={<Restaurants />} />
<Route path="/restaurants/:id" element={<RestaurantDetails />} />
<Route path="/shopping" element={<Shopping />} />
<Route path="/coming-soon" element={<ComingSoon />} />
<Route path="/shopping/:id" element={<ProductDetails />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;