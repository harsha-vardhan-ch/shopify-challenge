import { Product } from '@entities/Product';
import { ProductRepository } from '@repositories/in-memory/ProductRepository';
import { autoInjectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { updateProductQuantityValidation } from '@shared/validations/product.validation';

import { IUpdateProductQuantityRequestDTO } from '../productDTO';

@autoInjectable()
export class UpdateProductQuantityService {
    constructor(private productRepository: ProductRepository) {}

    async execute(payload: IUpdateProductQuantityRequestDTO): Promise<Product> {
        const { barcode, quantity } = payload;

        const { error: invalidInput } =
            updateProductQuantityValidation(payload);
        if (invalidInput) {
            throw new AppError(invalidInput.details[0].message, 422);
        }

        const existingProduct = await this.productRepository.findByBarcode(
            payload.barcode
        );
        if (!existingProduct) {
            throw new AppError('Product does not exists');
        }

        return this.productRepository.updateQuantity(barcode, quantity);
    }
}
