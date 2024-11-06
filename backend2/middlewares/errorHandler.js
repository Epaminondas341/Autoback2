// middlewares/errorHandler.js

// Middleware para manejar errores
const errorHandler = (err, req, res, next) => {
  // Muestra el stack del error en la consola para depuración
  console.error("Error stack:", err.stack);

  // Respuesta de error personalizada
  res.status(err.status || 500).json({
    success: false,
    message: "Algo salió mal, por favor intente nuevamente.",
    error: err.message, // Mensaje de error
  });
};

module.exports = errorHandler;
