import { useState } from "react";
import axios from "axios";

export default function LoginAdmin({ onLogin }) {
  const [form, setForm] = useState({ usuario: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/login", form);
      localStorage.setItem("token", res.data.token);
      onLogin(); // Notificar al padre que ya se autenticó
    } catch (err) {
        console.error(err);
      alert("❌ Credenciales inválidas");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Login Administrador</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Usuario</label>
          <input
            type="text"
            name="usuario"
            value={form.usuario}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Ingresar
        </button>
      </form>
    </div>
  );
}
