// backend2/middleware/ateneaMiddleware.js

// Middleware para loggear las solicitudes antes de llegar a los controladores
exports.logRequest = (req, res, next) => {
  console.log(
    `Solicitud recibida en ${req.originalUrl} - Método: ${req.method}`
  );
  next(); // Llama al siguiente middleware o controlador
};

// Middleware para verificar si el usuario tiene acceso
exports.checkAccess = (req, res, next) => {
  const token = req.headers["authorization"]; // Suponiendo que el token está en el header
  if (!token) {
    return res.status(403).send("Acceso denegado, se requiere autenticación.");
  }

  // Si el token es válido, se podría verificar aquí. De momento solo lo estamos chequeando.
  // Puedes agregar tu lógica de validación de JWT aquí si lo deseas.

  next(); // Si el token es válido, pasa al siguiente middleware o controlador
};
