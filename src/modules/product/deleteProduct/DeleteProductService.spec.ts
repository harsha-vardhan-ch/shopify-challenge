import 'reflect-metadata';
import { ProductRepository } from '@repositories/in-memory/ProductRepository';

import { AppError } from '@shared/errors/AppError';
import {
    firstProduct,
    secondProduct,
    thirdProduct,
} from '@shared/utils/common.jest';

import { DeleteProductService } from './DeleteProductService';

describe('Test product delete service', () => {
    let productRepository: ProductRepository;
    let deleteProductService: DeleteProductService;

    beforeAll(async () => {
        productRepository = new ProductRepository();
        deleteProductService = new DeleteProductService(productRepository);
    });

    it('should delete all products', async () => {
        await productRepository.create(firstProduct);
        await productRepository.create(secondProduct);
        await productRepository.create(thirdProduct);

        expect(await productRepository.findAll()).toHaveLength(3);

        await deleteProductService.execute({
            barcodes: [
                secondProduct.barcode,
                thirdProduct.barcode,
                firstProduct.barcode,
            ],
        });

        expect(await productRepository.findAll()).toHaveLength(0);
    });

    it('should not delete any product, barcodes missing', async () => {
        await expect(
            deleteProductService.execute({
                barcodes: undefined,
            })
        ).rejects.toEqual(new AppError('"barcodes" is required', 422));
    });

    it('should not delete any product, barcodes is not an array', async () => {
        await expect(
            deleteProductService.execute({
                barcodes: 'undefined' as unknown as Array<string>,
            })
        ).rejects.toEqual(new AppError('"barcodes" must be an array', 422));
    });
});
