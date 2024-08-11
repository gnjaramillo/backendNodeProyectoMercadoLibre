const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET; // Asegúrate de definir JWT_SECRET en tu archivo .env

const tokenSign = async (usuario) => {
  const sign = await jwt.sign(
    // payload
    {
      _id: usuario._id,
    },
    JWT_SECRET, 
    { expiresIn: "2h" } // tiempo de expiración del token
  );
  return sign;
};

const verifyToken = async (tokenJwt) => {
  try {
    return jwt.verify(tokenJwt, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = { tokenSign, verifyToken };
