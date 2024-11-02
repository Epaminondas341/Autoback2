const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorHandler.js"); // Asegúrate de que la ruta es correcta

// Import Routes
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
app.use("/auth", authRoutes);
app.use("/payroll", payrollRoutes);
app.use("/atenea", ateneaRoutes);

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
app.get("/api/test", (req, res) => {
  res.json({ message: "API funcionando correctamente" }); // Respuesta en formato JSON
});

// Ruta para la raíz
app.get("/", (req, res) => {
  res.send("Bienvenido a mi API"); // Respuesta en texto plano
});

// Middleware de manejo de errores
app.use(errorHandler); // Debe ir al final

// Iniciar el servidor en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
