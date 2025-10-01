import { useState } from "react";
import axios from "axios";

export default function FormPago() {
  const [form, setForm] = useState({
    divisa: "COP",
    monto: "",
    descripcion: "",
    nombre: "",
    tipo_documento: "Cédula",
    tarjeta: "",
    fecha_vencimiento: "",
    codigo_seguridad: ""
  });
 
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [showCVV, setShowCVV] = useState(false);
  const [modal, setModal] = useState({ show: false, message: "", success: true });

  // Solo números para tarjeta y CVV
  const handleCardInput = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 16);
    setForm({ ...form, tarjeta: value });
  };

  const handleCVVInput = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3);
    setForm({ ...form, codigo_seguridad: value });
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCloseModal = () => setModal({ show: false, message: "", success: true });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.tarjeta.length < 16) {
      setModal({ show: true, message: "La tarjeta debe tener 16 dígitos", success: false });
      return;
    }
    if (form.codigo_seguridad.length !== 3) {
      setModal({ show: true, message: "El CVV debe tener 3 dígitos", success: false });
      return;
    }
    if (!expMonth || !expYear) {
      setModal({ show: true, message: "Selecciona mes y año de vencimiento", success: false });
      return;
    }

    try {
      const dataToSend = {
        divisa: form.divisa,
        monto: form.monto,
        descripcion: form.descripcion,
        nombre: form.nombre,
        tipo_documento: form.tipo_documento,
        tarjeta: {
          numero: form.tarjeta,
          vencimiento: `${expMonth}/${expYear}`,
          cvv: form.codigo_seguridad
        },
        fecha_pago: new Date().toISOString()
      };

      await axios.post("https://formulario-test.onrender.com/api/transacciones", dataToSend);

      setModal({ show: true, message: "Pago registrado con éxito", success: true });

      setForm({
        divisa: "COP",
        monto: "",
        descripcion: "",
        nombre: "",
        tipo_documento: "Cédula",
        tarjeta: "",
        fecha_vencimiento: "",
        codigo_seguridad: ""
      });
      setExpMonth("");
      setExpYear("");
    } catch (err) {
      console.error(err);
      setModal({ show: true, message: "Error registrando la transacción", success: false });
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 420, position: "relative" }}>
      {modal.show && (
        <div className="modal-alert-bg">
          <div className={`modal-alert-content${modal.success ? "" : " error"}`}>
            <div style={{ marginBottom: "1.5rem" }}>{modal.message}</div>
            <button
              className="btn btn-light modal-alert-btn"
              onClick={handleCloseModal}
              autoFocus
            >
              Continuar
            </button>
          </div>
        </div>
      )}
      <h2 className="mb-4" style={{ textAlign: "center" }}>Formulario de Pago</h2>
      <form onSubmit={handleSubmit} className="card" style={{ padding: "2rem" }}>
        {/* Divisa */}
        <div className="mb-3">
          <label className="form-label">Divisa</label>
          <select
            name="divisa"
            value={form.divisa}
            onChange={handleChange}
            className="form-select"
          >
            <option value="COP">COP (Peso colombiano)</option>
            <option value="USD">USD (Dólar estadounidense)</option>
          </select>
        </div>

        {/* Monto */}
        <div className="mb-3">
          <label className="form-label">Monto</label>
          <input
            type="number"
            name="monto"
            value={form.monto}
            onChange={handleChange}
            className="form-control"
            required
            min={1}
            placeholder="Ingrese el monto"
            autoComplete="off"
          />
        </div>

        {/* Descripción */}
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <input
            type="text"
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            className="form-control"
            required
            maxLength={60}
            placeholder="Motivo del pago"
            autoComplete="off"
          />
        </div>

        {/* Nombre */}
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="form-control"
            required
            maxLength={40}
            placeholder="Nombre del titular"
            autoComplete="off"
          />
        </div>

        {/* Tipo de Documento */}
        <div className="mb-3">
          <label className="form-label">Tipo de Documento</label>
          <select
            name="tipo_documento"
            value={form.tipo_documento}
            onChange={handleChange}
            className="form-select"
          >
            <option value="Cédula">Cédula</option>
            <option value="Pasaporte">Pasaporte</option>
          </select>
        </div>

        {/* Número de tarjeta */}
        <div className="mb-3">
          <label className="form-label">Número de tarjeta</label>
          <input
            type="text"
            name="tarjeta"
            value={form.tarjeta.replace(/(\d{4})/g, "$1 ").trim()}
            onChange={handleCardInput}
            className="form-control"
            required
            maxLength={19}
            placeholder="0000 0000 0000 0000"
            inputMode="numeric"
            autoComplete="cc-number"
          />
        </div>

        {/* Fecha de vencimiento */}
        <div className="mb-3">
          <label className="form-label">Fecha de vencimiento</label>
          <div style={{ display: "flex", gap: "1rem" }}>
            <select
              id="expMonth"
              name="expMonth"
              value={expMonth}
              onChange={e => setExpMonth(e.target.value)}
              required
              className="form-select"
              style={{ flex: 1 }}
            >
              <option value="">Mes</option>
              {[...Array(12)].map((_, i) => (
                <option key={i+1} value={String(i+1).padStart(2, '0')}>
                  {String(i+1).padStart(2, '0')}
                </option>
              ))}
            </select>
            <select
              id="expYear"
              name="expYear"
              value={expYear}
              onChange={e => setExpYear(e.target.value)}
              required
              className="form-select"
              style={{ flex: 1 }}
            >
              <option value="">Año</option>
              {Array.from({length: 12}, (_, i) => {
                const year = new Date().getFullYear() + i;
                return (
                  <option key={year} value={String(year).slice(2)}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* CVV */}
        <div className="mb-3">
          <label className="form-label">Código de seguridad (CVV)</label>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              type={showCVV ? "text" : "password"}
              name="codigo_seguridad"
              value={form.codigo_seguridad}
              onChange={handleCVVInput}
              className="form-control"
              required
              maxLength="3"
              placeholder="CVV"
              inputMode="numeric"
              autoComplete="cc-csc"
              style={{ flex: 1 }}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              tabIndex={-1}
              style={{ padding: "0.3rem 0.7rem" }}
              onClick={() => setShowCVV(!showCVV)}
              aria-label={showCVV ? "Ocultar CVV" : "Mostrar CVV"}
            >
              {showCVV ? "Ocultar" : "Ver"}
            </button>
          </div>
        </div>

        {/* Botón */}
        <button type="submit" className="btn btn-primary w-100" style={{ marginTop: "1rem" }}>
          Pagar
        </button>
      </form>
    </div>
  );
}
