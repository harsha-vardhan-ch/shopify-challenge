import 'reflect-metadata';
import { container } from 'tsyringe';

import { UpdateProductQuantityController } from './UpdateProductQuantityController';

const updateProductQuantityController = container.resolve(
    UpdateProductQuantityController
);

export { updateProductQuantityController };
