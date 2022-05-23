import 'reflect-metadata';
import { container } from 'tsyringe';

import { GetWarehousesController } from './GetWarehousesController';

const getWarehousesController = container.resolve(GetWarehousesController);

export { getWarehousesController };
