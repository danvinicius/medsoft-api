import {Router} from 'express';
const router = Router();
import DiretrizController from '../controllers/diretriz';
const controller: DiretrizController = new DiretrizController();
router
    .get('/', controller.read)
    .get('/:id', controller.readById)
    .post('/', controller.create)
    .put('/:id', controller.update)
    .delete('/:id', controller.delete);
export default router;