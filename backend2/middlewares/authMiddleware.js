const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Obtener el token de la cabecera de autorización
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(403)
      .json({ message: "Acceso denegado, token requerido" });
  }

  const token = authHeader.split(" ")[1]; // Extraer el token después de 'Bearer'

  try {
    // Verificar el token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // Adjuntar el usuario verificado al objeto de la solicitud
    req.user = verified;
    next();
  } catch (error) {
    // Responder con un error 401 si el token no es válido
    console.error("Error al verificar el token:", error.message); // Log de error para facilitar el diagnóstico
    return res.status(401).json({ message: "Token no válido" });
  }
};

module.exports = authMiddleware;
