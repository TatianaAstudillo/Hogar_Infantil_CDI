import { pool } from '../../config/db.js';

export const getDonante = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM donante');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const getDonanteById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM donante WHERE id_donante = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Donante no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const createDonante = async (req, res) => {
  const {
    nombre,
    telefono,
    correo,
    direccion
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO donante 
      (nombre, telefono, correo, direccion)
      VALUES ($1,$2,$3,$4) RETURNING *`,
      [nombre, telefono,correo,direccion]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateDonante = async (req, res) => {
  const { id } = req.params;
  const { nombre,telefono,correo,direccion } = req.body;

  try {
    const result = await pool.query(
      `UPDATE donante 
       SET nombre = $1,
           telefono = $2,
           correo = $3,
           direccion = $4
       WHERE id_donante = $5
       RETURNING *`,
      [nombre,telefono,correo,direccion, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Donante no encontrado' });
    }

    res.json(result.rows[0]);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const deleteDonante = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM donante WHERE id_donante = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Donante no encontrado' });
    }

    res.json({ message: 'Donante eliminado' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};