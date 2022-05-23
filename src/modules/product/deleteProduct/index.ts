import 'reflect-metadata';
import { container } from 'tsyringe';

import { DeleteProductController } from './DeleteProductController';

const deleteProductController = container.resolve(DeleteProductController);

export { deleteProductController };
