import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../pages/ThemeContext";
import { AuthContext } from "../pages/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const [points, setPoints] = useState(Number(localStorage.getItem("cityhub_points")) || 0);

  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  // Live update points from localStorage
  useEffect(() => {
    const interval = setInterval(() => {
      const updated = Number(localStorage.getItem("cityhub_points")) || 0;
      setPoints(updated);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="navbar">
      {/* LOGO */}
      <h2 className="logo" onClick={() => navigate("/")}>CityHub</h2>

      {/* NAV LINKS */}
      <div className="nav-links">
        <NavLink to="/" end className="nav-link">Home</NavLink>
        <NavLink to="/movies" className="nav-link">Movies</NavLink>
        <NavLink to="/events" className="nav-link">Events</NavLink>
        <NavLink to="/my-bookings" className="nav-link">My Bookings</NavLink>
      </div>

      {/* RIGHT SIDE */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        {/* Points */}
        <div style={{ color: "#00ff99", fontWeight: "600" }}>
          🎮 {points}
        </div>

        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="theme-btn">
          {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
        </button>

        {/* User */}
        {user ? (
  <>
    <span>👋 {user.name}</span>
    <button className="login-btn" onClick={logout}>
      Logout
    </button>
  </>
) : (
  <NavLink to="/login">
    <button className="login-btn">Login</button>
  </NavLink>
)}
      </div>
    </nav>
  );
}

export default Navbar;