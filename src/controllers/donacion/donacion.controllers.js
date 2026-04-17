import { pool } from '../../config/db.js';

export const getDonacion = async (req, res) => {
  try {
    const result = await pool.query(`SELECT 
      d.id_donacion,
      d.fecha_donacion,
      dn.nombre AS donante,
      p.nombre AS producto,
      p.categoria,
      p.stock
    FROM donacion d
    JOIN donante dn ON dn.id_donante = d.id_donante
    JOIN producto p ON p.id_producto = d.id_producto
    ORDER BY d.fecha_donacion DESC;`);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const getDonacionById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM donacion WHERE id_donacion = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Donacion no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const createDonacion = async (req, res) => {
  const {
    id_donante,
    id_producto,
    fecha_donacion
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO donacion 
      (id_donante, id_producto, fecha_donacion)
      VALUES ($1,$2,$3) RETURNING *`,
      [id_donante,id_producto,fecha_donacion]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateDonacion = async (req, res) => {
  const { id } = req.params;
  const { id_donante,id_producto,fecha_donacion } = req.body;

  try {
    const result = await pool.query(
      `UPDATE donacion 
       id_donante=$1, id_producto=$2, fecha_donacion=$3
       WHERE id_donante=$4
       RETURNING *`,
      [id_donante,id_producto,fecha_donacion, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Donacion no encontrado' });
    }

    res.json(result.rows[0]);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const deleteDonacion = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM donacion WHERE id_donacion = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Donacion no encontrado' });
    }

    res.json({ message: 'Donacion eliminado' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};