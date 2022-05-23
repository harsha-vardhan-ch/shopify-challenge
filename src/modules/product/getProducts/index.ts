import 'reflect-metadata';
import { container } from 'tsyringe';

import { GetProductsController } from './GetProductsController';

const getProductsController = container.resolve(GetProductsController);

export { getProductsController };
