"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const objetivo_1 = __importDefault(require("../controllers/objetivo"));
const controller = new objetivo_1.default();
router
    .get('/', controller.read)
    .get('/:id', controller.readById)
    .get('/:id/indicador', controller.getIndicador)
    .post('/', controller.create)
    .put('/:id', controller.update)
    .delete('/:id', controller.delete);
exports.default = router;
