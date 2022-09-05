//Chamando o express e o router que ajuda a manipular as rotas
import {Router} from 'express';
const router = Router();

//Chamando minha classe controller e instanciando um objeto do tipo propositoController
import PropositoController from '../controllers/proposito';
const controller: PropositoController = new PropositoController();

//Todas as rotas necessárias pra fazer o crud, chamando seus respectivo métodos do controller
router
    .get('/', controller.read)
    .get('/:id', controller.readById)
    .post('/', controller.create)
    .put('/:id', controller.update)
    .delete('/:id', controller.delete);

//Exporto o router pra ser usado no app.js
export default router;