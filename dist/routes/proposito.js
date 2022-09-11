"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const proposito_1 = __importDefault(require("../controllers/proposito"));
const controller = new proposito_1.default();
router
    .get('/', controller.read)
    .get('/:id', controller.readById)
    .get('/:id/diretriz', controller.getDiretriz)
    .post('/', controller.create)
    .put('/:id', controller.update)
    .delete('/:id', controller.delete);
exports.default = router;
