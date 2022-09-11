"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const projeto_1 = __importDefault(require("../routes/projeto"));
const proposito_1 = __importDefault(require("../routes/proposito"));
const diretriz_1 = __importDefault(require("../routes/diretriz"));
const objetivo_1 = __importDefault(require("../routes/objetivo"));
const indicador_1 = __importDefault(require("../routes/indicador"));
const resultado_1 = __importDefault(require("../routes/resultado"));
class Server {
    constructor(port, app) {
        this.port = port;
        this.app = app;
    }
    config() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        //routes
        this.app.use('/projeto', projeto_1.default);
        this.app.use('/proposito', proposito_1.default);
        this.app.use('/diretriz', diretriz_1.default);
        this.app.use('/objetivo', objetivo_1.default);
        this.app.use('/indicador', indicador_1.default);
        this.app.use('/resultado', resultado_1.default);
        this.app.use('/*', (req, res) => {
            res.status(404).json({ err: 'Not found' });
        });
    }
    run() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ' + this.port);
        });
    }
}
exports.default = Server;
