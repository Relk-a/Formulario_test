import { useEffect, useState } from "react";
import axios from "axios";

export default function PanelAdmin({ onLogout }) {
  const [transacciones, setTransacciones] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          onLogout();
          return;
        }
        const res = await axios.get("http://localhost:3000/api/transacciones", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransacciones(res.data);
      } catch (err) {
        console.error(err);
        onLogout();
      }
    };
    fetchData();
  }, [onLogout]);

  return (
    <div
      className="container"
      style={{
        maxWidth: 900,
        margin: "3rem auto",
        background: "var(--bg-sec)",
        borderRadius: 18,
        boxShadow: "0 4px 24px var(--shadow)",
        padding: "2.5rem 2rem",
      }}
    >
      {/* Encabezado y botón de cierre de sesión */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ margin: 0, textAlign: "left", background: "none" }}>Transacciones Registradas</h2>
        <button className="btn btn-danger" onClick={onLogout} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          Cerrar sesión
        </button>
      </div>

      {/* Tabla de transacciones */}
      <div style={{ overflowX: "auto", maxHeight: 420 }}>
        <table className="table table-bordered" style={{ minWidth: 700, background: "var(--bg-sec)" }}>
          <thead>
            <tr>
              <th>Divisa</th>
              <th>Monto</th>
              <th>Descripción</th>
              <th>Nombre</th>
              <th>Tipo Documento</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {transacciones.map((t) => (
              <tr key={t._id}>
                <td style={{ textAlign: "center" }}>{t.divisa}</td>
                <td style={{ textAlign: "center" }}>{t.monto}</td>
                <td>{t.descripcion}</td>
                <td>{t.nombre}</td>
                <td style={{ textAlign: "center" }}>{t.tipo_documento}</td>
                <td style={{ textAlign: "center" }}>
                  {t.fecha_pago
                    ? new Date(t.fecha_pago).toLocaleString()
                    : "Sin fecha"}
                </td>
              </tr>
            ))}
            {transacciones.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", color: "#999" }}>
                  No hay transacciones registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
