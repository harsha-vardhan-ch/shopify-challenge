import { ProductRepository } from '@repositories/in-memory/ProductRepository';

import { AppError } from '@shared/errors/AppError';
import { firstProduct } from '@shared/utils/common.jest';

import 'reflect-metadata';
import { UpdateProductQuantityService } from './UpdateProductQuantityService';

describe('Test product quantity update', () => {
    let productRepository: ProductRepository;
    let updateProductQuantityService: UpdateProductQuantityService;

    beforeAll(async () => {
        productRepository = new ProductRepository();
        updateProductQuantityService = new UpdateProductQuantityService(
            productRepository
        );

        await productRepository.create(firstProduct);
    });

    it('should update a product quantity', async () => {
        const product = await updateProductQuantityService.execute({
            barcode: firstProduct.barcode,
            quantity: 10,
        });

        expect(product).toBeInstanceOf(Object);
        expect(product.quantity).toBe(10);
    });

    it('should not update a product quantity, product does not exists', async () => {
        await expect(
            updateProductQuantityService.execute({
                barcode: '123456789',
                quantity: 10,
            })
        ).rejects.toEqual(new AppError('Product does not exists'));
    });

    it('should not update a product quantity, missing barcode', async () => {
        await expect(
            updateProductQuantityService.execute({
                barcode: undefined,
                quantity: 10,
            })
        ).rejects.toEqual(new AppError('"barcode" is required', 422));
    });
});
