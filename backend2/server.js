// backend/server.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorHandler"); // Importar el middleware de manejo de errores
const ateneaRoutes = require("./routes/atenea"); // Importar las rutas de Atenea

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const app = express();

app.use(cors()); // Permitir CORS para solicitudes desde el frontend
app.use(express.json()); // Middleware para parsear JSON

// Conectar a MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/autoback2", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((err) => console.error("No se pudo conectar a MongoDB:", err));

const PORT = process.env.PORT || 5000; // Puerto de la aplicación

// Ruta de prueba para verificar que la API está funcionando
app.get("/api/test", (req, res) => {
  res.send("API funcionando correctamente");
});

// Ruta para interactuar con el asistente Atenea
app.get("/api/atena", (req, res) => {
  res.send("Hola, soy Atenea, tu asistente en este proyecto.");
});

// Ruta para la raíz
app.get("/", (req, res) => {
  res.send("Bienvenido a mi API");
});

// Usar las rutas de Atenea
app.use("/atenea", ateneaRoutes);

// Middleware de manejo de errores
app.use(errorHandler); // Debe ir al final

// Iniciar el servidor en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
