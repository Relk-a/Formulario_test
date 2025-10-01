import { useState } from "react";
import axios from "axios";

export default function LoginAdmin({ onLogin }) {
  const [form, setForm] = useState({ usuario: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://formulario-test.onrender.com/api/login", form);
      localStorage.setItem("token", res.data.token);
      onLogin();
    } catch (err) {
      console.error(err);
      alert("Credenciales inválidas");
    }
  };
 
  return (
    <div className="container mt-5" style={{ maxWidth: 420 }}>
      <h2 className="mb-4" style={{ textAlign: "center" }}>
        Login Administrador
      </h2>
      <form
        onSubmit={handleSubmit}
        className="card"
        style={{ padding: "2rem" }}
      >
        <div className="mb-3">
          <label className="form-label">Usuario</label>
          <input
            type="text"
            name="usuario"
            value={form.usuario}
            onChange={handleChange}
            className="form-control"
            required
            maxLength={32}
            placeholder="Ingrese su usuario"
            autoComplete="username"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className="form-control"
              required
              maxLength={32}
              placeholder="Ingrese su contraseña"
              autoComplete="current-password"
              style={{ flex: 1 }}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              tabIndex={-1}
              style={{ padding: "0.3rem 0.7rem" }}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={
                showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
            >
              {showPassword ? "Ocultar" : "Ver"}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          style={{ marginTop: "1rem" }}
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}
