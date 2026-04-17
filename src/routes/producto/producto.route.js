import { Router } from 'express';
import {
  getProducto,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
} from '../../controllers/producto/producto.controllers.js';

const router = Router();

router.get('/', getProducto);
router.get('/:id', getProductoById);
router.post('/', createProducto);
router.put('/:id', updateProducto);
router.delete('/:id', deleteProducto);

export default router;