// controllers/ateneaController.js
const welcome = (req, res) => {
  res.json({ message: "Bienvenido a Autocentro, tu empresa de confianza" });
};

const history = (req, res) => {
  res.json({ message: "Autocentro fue fundada en [año] con el propósito..." });
};

const nextSteps = (req, res) => {
  res.json({ message: "Próximos pasos: mejorar la interacción con Atenea..." });
};

module.exports = { welcome, history, nextSteps };
