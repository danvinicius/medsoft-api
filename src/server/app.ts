import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import Server from './server';

const app = express();
const PORT = 8081 || process.env.PORT;
const server = new Server(PORT, app);

//=-=-=-=-=-=-=-=-//
server.config();
server.run();
