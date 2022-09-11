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
class ProjetoController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const projeto = req.body;
            try {
                const projetoCriado = yield (0, connection_1.default)('Projeto').insert(projeto);
                return res.status(200).json(projetoCriado);
            }
            catch (e) {
                return res.status(500).json({ err: e });
            }
        });
    }
    read(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projetos = yield (0, connection_1.default)('Projeto').select();
                return res.status(200).json(projetos);
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
                const projeto = yield (0, connection_1.default)('Projeto').select().where('id', id);
                return res.status(200).json(projeto);
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
                const projetoExiste = yield (0, connection_1.default)('Projeto').select().where('id', id);
                if (projetoExiste) {
                    const projetoAtualizado = yield (0, connection_1.default)('Projeto').update(update).where('id', id);
                    return res.status(200).json(projetoAtualizado);
                }
                return res.status(404).json({ err: 'Projeto não encontrado' });
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
                const projeto = yield (0, connection_1.default)('Projeto').delete().where('id', id);
                return res.status(200).json(projeto);
            }
            catch (e) {
                return res.status(500).json({ err: e });
            }
        });
    }
    getProposito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const proposito = yield connection_1.default.select(['proposito.id as id_proposito',
                    'proposito.nome as nome_proposito',
                ]).table('proposito').where('id_projeto', id);
                return res.status(200).json(proposito);
            }
            catch (e) {
                return res.status(500).json({ err: e });
            }
        });
    }
}
exports.default = ProjetoController;
