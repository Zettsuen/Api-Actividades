import { Router } from 'express';
import { getUsuario, getUsuarios, postUsuario} from '../controllers/asistentes';

const router = Router();


router.get('/',       getUsuarios );
router.get('/:id',    getUsuario );
router.post('/',      postUsuario );



export default router;