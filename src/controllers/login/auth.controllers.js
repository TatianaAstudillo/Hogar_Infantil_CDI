import { pool } from '../../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { nombre, apellido, correo, password, rol } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO usuario (nombre, apellido, correo, contrasena_hash, rol)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [nombre, apellido, correo, hash, rol]
    );

    const user = result.rows[0];

    if (rol === 'profesora') {
      await pool.query(`INSERT INTO profesora (id_usuario) VALUES ($1)`, [user.id_usuario]);
    }

    if (rol === 'enfermera') {
      await pool.query(`INSERT INTO enfermera (id_usuario) VALUES ($1)`, [user.id_usuario]);
    }

    if (rol === 'psicologa') {
      await pool.query(`INSERT INTO psicologa (id_usuario) VALUES ($1)`, [user.id_usuario]);
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { correo, password } = req.body;

  try {
    const result = await pool.query(
      `SELECT * FROM usuario WHERE correo = $1`,
      [correo]
    );
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Usuario no existe' });
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.contrasena_hash);

    if (!valid) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: user.id_usuario, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    res.json({ 
      token,
      user: {
      id: user.id_usuario,
      nombre: user.nombre,
      correo: user.correo,
      rol: user.rol
  }
  })
  } catch (error) {
  console.error("ERROR LOGIN COMPLETO:", error);

  res.status(500).json({
    mensaje: "Error interno del servidor",
    error: error.message,
    detalle: error
  });
}
};