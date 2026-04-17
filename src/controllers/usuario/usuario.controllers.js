import { pool } from '../../config/db.js';
import bcrypt from 'bcrypt';



export const getUsuarios = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuario');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const getUsuarioById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM usuario WHERE id_usuario = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const createUsuario = async (req, res) => {
  const {
    nombre,
    apellido,
    correo,
    contrasena_hash,
    rol,
    estado
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(contrasena_hash, 10);

    const result = await pool.query(
      `INSERT INTO usuario (
        nombre,
        apellido,
        correo,
        contrasena_hash,
        rol,
        estado,
        fecha_creacion
      )
      VALUES ($1,$2,$3,$4,$5,$6,NOW())
      RETURNING *`,
      [
        nombre,
        apellido,
        correo,
        hashedPassword,
        rol,
        estado === "true" || estado === true 
      ]
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

    res.status(201).json(user);

  } catch (error) {
    console.log("ERROR BACKEND:", error); // 👈 CLAVE
    res.status(500).json({ error: error.message });
  }
};


export const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, correo, rol, estado } = req.body;

  try {
    const result = await pool.query(
      `UPDATE usuario 
       SET nombre=$1, apellido=$2, correo=$3, rol=$4, estado=$5
       WHERE id_usuario=$6
       RETURNING *`,
      [nombre, apellido, correo, rol, estado, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(result.rows[0]);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const deleteUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM usuario WHERE id_usuario = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario eliminado' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
