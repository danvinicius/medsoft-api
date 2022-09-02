//Chamando o express e o router que ajuda a manipular as rotas
const express = require('express');
const router = express.Router();

//Chamando minha classe controller e instanciando um objeto do tipo ProjetoController
const ProjetoController = require('../controllers/projeto');
const controller = new ProjetoController();

//Todas as rotas necessárias pra fazer o crud, chamando seus respectivo métodos do controller
router
    .get('/', controller.read)
    .get('/:id', controller.readById)
    .post('/', controller.create)
    .put('/:id', controller.update)
    .delete('/:id', controller.delete);

//Exporto o router pra ser usado no app.js
module.exports = router;