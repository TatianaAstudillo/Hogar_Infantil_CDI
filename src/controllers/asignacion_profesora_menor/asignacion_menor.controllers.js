import { pool } from '../../config/db.js';

export const getAsignacion= async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM asignacion_profesora_menor');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const getAsignacionById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM asignacion_profesora_menor WHERE id_asignacion = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Asignacion no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const createAsignacion = async (req, res) => {
  const {
    id_profesora,
    id_menor
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO asignacion_profesora_menor 
      (id_profesora, id_menor)
      VALUES ($1,$2) RETURNING *`,
      [id_profesora,id_menor]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAsignacion = async (req, res) => {
  const { id } = req.params;
  const { id_profesora,id_menor } = req.body;

  try {
    const result = await pool.query(
      `UPDATE asignacion_profesora_menor 
       id_profesora=$1, id_menor=$2
       WHERE id_asignacion=$3
       RETURNING *`,
      [id_profesora,id_menor, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Asignacion no encontrado' });
    }

    res.json(result.rows[0]);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const deleteAsignacion = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM asignacion_profesora_menor WHERE id_asignacion = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Asignacion no encontrado' });
    }

    res.json({ message: 'Asignacion eliminado' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};