import 'reflect-metadata';
import { container } from 'tsyringe';

import { CreateWarehouseController } from './CreateWarehouseController';

const createWarehouseController = container.resolve(CreateWarehouseController);

export { createWarehouseController };
