import { Router } from 'express';
import {
  getHistorial,
  getHistorialById,
  createHistorial,
  updateHistorial,
  deleteHistorial
} from '../../controllers/historial_medico/historial.controllers.js';

const router = Router();

router.get('/', getHistorial);
router.get('/:id', getHistorialById);
router.post('/', createHistorial);
router.put('/:id', updateHistorial);
router.delete('/:id', deleteHistorial);

export default router;