import 'reflect-metadata';
import { ProductRepository } from '@repositories/in-memory/ProductRepository';
import { WarehouseRepository } from '@repositories/in-memory/WarehouseRepository';

import { AppError } from '@shared/errors/AppError';
import {
    firstProduct,
    firstWarehouse,
    secondProduct,
    secondWarehouse,
    thirdProduct,
} from '@shared/utils/common.jest';

import { AssignWarehouseService } from './AssignWarehouseService';

describe('test assign location to product', () => {
    let productRepository: ProductRepository;
    let warehouseRepository: WarehouseRepository;
    let assignWarehouseService: AssignWarehouseService;

    beforeAll(async () => {
        productRepository = new ProductRepository();
        warehouseRepository = new WarehouseRepository();
        assignWarehouseService = new AssignWarehouseService(productRepository);

        await warehouseRepository.create(firstWarehouse);
        await warehouseRepository.create(secondWarehouse);
        await productRepository.create(firstProduct);
        await productRepository.create(secondProduct);
        await productRepository.create(thirdProduct);
    });

    it('should assign location to product', async () => {
        const warehouseOne = await warehouseRepository.findByName(
            firstWarehouse.name
        );

        const product = await assignWarehouseService.execute({
            barcode: firstProduct.barcode,
            location: {
                warehouseId: warehouseOne[0].id,
            },
        });

        expect(product).toBeInstanceOf(Object);
        expect(product.barcode).toBe(firstProduct.barcode);
        expect(product.name).toBe(firstProduct.name);
        expect(product.quantity).toBe(firstProduct.quantity);
        expect(product.location.warehouseId).toBe(warehouseOne[0].id);
    });

    it('should not assign location to product, product does not exist', async () => {
        const warehouseTwo = await warehouseRepository.findByName(
            firstWarehouse.name
        );

        await expect(
            assignWarehouseService.execute({
                barcode: '123456789',
                location: {
                    warehouseId: warehouseTwo[0].id,
                },
            })
        ).rejects.toEqual(new AppError('Product does not exist'));
    });

    it('should not assign a location to a product, barcode undefined', async () => {
        await expect(
            assignWarehouseService.execute({
                barcode: undefined,
                location: {
                    warehouseId: '123456789',
                },
            })
        ).rejects.toEqual(new AppError('"barcode" is required', 422));
    });
});
