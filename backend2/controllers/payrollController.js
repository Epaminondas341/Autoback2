// Importamos el modelo de nómina, que debe estar configurado en models/Payroll.js
const Payroll = require("../models/Payroll");

// Función para crear un nuevo registro de nómina
const createPayroll = async (req, res) => {
  try {
    // Creamos el nuevo registro usando los datos recibidos en req.body
    const payroll = new Payroll(req.body);
    await payroll.save();
    res
      .status(201)
      .json({ message: "Registro de nómina creado con éxito.", payroll });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Error al crear el registro de nómina",
        details: error.message,
      });
  }
};

// Función para obtener un registro de nómina por ID
const getPayroll = async (req, res) => {
  const { id } = req.params;
  try {
    // Buscamos el registro por ID
    const payroll = await Payroll.findById(id);
    if (!payroll) {
      return res
        .status(404)
        .json({ message: "Registro de nómina no encontrado" });
    }
    res.json(payroll);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Error al obtener el registro de nómina",
        details: error.message,
      });
  }
};

// Función para actualizar un registro de nómina por ID
const updatePayroll = async (req, res) => {
  const { id } = req.params;
  try {
    // Actualizamos el registro con los datos de req.body
    const payroll = await Payroll.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!payroll) {
      return res
        .status(404)
        .json({ message: "Registro de nómina no encontrado para actualizar" });
    }
    res.json({ message: "Registro de nómina actualizado con éxito.", payroll });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Error al actualizar el registro de nómina",
        details: error.message,
      });
  }
};

// Exportamos las funciones para que sean utilizadas en payrollRoutes.js
module.exports = {
  createPayroll,
  getPayroll,
  updatePayroll,
};
