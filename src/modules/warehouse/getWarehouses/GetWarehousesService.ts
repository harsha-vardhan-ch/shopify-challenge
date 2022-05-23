import { Warehouse } from '@entities/Warehouse';
import { WarehouseRepository } from '@repositories/in-memory/WarehouseRepository';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export class GetWarehousesService {
    constructor(private warehouseRepository: WarehouseRepository) {}

    async execute(): Promise<Warehouse[]> {
        return this.warehouseRepository.findAll();
    }
}
