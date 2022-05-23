import 'reflect-metadata';
import { ProductRepository } from '@repositories/in-memory/ProductRepository';

import { AppError } from '@shared/errors/AppError';
import { firstProduct, secondProduct } from '@shared/utils/common.jest';

import { CreateProductService } from './CreateProductService';

describe('Test product creation', () => {
    let productRepository: ProductRepository;
    let createProductService: CreateProductService;

    beforeAll(async () => {
        productRepository = new ProductRepository();
        createProductService = new CreateProductService(productRepository);
    });

    it('should create a product', async () => {
        const product = await createProductService.execute(firstProduct);

        expect(product).toBeInstanceOf(Object);
        expect(product.barcode).toBe(firstProduct.barcode);
        expect(product.name).toBe(firstProduct.name);
        expect(product.quantity).toBe(firstProduct.quantity);
        expect(product.location).toBeUndefined();

        const products = await productRepository.findAll();
        expect(products).toBeInstanceOf(Array);
        expect(products).toHaveLength(1);
    });

    it('should not create a product, product already exists', async () => {
        await createProductService.execute(secondProduct);

        await expect(
            createProductService.execute(secondProduct)
        ).rejects.toEqual(new AppError('Product already exists'));
    });

    it('should not create a product, missing barcode', async () => {
        await expect(
            createProductService.execute({
                ...secondProduct,
                barcode: undefined,
            })
        ).rejects.toEqual(new AppError('"barcode" is required', 422));
    });
});
