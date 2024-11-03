// backend2/routes/payrollRoutes.js

const express = require("express");
const payrollController = require("../controllers/payrollController");
const router = express.Router();

// Ruta para crear un nuevo registro de nómina
// POST /api/payroll/create
router.post("/create", payrollController.createPayroll);

// Ruta para obtener un registro de nómina por ID
// GET /api/payroll/:id
router.get("/:id", payrollController.getPayroll);

// Ruta para actualizar un registro de nómina por ID
// PUT /api/payroll/:id
router.put("/:id", payrollController.updatePayroll);

module.exports = router;
