"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const indicador_1 = __importDefault(require("../controllers/indicador"));
const controller = new indicador_1.default();
router
    .get('/', controller.read)
    .get('/:id', controller.readById)
    .get('/:id/resultado', controller.getResultado)
    .post('/', controller.create)
    .put('/:id', controller.update)
    .delete('/:id', controller.delete);
exports.default = router;
