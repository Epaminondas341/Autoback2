// backend2/routes/payrollRoutes.js

const express = require("express");
const payrollController = require("../controllers/payrollController");
const router = express.Router();

// Ruta para crear un nuevo registro de nómina
// POST /create - Llama al controlador createPayroll
router.post("/create", payrollController.createPayroll);

// Ruta para obtener un registro de nómina por ID
// GET /:id - Llama al controlador getPayroll
router.get("/:id", payrollController.getPayroll);

// Ruta para actualizar un registro de nómina por ID
// PUT /:id - Llama al controlador updatePayroll
router.put("/:id", payrollController.updatePayroll);

module.exports = router;
