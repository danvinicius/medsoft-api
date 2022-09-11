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
class DiretrizController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const diretriz = req.body;
            try {
                const diretrizCriada = yield (0, connection_1.default)('Diretriz').insert(diretriz);
                return res.status(200).json(diretrizCriada);
            }
            catch (e) {
                return res.status(500).json({ err: e });
            }
        });
    }
    read(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const diretriz = yield (0, connection_1.default)('Diretriz').select();
                return res.status(200).json(diretriz);
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
                const diretriz = yield (0, connection_1.default)('Diretriz').select().where('id', id);
                return res.status(200).json(diretriz);
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
                const diretrizExiste = yield (0, connection_1.default)('Diretriz').select().where('id', id);
                if (diretrizExiste) {
                    const diretrizAtualizada = yield (0, connection_1.default)('Diretriz').update(update).where('id', id);
                    return res.status(200).json(diretrizAtualizada);
                }
                return res.status(404).json({ err: 'diretriz não encontrada' });
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
                const diretriz = yield (0, connection_1.default)('Diretriz').delete().where('id', id);
                return res.status(200).json(diretriz);
            }
            catch (e) {
                return res.status(500).json({ err: e });
            }
        });
    }
    getObjetivo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const objetivo = yield connection_1.default.select(['objetivo.id as id_objetivo',
                    'objetivo.nome as nome_objetivo',
                ]).table('objetivo').where('id_diretriz', id);
                return res.status(200).json(objetivo);
            }
            catch (e) {
                return res.status(500).json({ err: e });
            }
        });
    }
}
exports.default = DiretrizController;
