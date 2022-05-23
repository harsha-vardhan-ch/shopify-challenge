import { Warehouse } from '@entities/Warehouse';
import { WarehouseRepository } from '@repositories/in-memory/WarehouseRepository';
import { autoInjectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { upsertWarehouseValidation } from '@shared/validations/warehouse.validations';

import { IUpsertWarehouseRequestDTO } from '../warehouseDTO';

@autoInjectable()
export class UpdateWarehouseService {
    constructor(private warehouseRepository: WarehouseRepository) {}

    async execute(
        id: string,
        payload: IUpsertWarehouseRequestDTO
    ): Promise<Warehouse> {
        const { error: invalidInput } = upsertWarehouseValidation(payload);
        if (invalidInput) {
            throw new AppError(invalidInput.details[0].message, 422);
        }

        const warehouse = await this.warehouseRepository.findById(id);
        if (!warehouse) {
            throw new AppError('Warehouse not found', 404);
        }

        return this.warehouseRepository.update(id, payload);
    }
}
