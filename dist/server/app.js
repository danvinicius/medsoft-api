"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const server_1 = __importDefault(require("./server"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8081;
const server = new server_1.default(PORT, app);
//=-=-=-=-=-=-=-=-//
server.config();
server.run();
