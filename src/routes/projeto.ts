import {Router, Request, Response, request} from 'express';
const router = Router();
import ProjetoController from '../controllers/projeto';
const controller: ProjetoController = new ProjetoController();
router
    .get('/', controller.read)
    .get('/:id', controller.readById)
    .get('/:id/proposito', controller.getProposito)
    .post('/', controller.create)
    .put('/:id', controller.update)
    .delete('/:id', controller.delete);
export default router;