import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">CityHub</h2>

      <div className="nav-links">
        <NavLink to="/" end className="nav-link">
          Home
        </NavLink>
        <NavLink to="/movies" className="nav-link">
          Movies
        </NavLink>
        <NavLink to="/events" className="nav-link">
          Events
        </NavLink>
        <NavLink to="/restaurants" className="nav-link">
          Restaurants
        </NavLink>
        <NavLink to="/shopping" className="nav-link">
          Shopping
        </NavLink>
        <NavLink to="/my-bookings" className="nav-link">
          My Bookings
        </NavLink>

      </div>

      <button className="login-btn">Login</button>
    </nav>
  );
}

export default Navbar;
