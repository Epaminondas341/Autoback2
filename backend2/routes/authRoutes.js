const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController"); // Asegúrate de que el nombre del controlador es correcto
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Ruta para el registro de usuarios
router.post("/register", registerUser);

// Ruta para el inicio de sesión de usuarios
router.post("/login", loginUser);

// Ruta de prueba protegida para verificar el middleware de autenticación
router.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "Ruta protegida, acceso concedido." }); // Ajuste para retornar JSON
});

module.exports = router;
