import { IWarehouseEntity } from '@entities/Warehouse';

export type IUpsertWarehouseRequestDTO = Omit<IWarehouseEntity, 'id'>;
