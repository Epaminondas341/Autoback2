// middlewares/errorHandler.js

// Importamos express para manejar las respuestas
const { response } = require("express");

// Middleware para manejar errores
const errorHandler = (err, req, res, next) => {
  // Muestra el stack del error en la consola para depuración
  console.error(err.stack);

  // Respuesta de error personalizada
  res.status(err.status || 500).json({
    // Se asegura de usar el status correcto
    ok: false,
    msg: "Algo salió mal, por favor intente nuevamente",
    assistant: "Atenea", // Nombre de tu asistente
    error: err.message, // Mensaje de error
  });
};

module.exports = errorHandler;
