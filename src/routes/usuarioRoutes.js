import { Router } from 'express';
import usuarioController from '../controllers/UsuarioController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// nao deveriam existir, adicionado para teste crud
router.get('/', usuarioController.index);
// router.get('/:id', usuarioController.show);

// esses sim
router.post('/', usuarioController.store);
router.put('/', loginRequired, usuarioController.update);
router.delete('/', loginRequired, usuarioController.delete);


export default router;

