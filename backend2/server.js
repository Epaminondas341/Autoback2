const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require("socket.io");
const errorHandler = require("./middlewares/errorHandler"); // Asegúrate de que la ruta es correcta

// Importar Rutas
const authRoutes = require("./routes/authRoutes");
const payrollRoutes = require("./routes/payrollRoutes");
const ateneaRoutes = require("./routes/atenea");

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const app = express();

// Crear el servidor HTTP
const server = http.createServer(app);

// Inicializar socket.io con el servidor HTTP
const io = socketIo(server);

// Middleware
app.use(cors()); // Permitir CORS para solicitudes desde el frontend
app.use(express.json()); // Middleware para parsear JSON

// Montar las rutas
app.use("/api/auth", authRoutes);
app.use("/api/payroll", payrollRoutes);
app.use("/api/atenea", ateneaRoutes);

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

// Manejar la conexión de los sockets
io.on("connection", (socket) => {
  console.log("Usuario conectado");

  // Escuchar mensajes del cliente
  socket.on("sendMessage", (message) => {
    console.log("Mensaje recibido:", message);
    // Responder al cliente con el mensaje
    socket.emit("receiveMessage", { text: `Atenea responde: ${message}` });
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});

// Ruta de prueba para verificar que la API está funcionando
app.get("/api/atenea", (req, res) => {
  res.json({
    message: "Soy Atenea, su asistente virtual, quien lo guiará en la visita.",
  });
});

// Ruta para el mensaje de bienvenida
app.get("/api/welcome", (req, res) => {
  res.json({
    message: "Bienvenido",
  });
});

// Ruta para la autenticación (login)
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Lógica de autenticación
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// Ruta para la raíz
app.get("/", (req, res) => {
  res.send("Autocentro, Su empresa de confianza");
});

// Uso del middleware de manejo de errores (debe ir después de todas las rutas)
app.use(errorHandler);

// Iniciar el servidor en el puerto definido
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
