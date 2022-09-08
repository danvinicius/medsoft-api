import {Router} from 'express';
const router = Router();
import IndicadorController from '../controllers/indicador';
const controller: IndicadorController = new IndicadorController();
router
    .get('/', controller.read)
    .get('/:id', controller.readById)
    .get('/:id/resultado', controller.getResultado)
    .post('/', controller.create)
    .put('/:id', controller.update)
    .delete('/:id', controller.delete);
export default router;