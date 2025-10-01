// backend/routes/transacciones.js
const express = require("express");
const router = express.Router();
const Transaccion = require("../models/transaccion");
const authMiddleware = require("../middleware/auth");

// Helper: enmascara número manteniendo longitud original
function maskNumberKeepingLength(fullNumber) {
  const onlyDigits = String(fullNumber).replace(/\D/g, "");
  const last4 = onlyDigits.slice(-4);
  return last4.padStart(onlyDigits.length, "*"); // ************1234
}

// POST público: registrar transacción (usar CVV en memoria, no guardarlo)
router.post("/", async (req, res) => {
  try {
    const payload = { ...req.body };

    // Validaciones mínimas
    if (!payload.divisa || !payload.monto || !payload.nombre) {
      return res.status(400).json({ message: "Campos obligatorios faltantes" });
    }
    if (!payload.tarjeta || !payload.tarjeta.numero) {
      return res.status(400).json({ message: "Tarjeta inválida" });
    }

    // Normalizar número y extraer datos temporales
    const full = String(payload.tarjeta.numero).replace(/\D/g, "");
    const venc = payload.tarjeta.vencimiento || null;
    const cvv = payload.tarjeta.cvv; // <-- usar SOLO en memoria

    // --- Simulación de verificación: usa CVV en memoria o llama al gateway aquí ---
    // Ejemplo simple (solo para demo): considerar autorizada si cvv === "123"
    // En producción reemplaza esto por llamada al proveedor de pagos.
    const autorizada = cvv === "123";

    // --- Preparar objeto seguro para guardar (NO incluir cvv) ---
    const maskedNumber = maskNumberKeepingLength(full);

    const safe = {
      divisa: payload.divisa,
      monto: payload.monto,
      descripcion: payload.descripcion,
      nombre: payload.nombre,
      tipo_documento: payload.tipo_documento,
      tarjeta: {
        numero: maskedNumber,
        vencimiento: venc || null
      },
      fecha_pago: payload.fecha_pago ? new Date(payload.fecha_pago) : new Date(),
      estado: autorizada ? "autorizada" : "rechazada"
    };

    // Guardar en DB
    const nuevaTransaccion = new Transaccion(safe);
    await nuevaTransaccion.save();

    // Responder sin datos sensibles
    return res.status(201).json({ id: nuevaTransaccion._id, estado: nuevaTransaccion.estado });
  } catch (err) {
    console.error("❌ Error guardando transacción:", err);
    return res.status(500).json({ message: "Error registrando transacción" });
  }
});

// GET protegido: listar transacciones (admin)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const transacciones = await Transaccion.find().sort({ fecha_pago: -1 });
    return res.json(transacciones);
  } catch (err) {
    console.error("❌ Error obteniendo transacciones:", err);
    return res.status(500).json({ message: "Error obteniendo transacciones" });
  }
});

module.exports = router;
