import { pool } from '../../config/db.js';

export const getMenor = async (req, res) => {
  try {
    const result = await pool.query(
        `SELECT 
      m.id_menor,
      m.nombre,
      m.apellido,
      m.fecha_nacimiento,
      m.registro_civil,
      m.genero,
      m.fecha_ingreso,
      m.estado,

      u.nombre AS profesora_nombre,
      p.id_profesora

    FROM menor m

    LEFT JOIN asignacion_profesora_menor apm 
      ON apm.id_menor = m.id_menor

    LEFT JOIN profesora p 
      ON p.id_profesora = apm.id_profesora

    LEFT JOIN usuario u 
      ON u.id_usuario = p.id_usuario

    ORDER BY u.nombre, m.nombre;`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const getMenorById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM menor WHERE id_menor = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Menor no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const createMenor = async (req, res) => {
  const {
    nombre,
    apellido,
    fecha_nacimiento,
    registro_civil,
    genero,
    fecha_ingreso,
    estado,
    id_profesora
  } = req.body;

  try {

    const profe = await pool.query(
      "SELECT id_profesora FROM profesora WHERE id_profesora = $1",
      [id_profesora]
    );

    if (profe.rows.length === 0) {
      return res.status(400).json({
        error: "No existe la profesora",
      });
    }

    const result = await pool.query(
      `WITH nuevo_menor AS (
        INSERT INTO menor (
          nombre,
          apellido,
          fecha_nacimiento,
          registro_civil,
          genero,
          fecha_ingreso,
          estado
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        RETURNING *
      ),
      asignacion AS (
        INSERT INTO asignacion_profesora_menor (
          id_profesora,
          id_menor
        )
        SELECT 
          $8,
          id_menor
        FROM nuevo_menor
        RETURNING *
      )
      SELECT 
        nm.*,
        a.id_profesora
      FROM nuevo_menor nm
      JOIN asignacion a ON true;
      `,
      [
        nombre,
        apellido,
        fecha_nacimiento,
        registro_civil,
        genero,
        fecha_ingreso,
        estado,
        id_profesora 
      ]
    );

    console.log("DATA BACKEND:", req.body);

    res.json(result.rows[0]);

  } catch (error) {
    console.error("ERROR BACKEND:", error);
    res.status(500).json({ error: error.message });
  }
};

export const updateMenor = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, fecha_nacimiento, registro_civil, genero, fecha_ingreso, estado } = req.body;

  try {
    const result = await pool.query(
      `UPDATE menor
        SET 
          nombre = $1,
          apellido = $2,
          fecha_nacimiento = $3,
          registro_civil = $4,
          genero = $5,
          fecha_ingreso = $6,
          estado = $7
        WHERE id_menor = $8
        RETURNING *`,
      [nombre, apellido, fecha_nacimiento, registro_civil, genero, fecha_ingreso,estado, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Menor no encontrado' });
    }

    res.json(result.rows[0]);
    console.log(req.body);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const deleteMenor = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      "DELETE FROM asignacion_profesora_menor WHERE id_menor = $1",
      [id]
    );
    const result = await pool.query(
      "DELETE FROM menor WHERE id_menor = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Menor no encontrado" });
    }

    res.json({ message: "Menor eliminado correctamente" });

  } catch (error) {
    console.error("ERROR DELETE:", error);
    res.status(500).json({ error: error.message });
  }
};