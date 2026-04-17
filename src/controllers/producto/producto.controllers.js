import { pool } from '../../config/db.js';

export const getProducto = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM producto');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const getProductoById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM producto WHERE id_producto = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const createProducto = async (req, res) => {
  const {
    nombre,
    categoria,
    stock,
    stock_minimo,
    fecha_vencimiento,
    estado,
    id_donante,
    fecha_donacion
  } = req.body;

  try {
    const result = await pool.query(`
      WITH nuevo_producto AS (
        INSERT INTO producto (
          nombre,
          categoria,
          stock,
          stock_minimo,
          fecha_vencimiento,
          estado
        )
        VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING id_producto
      ),
      nueva_donacion AS (
        INSERT INTO donacion (
          id_donante,
          id_producto,
          fecha_donacion
        )
        SELECT 
          $7,
          id_producto,
          $8
        FROM nuevo_producto
      )
      SELECT * FROM nuevo_producto;
    `, [
      nombre,
      categoria,
      stock,
      stock_minimo,
      fecha_vencimiento,
      estado,
      id_donante,
      fecha_donacion
    ]);

    res.json(result.rows[0]);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProducto = async (req, res) => {
 const { id } = req.params;
  const {
    nombre,
    categoria,
    stock,
    stock_minimo,
    estado,
    fecha_vencimiento,
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE producto SET
        nombre = $1,
        categoria = $2,
        stock = $3,
        stock_minimo = $4,
        estado = $5,
        fecha_vencimiento = $6
      WHERE id_producto = $7
      RETURNING *`,
      [
        nombre,
        categoria,
        stock,
        stock_minimo,
        estado,
        fecha_vencimiento,
        id,
      ]
    );

    res.json(result.rows[0]);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const deleteProducto = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM producto WHERE id_producto = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto eliminado' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};