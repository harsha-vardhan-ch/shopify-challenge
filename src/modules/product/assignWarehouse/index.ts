import 'reflect-metadata';
import { container } from 'tsyringe';

import { AssignWarehouseController } from './AssignWarehouseController';

const assignWarehouseController = container.resolve(AssignWarehouseController);

export { assignWarehouseController };
