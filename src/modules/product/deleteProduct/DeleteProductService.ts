import { ProductRepository } from '@repositories/in-memory/ProductRepository';
import { autoInjectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { deleteProductValidation } from '@shared/validations/product.validation';

import {
    IDeletedProductResponseDTO,
    IDeleteProductRequestDTO,
} from '../productDTO';

@autoInjectable()
export class DeleteProductService {
    constructor(private productRepository: ProductRepository) {}

    async execute(
        payload: IDeleteProductRequestDTO
    ): Promise<IDeletedProductResponseDTO> {
        const { error: invalidInput } = deleteProductValidation(payload);
        if (invalidInput) {
            throw new AppError(invalidInput.details[0].message, 422);
        }

        return this.productRepository.delete(payload.barcodes);
    }
}
