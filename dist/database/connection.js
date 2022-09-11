"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
exports.default = (0, knex_1.default)({
    client: 'mysql2',
    connection: {
        host: process.env.DATABASE_HOST || '127.0.0.1',
        user: process.env.DATABASE_USER || 'root',
        database: process.env.DATABASE_DATABASE || 'medsoft',
        password: process.env.DATABASE_PASSWORD || '',
    }
});
