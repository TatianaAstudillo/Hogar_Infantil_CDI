import { Router } from 'express';
import {
  getSeguimiento,
  getSeguimientoById,
  createSeguimiento,
  updateSeguimiento,
  deleteSeguimiento,
  getSeguimientosProfesores
} from '../../controllers/seguimiento_menor/seguimiento.controllers.js';

const router = Router();

router.get('/', getSeguimiento);
router.get('/profesores', getSeguimientosProfesores);
router.get('/:id', getSeguimientoById);
router.post('/', createSeguimiento);
router.put('/:id', updateSeguimiento);
router.delete('/:id', deleteSeguimiento);

export default router;