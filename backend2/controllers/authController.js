const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Registro de usuario
exports.registerUser = async (req, res) => {
  console.log("Datos de registro recibidos:", req.body);
  const { name, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "El usuario ya está registrado" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    // Guardar el nuevo usuario en la base de datos
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "Usuario registrado con éxito" });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res
      .status(500)
      .json({ success: false, message: "Error al registrar el usuario" });
  }
};

// Login de usuario
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Email recibido para login:", email);

  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Credenciales incorrectas" });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Contraseña coincide:", isMatch);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Credenciales incorrectas" });
    }

    // Generar el token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // Enviar respuesta con token y datos del usuario
    res.status(200).json({
      success: true,
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res
      .status(500)
      .json({ success: false, message: "Error al iniciar sesión" });
  }
};
