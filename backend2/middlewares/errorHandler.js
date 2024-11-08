// Middleware para manejar errores
const errorHandler = (err, req, res, next) => {
  // Muestra el stack del error en la consola para depuración
  console.error("Error stack:", err.stack);

  // Respuesta de error personalizada
  if (err.status) {
    return res.status(err.status).json({
      success: false,
      message: err.message || "Algo salió mal, por favor intente nuevamente.",
      error: err.stack, // Agregar más detalles sobre el error
    });
  }

  // Si no se especifica el estado, es un error genérico del servidor
  res.status(500).json({
    success: false,
    message: "Algo salió mal, por favor intente nuevamente.",
    error: err.message, // Mensaje de error
  });
};

module.exports = errorHandler;
