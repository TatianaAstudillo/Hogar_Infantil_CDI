import { pool } from '../../config/db.js';

export const getHistorial = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM historial_medico');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const getHistorialById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM historial_medico WHERE id_historial = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Historial medico no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const createHistorial = async (req, res) => {
  const {
    diagnostico,
    tratamiento,
    fecha_registro,
    id_menor,
    id_usuario
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO historial_medico 
      (diagnostico, tratamiento, fecha_registro, id_menor,id_usuario)
      VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [diagnostico,tratamiento,fecha_registro,id_menor,id_usuario]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateHistorial = async (req, res) => {
  const { id } = req.params;
  const { diagnostico,tratamiento,fecha_registro,id_menor,id_usuario } = req.body;

  try {
    const result = await pool.query(
      `UPDATE historial_medico 
       diagnostico=$1, tratamiento=$2, fecha_registro=$3, id_menor=$4, id_usuario=$5
       WHERE id_historial=$6
       RETURNING *`,
      [diagnostico,tratamiento,fecha_registro,id_menor,id_usuario, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Historial no encontrado' });
    }

    res.json(result.rows[0]);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const deleteHistorial = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM historial_medico WHERE id_historial = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Historial medico no encontrado' });
    }

    res.json({ message: 'Historial medico eliminado' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};