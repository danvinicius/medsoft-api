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
class ObjetivoController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const objetivo = req.body;
            try {
                const objetivoCriada = yield (0, connection_1.default)('Objetivo').insert(objetivo);
                return res.status(200).json(objetivoCriada);
            }
            catch (e) {
                return res.status(500).json({ err: e });
            }
        });
    }
    read(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const objetivo = yield (0, connection_1.default)('Objetivo').select();
                return res.status(200).json(objetivo);
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
                const objetivo = yield (0, connection_1.default)('Objetivo').select().where('id', id);
                return res.status(200).json(objetivo);
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
                const objetivoExiste = yield (0, connection_1.default)('Objetivo').select().where('id', id);
                if (objetivoExiste) {
                    const objetivoAtualizada = yield (0, connection_1.default)('Objetivo').update(update).where('id', id);
                    return res.status(200).json(objetivoAtualizada);
                }
                return res.status(404).json({ err: 'objetivo não encontrado' });
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
                const objetivo = yield (0, connection_1.default)('Objetivo').delete().where('id', id);
                return res.status(200).json(objetivo);
            }
            catch (e) {
                return res.status(500).json({ err: e });
            }
        });
    }
    getIndicador(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const indicador = yield connection_1.default.select(['indicador.id as id_indicador',
                    'indicador.nome as nome_indicador',
                ]).table('indicador').where('id_objetivo', id);
                return res.status(200).json(indicador);
            }
            catch (e) {
                return res.status(500).json({ err: e });
            }
        });
    }
}
exports.default = ObjetivoController;
