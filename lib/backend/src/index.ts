import express, { ErrorRequestHandler } from 'express';
import https from 'http';

// Register path alias configuration
import path from 'path';
import { register } from 'tsconfig-paths';
import tsConfig from '../tsconfig.json'; 

register({
  baseUrl: path.resolve(__dirname),
  paths: tsConfig.compilerOptions.paths as any
});

import dotenv from 'dotenv';
import { gconfig, Logger } from "@book-shelf/gckit";

import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';

import router from '@app/router';
import { connectDB } from '@app/config/db';
import { errorHandler } from './middlewares/errors';

dotenv.config();

if (gconfig.isDev) {
    Logger.enableDebug();
}

const app = express();

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || gconfig.server.allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Origin not allowed by CORS: ' + origin));
        }
    },
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

if (gconfig.isProd) {
    // Serve client Vue app
    const clientPath = path.join(__dirname, gconfig.paths.clientDistPath);
    app.use('/', express.static(clientPath));

    // Serve admin Vue app
    const adminPath = path.join(__dirname, gconfig.paths.adminDistPath);
    app.use('/admin', express.static(adminPath));

    // SPA Fallbacks
    app.get('/admin/*', (_req, res) => {
        res.sendFile(path.join(adminPath, 'index.html'));
    });

    app.get('/*', (_req, res) => {
        res.sendFile(path.join(clientPath, 'index.html'));
    });
}

// Serve webAPI app
app.use('/api', router());

app.use(errorHandler as ErrorRequestHandler);

connectDB();

const server = https.createServer(app);
server.listen(gconfig.server.port, () => {
    Logger.info(`Server running on ${gconfig.server.host}`, "APP");
});