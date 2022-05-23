import 'reflect-metadata';
import { container } from 'tsyringe';

import { UpdateProductController } from './UpdateProductController';

const updateProductController = container.resolve(UpdateProductController);

export { updateProductController };
