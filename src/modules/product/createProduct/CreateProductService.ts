import { Product } from '@entities/Product';
import { ProductRepository } from '@repositories/in-memory/ProductRepository';
import { autoInjectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { upsertProductValidation } from '@shared/validations/product.validation';

import { IUpsertProductRequestDTO } from '../productDTO';

@autoInjectable()
export class CreateProductService {
    constructor(private productRepository: ProductRepository) {}

    async execute(payload: IUpsertProductRequestDTO): Promise<Product> {
        const { error: invalidInput } = upsertProductValidation(payload);
        if (invalidInput) {
            throw new AppError(invalidInput.details[0].message, 422);
        }

        const existingProduct = await this.productRepository.findByBarcode(
            payload.barcode
        );
        if (existingProduct) {
            throw new AppError('Product already exists');
        }

        return this.productRepository.create(payload);
    }
}
