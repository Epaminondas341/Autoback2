// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Atenea from "./components/Atenea";
import "./styles/App.css";
import "./styles/index.css";

function App() {
  const [welcomeMessage, setWelcomeMessage] = useState(""); // Estado para el mensaje de bienvenida
  const [assistantMessage, setAssistantMessage] = useState(""); // Estado para el mensaje del asistente

  useEffect(() => {
    // Realiza una solicitud al backend para obtener el mensaje de bienvenida
    fetch("/api/welcome")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Procesa como JSON
      })
      .then((data) => setWelcomeMessage(data.message))
      .catch((error) => console.error("Error:", error));

    // Realiza otra solicitud al backend para obtener el mensaje del asistente
    fetch("/api/atenea")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Procesa como JSON
      })
      .then((data) => setAssistantMessage(data.message))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Muestra la barra de navegación en la parte superior */}
        <div className="logo-container">
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>{welcomeMessage}</h1>
        <h1 className="text-4xl font-bold text-center">
          Autocentro, su empresa de confianza
        </h1>
        <div className="assistant-message">
          <p>{assistantMessage}</p>
        </div>
        <div className="card">
          {/* Aquí puedes añadir más contenido o botones */}
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/atena" element={<Atenea />} /> {/* Agrega esta línea */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
