import { Warehouse } from '@entities/Warehouse';
import { WarehouseRepository } from '@repositories/in-memory/WarehouseRepository';
import { autoInjectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { upsertWarehouseValidation } from '@shared/validations/warehouse.validations';

import { IUpsertWarehouseRequestDTO } from '../warehouseDTO';

@autoInjectable()
export class CreateWarehouseService {
    constructor(private warehouseRepository: WarehouseRepository) {}

    async execute(payload: IUpsertWarehouseRequestDTO): Promise<Warehouse> {
        const { error: invalidInput } = upsertWarehouseValidation(payload);
        if (invalidInput) {
            throw new AppError(invalidInput.details[0].message, 422);
        }

        // If we had an account system or something better than just an address,
        // we would check if the warehouse already exists.
        return this.warehouseRepository.create(payload);
    }
}
