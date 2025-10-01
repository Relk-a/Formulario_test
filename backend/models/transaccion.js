const mongoose = require("mongoose");

const TransaccionSchema = new mongoose.Schema({
  divisa: { type: String, required: true },
  monto: { type: Number, required: true },
  descripcion: { type: String, required: true },
  nombre: { type: String, required: true },
  tipo_documento: { type: String, required: true },
  tarjeta: {
  numero: { type: String, required: true },
  vencimiento: { type: String, required: true }
},
  fecha_pago: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaccion", TransaccionSchema);
