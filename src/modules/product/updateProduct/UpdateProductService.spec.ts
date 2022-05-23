import 'reflect-metadata';
import { ProductRepository } from '@repositories/in-memory/ProductRepository';

import { AppError } from '@shared/errors/AppError';
import { firstProduct } from '@shared/utils/common.jest';

import { UpdateProductService } from './UpdateProductService';

describe('Test product update', () => {
    let productRepository: ProductRepository;
    let updateProductService: UpdateProductService;

    beforeAll(async () => {
        productRepository = new ProductRepository();
        updateProductService = new UpdateProductService(productRepository);

        await productRepository.create(firstProduct);
    });

    it('should update a product', async () => {
        const product = await updateProductService.execute({
            ...firstProduct,
            name: 'New name',
            description: 'New description',
        });

        expect(product).toBeInstanceOf(Object);
        expect(product.barcode).toBe(firstProduct.barcode);
        expect(product.name).toBe('New name');
        expect(product.description).toBe('New description');
        expect(product.quantity).toBe(firstProduct.quantity);
        expect(product.location).toBeUndefined();

        const products = await productRepository.findAll();
        expect(products).toBeInstanceOf(Array);
        expect(products).toHaveLength(1);
    });

    it('should not update a product, product does not exist', async () => {
        await expect(
            updateProductService.execute({
                ...firstProduct,
                barcode: 'invalid',
            })
        ).rejects.toEqual(new AppError('Product does not exist'));
    });

    it('should not update a product, missing barcode', async () => {
        await expect(
            updateProductService.execute({
                ...firstProduct,
                barcode: undefined,
            })
        ).rejects.toEqual(new AppError('"barcode" is required', 422));
    });
});
