import { Router } from 'express';
import {
  getDonacion,
  getDonacionById,
  createDonacion,
  updateDonacion,
  deleteDonacion
} from '../../controllers/donacion/donacion.controllers.js';

const router = Router();

router.get('/', getDonacion);
router.get('/:id', getDonacionById);
router.post('/', createDonacion);
router.put('/:id', updateDonacion);
router.delete('/:id', deleteDonacion);

export default router;