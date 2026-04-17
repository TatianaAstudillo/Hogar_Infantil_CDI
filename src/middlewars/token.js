import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 🔥 verificar si viene el token
    if (!authHeader) {
      return res.status(401).json({ message: 'No hay token' });
    }

    // formato: "Bearer TOKEN"
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    // 🔐 verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // guardar datos del usuario en request
    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};