import { Router } from 'express';
import {
  getAsignacion,
  getAsignacionById,
  createAsignacion,
  updateAsignacion,
  deleteAsignacion
} from '../../controllers/asignacion_profesora_menor/asignacion_menor.controllers.js';

const router = Router();

router.get('/', getAsignacion);
router.get('/:id', getAsignacionById);
router.post('/', createAsignacion);
router.put('/:id', updateAsignacion);
router.delete('/:id', deleteAsignacion);

export default router;