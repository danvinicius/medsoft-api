"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
class ResultadoController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultado = req.body;
            try {
                const resultadoCriado = yield (0, connection_1.default)('Resultado').insert(resultado);
                return res.status(200).json(resultadoCriado);
            }
            catch (e) {
                return res.status(500).json({ err: e });
            }
        });
    }
    read(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultado = yield (0, connection_1.default)('Resultado').select();
                return res.status(200).json(resultado);
            }
            catch (e) {
                return res.status(500).json({ err: e });
            }
        });
    }
    readById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const resultado = yield (0, connection_1.default)('Resultado').select().where('id', id);
                return res.status(200).json(resultado);
            }
            catch (e) {
                return res.status(500).json({ err: e });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const update = req.body;
            try {
                const resultadoExiste = yield (0, connection_1.default)('Resultado').select().where('id', id);
                if (resultadoExiste) {
                    const resultadoAtualizado = yield (0, connection_1.default)('Resultado').update(update).where('id', id);
                    return res.status(200).json(resultadoAtualizado);
                }
                return res.status(404).json({ err: 'resultado não encontrado' });
            }
            catch (e) {
                return res.status(500).json({ err: e });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const resultado = yield (0, connection_1.default)('Resultado').delete().where('id', id);
                return res.status(200).json(resultado);
            }
            catch (e) {
                return res.status(500).json({ err: e });
            }
        });
    }
}
exports.default = ResultadoController;
