import 'express-async-errors';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import hpp from 'hpp';
import { createServer } from 'http';
import swaggerUi from 'swagger-ui-express';

import { AppError } from '@shared/errors/AppError';
import { router } from '@shared/infra/http/routes';

import swaggerConfig from './swagger.json';

const app = express();
const httpServer = createServer(app);

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(hpp());
app.use(express.json({ limit: '10mb' }));
app.use(cors());

app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerConfig, { customSiteTitle: 'Shopify F22 Challenge' })
);

app.use(router);

app.use((req: Request, res: Response) => {
    return res.status(404).json({
        error: 'Not Found',
        reasons: [
            {
                reason: 'invalid_path',
                message: 'The requested path could not be found',
                data: req.path,
                location: 'path',
            },
        ],
    });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }

    // I'd normally use a logger here or something better than just a simple log
    console.error(err.message);

    return res.status(500).json({
        status: 'error',
        message: `Internal server error!`,
    });
});

export { app, httpServer };
