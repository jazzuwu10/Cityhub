import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username.trim()) return;

    login(username);
    navigate("/");
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h2>Welcome to CityHub</h2>
        <p className="login-sub">Book movies, events & more</p>

        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

      </div>
    </div>
  );
}

export default Login;