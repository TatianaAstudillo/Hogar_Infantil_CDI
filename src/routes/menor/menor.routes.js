import { Router } from 'express';
import {
  getMenor,
  getMenorById,
  createMenor,
  updateMenor,
  deleteMenor
} from '../../controllers/menor/menor.controllers.js';

const router = Router();

router.get('/', getMenor);
router.get('/:id', getMenorById);
router.post('/', createMenor);
router.put('/:id', updateMenor);
router.delete('/:id', deleteMenor);

export default router;