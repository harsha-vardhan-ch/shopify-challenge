import { Product } from '@entities/Product';
import { ProductRepository } from '@repositories/in-memory/ProductRepository';
import { autoInjectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { assignWarehouseValidation } from '@shared/validations/product.validation';

import { IAssignWarehouseRequestDTO } from '../productDTO';

@autoInjectable()
export class AssignWarehouseService {
    constructor(private productRepository: ProductRepository) {}

    async execute(payload: IAssignWarehouseRequestDTO): Promise<Product> {
        const { error: invalidInput } = assignWarehouseValidation(payload);
        if (invalidInput) {
            throw new AppError(invalidInput.details[0].message, 422);
        }

        const existingProduct = await this.productRepository.findByBarcode(
            payload.barcode
        );
        if (!existingProduct) {
            throw new AppError('Product does not exist');
        }

        return this.productRepository.assignLocation(payload);
    }
}
