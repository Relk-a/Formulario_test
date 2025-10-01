import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormPago from "./FormPagos";
import LoginAdmin from "./LoginAdmin";
import PanelAdmin from "./PanelAdmin";
import { useEffect, useState } from "react";
import logoBlanco from './assets/crosspay-solutions-logo-blanco.svg';
import logoColor from './assets/crosspay-solutions-logo-color.svg';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(
    !!localStorage.getItem("token") // Si hay token guardado
  );

  // Activar/desactivar dark mode en <body>
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleLogin = () => setIsAdmin(true);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAdmin(false);
  };

  return (
    <Router>
      {/* Logo cambia según modo */}
      <img
        src={darkMode ? logoBlanco : logoColor}
        alt="Crosspay Solutions"
        style={{
          display: "block",
          margin: "2.5rem auto 1.5rem auto",
          height: 64,
          maxWidth: "220px",
          filter: darkMode ? "drop-shadow(0 0 8px #5036f6)" : "none",
          transition: "filter 0.3s"
        }}
      />

      {/* Botón toggle modo claro/oscuro (sin sol/luna, menos ancho) */}
      <div
        className="toggle-mode-btn simple"
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Cambiar modo claro/oscuro"
      >
        <span className="toggle-ball" />
      </div>

      <Routes>
        {/* Cliente */}
        <Route path="/" element={<FormPago />} />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            !isAdmin ? (
              <LoginAdmin onLogin={handleLogin} />
            ) : (
              <PanelAdmin onLogout={handleLogout} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
