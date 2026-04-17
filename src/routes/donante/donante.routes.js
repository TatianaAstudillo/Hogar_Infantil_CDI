import { Router } from 'express';
import {
  getDonante,
  getDonanteById,
  createDonante,
  updateDonante,
  deleteDonante
} from '../../controllers/donante/donante.controllers.js';

const router = Router();

router.get('/', getDonante);
router.get('/:id', getDonanteById);
router.post('/', createDonante);
router.put('/:id', updateDonante);
router.delete('/:id', deleteDonante);

export default router;