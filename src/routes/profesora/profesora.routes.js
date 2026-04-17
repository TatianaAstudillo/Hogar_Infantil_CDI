import { Router } from 'express';
import {
  getProfesora
} from '../../controllers/profesoras/profesoras.controllers.js';

const router = Router();

router.get('/', getProfesora);


export default router;