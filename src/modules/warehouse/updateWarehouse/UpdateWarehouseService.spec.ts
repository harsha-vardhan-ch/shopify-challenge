import 'reflect-metadata';
import { WarehouseRepository } from '@repositories/in-memory/WarehouseRepository';

import { AppError } from '@shared/errors/AppError';
import { firstWarehouse } from '@shared/utils/common.jest';

import { UpdateWarehouseService } from './UpdateWarehouseService';

describe('Test warehouse update', () => {
    let warehouseRepository: WarehouseRepository;
    let updateWarehouseService: UpdateWarehouseService;

    beforeAll(() => {
        warehouseRepository = new WarehouseRepository();
        updateWarehouseService = new UpdateWarehouseService(
            warehouseRepository
        );

        warehouseRepository.create(firstWarehouse);
    });

    it('should not update a warehouse, missing name', async () => {
        const warehouse = await warehouseRepository.findByName(
            firstWarehouse.name
        );

        expect(warehouse).toBeDefined();
        expect(warehouse).toHaveLength(1);

        const mockData = { ...firstWarehouse };
        delete mockData.name;

        await expect(
            updateWarehouseService.execute(warehouse[0].id, mockData)
        ).rejects.toEqual(new AppError('"name" is required', 422));
    });

    it('should not update a warehouse, id does not exist', async () => {
        await expect(
            updateWarehouseService.execute('invalid-id', firstWarehouse)
        ).rejects.toEqual(new AppError('Warehouse not found', 404));
    });

    it('should update a warehouse', async () => {
        const warehouse = await warehouseRepository.findByName(
            firstWarehouse.name
        );

        expect(warehouse).toBeDefined();
        expect(warehouse).toHaveLength(1);

        const warehouseUpdated = await updateWarehouseService.execute(
            warehouse[0].id,
            {
                name: 'name updated',
                address: {
                    // street: 'street updated',
                    city: 'city updated',
                    // province: 'province updated',
                    // postalCode: 'postalCode updated',
                }
            }
        );

        expect(warehouseUpdated).toBeInstanceOf(Object);
        expect(warehouseUpdated).toHaveProperty('id');
        expect(warehouseUpdated.name).toBe('name updated');
        // expect(warehouseUpdated.address.street).toBe('street updated');
        expect(warehouseUpdated.address.city).toBe('city updated');
        // expect(warehouseUpdated.address.province).toBe('province updated');
        // expect(warehouseUpdated.address.postalCode).toBe('postalCode updated');
        // expect(warehouseUpdated.aisles.rows).toBe(99);
        // expect(warehouseUpdated.aisles.binsPerRow).toBe(88);
    });
});
