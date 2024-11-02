// backend2/models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Definimos el esquema del usuario
const userSchema = new mongoose.Schema(
  {
    // Nombre del usuario, requerido
    name: {
      type: String,
      required: true,
    },
    // Correo electrónico único del usuario, con validación de formato
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Por favor ingresa un email válido"],
    },
    // Contraseña del usuario, requerida y protegida con encriptación
    password: {
      type: String,
      required: true,
    },
    // Rol del usuario, opcional, con valores predeterminados posibles
    role: {
      type: String,
      enum: ["empleado", "administrador"], // Opcional: diferentes tipos de usuario
      default: "empleado",
    },
  },
  { timestamps: true } // Añade createdAt y updatedAt automáticamente
);

// Middleware para encriptar la contraseña antes de guardar el usuario
userSchema.pre("save", async function (next) {
  try {
    // Solo encripta la contraseña si ha sido modificada o es nueva
    if (!this.isModified("password")) return next();

    // Genera un hash con salt y asigna la contraseña encriptada
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Exportamos el modelo basado en userSchema
module.exports = mongoose.model("User", userSchema);
