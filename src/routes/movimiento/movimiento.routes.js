import { Router } from 'express';
import {
  getMovimiento,
  getMovimientoById,
  createMovimiento,
  updateMovimiento,
  deleteMovimiento
} from '../../controllers/movimiento/movimiento.controllers.js';

const router = Router();

router.get('/', getMovimiento);
router.get('/:id', getMovimientoById);
router.post('/', createMovimiento);
router.put('/:id', updateMovimiento);
router.delete('/:id', deleteMovimiento);

export default router;