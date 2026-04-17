import { pool } from '../../config/db.js';

export const getSeguimiento = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
      sm.id_seguimiento AS id,

      CONCAT(m.nombre, ' ', m.apellido) AS nombre,

      sm.tipo_seguimiento AS categoria,
      sm.descripcion AS novedad,
      sm.fecha_registro AS fecha,

      sm.prioridad 

    FROM seguimiento_menor sm

    INNER JOIN menor m 
      ON sm.id_menor = m.id_menor

    ORDER BY sm.fecha_registro DESC
    LIMIT 10;
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSeguimientosProfesores = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
      s.id_seguimiento,
      s.descripcion,
      s.tipo_seguimiento,
      s.fecha_registro,
      s.prioridad,

      m.id_menor,
      m.nombre AS menor_nombre,
      m.apellido AS menor_apellido,

      u.id_usuario,
      u.nombre AS usuario_nombre,
      u.apellido AS usuario_apellido

    FROM seguimiento_menor s
    JOIN menor m ON m.id_menor = s.id_menor
    JOIN usuario u ON u.id_usuario = s.id_usuario;
    `);

    res.json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo seguimientos" });
  }
};



export const getSeguimientoById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM seguimiento_menor WHERE id_seguimiento = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Seguimiento no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const createSeguimiento = async (req, res) => {
  try {
    const {
      descripcion,
      tipo_seguimiento,
      fecha_registro,
      prioridad,
      id_menor,
      id_usuario,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO seguimiento_menor (
        descripcion,
        tipo_seguimiento,
        fecha_registro,
        prioridad,
        id_menor,
        id_usuario
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [
        descripcion,
        tipo_seguimiento,
        fecha_registro,
        prioridad,
        id_menor,
        id_usuario,
      ]
    );

    res.json(result.rows[0]);

  } catch (error) {
    res.status(500).json({ error: "Error creando seguimiento" });
  }
};

export const updateSeguimiento = async (req, res) => {
 try {
    const { id } = req.params;

    const {
      descripcion,
      tipo_seguimiento,
      fecha_registro,
      prioridad,
      id_menor,
      id_usuario,
    } = req.body;

    const result = await pool.query(
      `UPDATE seguimiento_menor
       SET 
        descripcion = $1,
        tipo_seguimiento = $2,
        fecha_registro = $3,
        prioridad = $4,
        id_menor = $5,
        id_usuario = $6
       WHERE id_seguimiento = $7
       RETURNING *`,
      [
        descripcion,
        tipo_seguimiento,
        fecha_registro,
        prioridad,
        id_menor,
        id_usuario,
        id,
      ]
    );

    res.json(result.rows[0]);

  } catch (error) {
    console.error("ERROR UPDATE:", error);
    res.status(500).json({ error: "Error actualizando seguimiento" });
  }
};



export const deleteSeguimiento= async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM seguimiento_menor WHERE id_seguimiento = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Seguimiento no encontrado' });
    }

    res.json({ message: 'Seguimiento eliminado' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};