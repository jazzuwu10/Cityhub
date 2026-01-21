import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Events from "./pages/Events";
import Restaurants from "./pages/Restaurants";
import Shopping from "./pages/Shopping";
import BookMovie from "./pages/BookMovie";
import SeatSelection from "./pages/SeatSelection";
import SelectCinema from "./pages/SelectCinema";
import Payment from "./pages/Payment";
import Success from "./pages/Success";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/events" element={<Events />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/shopping" element={<Shopping />} />
        <Route path="/book-movie/:id" element={<BookMovie />} />
        <Route path="/seats/:id" element={<SeatSelection />} />
      <Route path="/select-cinema/:id" element={<SelectCinema />} />
      <Route path="/payment" element={<Payment />} />
<Route path="/success" element={<Success />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
