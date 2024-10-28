// middlewares/errorHandler.js

const { response } = require("express");

// Middleware para manejar errores
const errorHandler = (err, req, res = response, next) => {
  console.error(err.stack);

  // Respuesta de error personalizada
  res.status(500).json({
    ok: false,
    msg: "Algo salió mal, por favor intente nuevamente",
    assistant: "Atenea", // Nombre de tu asistente
    error: err.message, // Mensaje de error
  });
};

module.exports = errorHandler;
