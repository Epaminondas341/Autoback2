// backend2/models/Payroll.js
const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema({
  // Referencia al modelo User. Asegúrate de tener User definido en models/User.js
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // Tipo de contrato, debe ser uno de los tres valores especificados
  contractType: {
    type: String,
    enum: ["OPS", "Fijo", "Temporal"],
    required: true,
  },
  // Salario base, campo obligatorio
  salary: { type: Number, required: true },
  // Tarifa por hora (opcional), útil si el empleado trabaja por horas
  hourlyRate: { type: Number },
  // Horas extra diurnas, opcional
  extraHourDay: { type: Number },
  // Horas extra nocturnas, opcional
  extraHourNight: { type: Number },
  // Horas extra en festivo, opcional
  holidayExtraHour: { type: Number },
  // Campos para descuentos y contribuciones, opcionales según el tipo de contrato
  ICBF: { type: Number },
  SENA: { type: Number },
  transportAllowance: { type: Number },
  health: { type: Number },
  pension: { type: Number },
  solidarityFund: { type: Number },
  arl: { type: Number },
  // Días de vacaciones y días de licencia por enfermedad
  vacationDays: { type: Number },
  sickLeave: { type: Number },
  // Fecha de creación, con un valor predeterminado de la fecha actual
  createdAt: { type: Date, default: Date.now },
});

// Exportamos el modelo Payroll basado en payrollSchema
module.exports = mongoose.model("Payroll", payrollSchema);
