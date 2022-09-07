import {Router} from 'express';
const router = Router();
import IndicadorController from '../controllers/indicador';
const controller: IndicadorController = new IndicadorController();
router
    .get('/', controller.read)
    .get('/:id', controller.readById)
    .post('/', controller.create)
    .put('/:id', controller.update)
    .delete('/:id', controller.delete);
export default router;