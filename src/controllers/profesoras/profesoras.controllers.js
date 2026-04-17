import { pool } from '../../config/db.js';
export const getProfesora = async (req, res) => {
  try {
    const result = await pool.query(`SELECT 
  p.id_profesora,
  u.nombre,
  u.apellido,
  u.correo
FROM profesora p
JOIN usuario u ON u.id_usuario = p.id_usuario;` );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
