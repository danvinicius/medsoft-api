import {Router} from 'express';
const router = Router();

import ObjetivoController from '../controllers/objetivo';
const controller: ObjetivoController = new ObjetivoController();

router
    .get('/', controller.read)
    .get('/:id', controller.readById)
    .get('/:id/indicador', controller.getIndicador)
    .post('/', controller.create)
    .put('/:id', controller.update)
    .delete('/:id', controller.delete);

export default router;