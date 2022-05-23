import { WarehouseRepository } from '@repositories/in-memory/WarehouseRepository';

import { AppError } from '@shared/errors/AppError';
import { firstWarehouse } from '@shared/utils/common.jest';

import 'reflect-metadata';
import { CreateWarehouseService } from './CreateWarehouseService';

describe('Test warehouse creation', () => {
    let warehouseRepository: WarehouseRepository;
    let createWarehouseService: CreateWarehouseService;

    beforeAll(() => {
        warehouseRepository = new WarehouseRepository();
        createWarehouseService = new CreateWarehouseService(
            warehouseRepository
        );
    });

    it('should create a warehouse', async () => {
        const warehouse = await createWarehouseService.execute(firstWarehouse);
        expect(warehouse).toBeInstanceOf(Object);
        expect(warehouse).toHaveProperty('id');
        expect(warehouse.name).toBe(firstWarehouse.name);
        // expect(warehouse.address.street).toBe(firstWarehouse.address.street);
    });

    it('should not create a warehouse, missing name', async () => {
        const mockData = { ...firstWarehouse };
        delete mockData.name;
        await expect(createWarehouseService.execute(mockData)).rejects.toEqual(
            new AppError('"name" is required', 422)
        );
    });

    it('should not create a warehouse, missing address', async () => {
        const mockData = { ...firstWarehouse };
        delete mockData.address;
        await expect(createWarehouseService.execute(mockData)).rejects.toEqual(
            new AppError('"address" is required', 422)
        );
    });
});
