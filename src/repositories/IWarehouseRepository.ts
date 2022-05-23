import { Warehouse } from '@entities/Warehouse';
import { IUpsertWarehouseRequestDTO } from '@modules/warehouse/warehouseDTO';

export interface IWarehouseRepository {
    create(warehouse: IUpsertWarehouseRequestDTO): Promise<Warehouse>;
    update(
        id: string,
        warehouseData: IUpsertWarehouseRequestDTO
    ): Promise<Warehouse>;
    delete(id: string): Promise<void>;

    findById(id: string): Promise<Warehouse>;
    findAll(): Promise<Warehouse[]>;
    findByName(name: string): Promise<Warehouse[]>;
    findByPostalCode(postalCode: string): Promise<Warehouse[]>;
}
