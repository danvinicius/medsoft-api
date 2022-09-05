//Chamando o express e o router que ajuda a manipular as rotas
import {Router, Request, Response, request} from 'express';
const router = Router();

//Chamando minha classe controller e instanciando um objeto do tipo ProjetoController
import ProjetoController from '../controllers/projeto';
const controller: ProjetoController = new ProjetoController();

//Todas as rotas necessárias pra fazer o crud, chamando seus respectivo métodos do controller
router
    .get('/', (req: Request, res: Response)=> {
        res.redirect('/projeto');
    })
    .get('/projeto', controller.read)
    .get('/projeto/:id', controller.readById)
    .get('/projeto/:id/proposito', controller.getProposito)
    .post('/projeto', controller.create)
    .put('/projeto/:id', controller.update)
    .delete('/projeto:id', controller.delete);

//Exporto o router pra ser usado no app.js
export default router;