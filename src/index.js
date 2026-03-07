import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./pages/ThemeContext";
import { AuthProvider } from "./pages/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
  <AuthProvider>
    <App /> 
     </AuthProvider>
</ThemeProvider>
  </React.StrictMode>
);
