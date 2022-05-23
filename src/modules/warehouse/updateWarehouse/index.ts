import 'reflect-metadata';
import { container } from 'tsyringe';

import { UpdateWarehouseController } from './UpdateWarehouseController';

const updateWarehouseController = container.resolve(UpdateWarehouseController);

export { updateWarehouseController };
