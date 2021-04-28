import { Router } from 'express';
import { getActividad, getActividades} from '../controllers/actividades';

const router = Router();

router.get('/', getActividades)
router.get('/:id', getActividad)

export default router