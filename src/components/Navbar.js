function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">CityHub</h2>
      <button className="login-btn">Login</button>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 40px",
    background: "#111",
    color: "white",
  },
  btn: {
    background: "#ff3b3b",
    border: "none",
    color: "white",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Navbar;
