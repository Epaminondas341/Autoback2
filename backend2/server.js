const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorHandler.js"); // Asegúrate de que la ruta es correcta

// Importar Rutas
const authRoutes = require("./routes/authRoutes");
const payrollRoutes = require("./routes/payrollRoutes");
const ateneaRoutes = require("./routes/atenea"); // Asegúrate de que la ruta es correcta

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Permitir CORS para solicitudes desde el frontend
app.use(express.json()); // Middleware para parsear JSON

// Montar las rutas
app.use("/api/auth", authRoutes); // Cambié la ruta a "/api/auth"
app.use("/api/payroll", payrollRoutes); // Cambié la ruta a "/api/payroll"
app.use("/api/atenea", ateneaRoutes); // Cambié la ruta a "/api/atenea"

// Conectar a MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/autoback2", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((err) => {
    console.error("No se pudo conectar a MongoDB:", err);
    process.exit(1); // Finaliza el proceso si no se puede conectar
  });

const PORT = process.env.PORT || 5000; // Puerto de la aplicación

// Ruta de prueba para verificar que la API está funcionando
app.get("/api/atenea", (req, res) => {
  res.json({
    message: "Soy Atenea su asistente virtual, quien lo guiara en la visita.",
  }); // Respuesta en formato JSON
});

// Ruta para el mensaje de bienvenida
app.get("/api/welcome", (req, res) => {
  res.json({
    message: "Bienvenido",
  }); // Respuesta en formato JSON
});

// Ruta para la raíz
app.get("/", (req, res) => {
  res.send("Autocentro, Su empresa de confianza"); // Respuesta en texto plano
});

// Middleware de manejo de errores
app.use(errorHandler); // Debe ir al final

// Iniciar el servidor en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
