import { WarehouseRepository } from '@repositories/in-memory/WarehouseRepository';
import { autoInjectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { deleteWarehouseValidation } from '@shared/validations/warehouse.validations';

@autoInjectable()
export class DeleteWarehouseService {
    constructor(private warehouseRepository: WarehouseRepository) {}

    async execute(id: string): Promise<void> {
        const { error: invalidInput } = deleteWarehouseValidation(id);
        if (invalidInput) {
            throw new AppError(invalidInput.details[0].message, 422);
        }

        const warehouse = await this.warehouseRepository.findById(id);
        if (!warehouse) {
            throw new AppError('Warehouse not found', 404);
        }

        await this.warehouseRepository.delete(id);
    }
}
