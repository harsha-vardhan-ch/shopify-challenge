import 'reflect-metadata';
import { container } from 'tsyringe';

import { CreateProductController } from './CreateProductController';

const createProductController = container.resolve(CreateProductController);

export { createProductController };
