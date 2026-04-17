import { pool } from '../../config/db.js';

export const getMovimiento= async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM movimiento');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const getMovimientoById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM movimiento WHERE id_movimiento = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Movimieneto no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const createMovimiento = async (req, res) => {
  const {
    tipo_movimiento,
    cantidad,
    id_producto,
    id_usuario
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO movimiento 
      (tipo_movimiento, cantidad, id_producto, id_usuario)
      VALUES ($1,$2,$3,$4) RETURNING *`,
      [tipo_movimiento,cantidad,id_producto,id_usuario]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMovimiento = async (req, res) => {
  const { id } = req.params;
  const { tipo_movimiento,
    cantidad,
    id_producto,
    id_usuario } = req.body;

  try {
    const result = await pool.query(
      `UPDATE movimiento
       tipo_movimiento=$1, cantidad=$2, id_producto=$3, id_usuario=$4
       WHERE id_producto=$5
       RETURNING *`,
      [tipo_movimiento,cantidad,id_producto,id_usuario, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Movimiento no encontrado' });
    }

    res.json(result.rows[0]);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const deleteMovimiento = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM movimientop WHERE id_movimiento = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Movimiento no encontrado' });
    }

    res.json({ message: 'Movimiento eliminado' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};