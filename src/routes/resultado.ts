import {Router} from 'express';
const router = Router();
import ResultadoController from '../controllers/resultado';
const controller: ResultadoController = new ResultadoController();
router
    .get('/', controller.read)
    .get('/:id', controller.readById)
    .post('/', controller.create)
    .put('/:id', controller.update)
    .delete('/:id', controller.delete);
export default router;