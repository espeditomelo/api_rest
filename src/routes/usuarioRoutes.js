import { Router } from 'express';
import usuarioController from '../controllers/UsuarioController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', usuarioController.store);
router.get('/', loginRequired, usuarioController.index);
router.get('/:id', usuarioController.show);
router.put('/:id', usuarioController.update);
router.delete('/:id', usuarioController.delete);


export default router;

