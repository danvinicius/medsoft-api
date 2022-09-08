import {Router} from 'express';
const router = Router();
import PropositoController from '../controllers/proposito';
const controller: PropositoController = new PropositoController();
router
    .get('/', controller.read)
    .get('/:id', controller.readById)
    .get('/:id/diretriz', controller.getDiretriz)
    .post('/', controller.create)
    .put('/:id', controller.update)
    .delete('/:id', controller.delete);
export default router;