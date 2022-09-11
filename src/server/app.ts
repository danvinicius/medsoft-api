import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import Server from './server';

const app = express();
const PORT = process.env.PORT || 8081;
const server = new Server(PORT, app);

//=-=-=-=-=-=-=-=-//
server.config();
server.run();
