import 'reflect-metadata';
import { container } from 'tsyringe';

import { DeleteWarehouseController } from './DeleteWarehouseController';

const deleteWarehouseController = container.resolve(DeleteWarehouseController);

export { deleteWarehouseController };
