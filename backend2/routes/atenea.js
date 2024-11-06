// backend/routes/atenea.js

const { Router } = require("express");
const router = Router();

// Ruta de bienvenida
router.get("/", (req, res) => {
  res.send("Estoy aquí para ayudarte.");
});

// Puedes agregar más rutas para funciones específicas de Atenea
router.post("/help", (req, res) => {
  res.send("¿En qué puedo ayudarte?");
});

module.exports = router;
