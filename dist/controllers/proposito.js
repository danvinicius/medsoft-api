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
class PropositoController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const proposito = req.body;
            try {
                const propositoCriado = yield (0, connection_1.default)('Proposito').insert(proposito);
                return res.status(200).json(propositoCriado);
            }
            catch (e) {
                return res.status(500).json({ err: e });
            }
        });
    }
    read(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const proposito = yield (0, connection_1.default)('Proposito').select();
                return res.status(200).json(proposito);
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
                const proposito = yield (0, connection_1.default)('Proposito').select().where('id', id);
                return res.status(200).json(proposito);
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
                const propositoExiste = yield (0, connection_1.default)('Proposito').select().where('id', id);
                if (propositoExiste) {
                    const propositoAtualizado = yield (0, connection_1.default)('Proposito').update(update).where('id', id);
                    return res.status(200).json(propositoAtualizado);
                }
                return res.status(404).json({ err: 'proposito não encontrado' });
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
                const proposito = yield (0, connection_1.default)('Proposito').delete().where('id', id);
                return res.status(200).json(proposito);
            }
            catch (e) {
                return res.status(500).json({ err: e });
            }
        });
    }
    getDiretriz(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const diretriz = yield connection_1.default.select(['diretriz.id as id_diretriz',
                    'diretriz.codigo as codigo_diretriz',
                    'diretriz.nome as nome_diretriz',
                ]).table('diretriz').where('id_proposito', id);
                return res.status(200).json(diretriz);
            }
            catch (e) {
                return res.status(500).json({ err: e });
            }
        });
    }
}
exports.default = PropositoController;
