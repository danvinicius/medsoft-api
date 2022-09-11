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
class IndicadorController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const indicador = req.body;
            try {
                const indicadorCriado = yield (0, connection_1.default)('Indicador').insert(indicador);
                return res.status(200).json(indicadorCriado);
            }
            catch (e) {
                return res.status(500).json({ err: e });
            }
        });
    }
    read(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const indicador = yield (0, connection_1.default)('Indicador').select();
                return res.status(200).json(indicador);
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
                const indicador = yield (0, connection_1.default)('Indicador').select().where('id', id);
                return res.status(200).json(indicador);
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
                const indicadorExiste = yield (0, connection_1.default)('Indicador').select().where('id', id);
                if (indicadorExiste) {
                    const indicadorAtualizado = yield (0, connection_1.default)('Indicador').update(update).where('id', id);
                    return res.status(200).json(indicadorAtualizado);
                }
                return res.status(404).json({ err: 'indicador não encontrado' });
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
                const indicador = yield (0, connection_1.default)('Indicador').delete().where('id', id);
                return res.status(200).json(indicador);
            }
            catch (e) {
                return res.status(500).json({ err: e });
            }
        });
    }
    getResultado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const resultado = yield connection_1.default.select(['resultado.id as id_resultado',
                    'resultado.nome as nome_resultado',
                ]).table('resultado').where('id_indicador', id);
                return res.status(200).json(resultado);
            }
            catch (e) {
                return res.status(500).json({ err: e });
            }
        });
    }
}
exports.default = IndicadorController;
