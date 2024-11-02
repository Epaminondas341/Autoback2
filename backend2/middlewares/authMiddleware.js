const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Obtener el token de la cabecera de autorización
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Acceso denegado" });
  }

  try {
    // Verificar el token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // Adjuntar el usuario verificado al objeto de la solicitud
    req.user = verified;
    next();
  } catch (error) {
    // Responder con un error 401 si el token no es válido
    res.status(401).json({ message: "Token no válido" });
  }
};

module.exports = authMiddleware;
