import express from 'express';
import "reflect-metadata";
const consign = require('consign');
import { handleCORS } from './libs/cors';
import { config } from 'dotenv';
import { connectToDatabase } from '../database';

config();

const app = express();
app.set('port', process.env.PORT || 3001);

app.use(handleCORS);
connectToDatabase();

consign()
    .then('src/libs/middleware.ts')
    .then('src/libs/boot.ts')
    .then('src/routes')
    .into(app);
