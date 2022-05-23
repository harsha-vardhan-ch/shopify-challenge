import 'reflect-metadata';
import { WarehouseRepository } from '@repositories/in-memory/WarehouseRepository';

import { AppError } from '@shared/errors/AppError';
import {
    firstWarehouse,
    secondWarehouse,
    thirdWarehouse,
} from '@shared/utils/common.jest';

import { DeleteWarehouseService } from './DeleteWarehouseService';

describe('Test warehouse deletion', () => {
    let warehouseRepository: WarehouseRepository;
    let deleteWarehouseService: DeleteWarehouseService;

    beforeAll(() => {
        warehouseRepository = new WarehouseRepository();
        deleteWarehouseService = new DeleteWarehouseService(
            warehouseRepository
        );

        warehouseRepository.create(firstWarehouse);
        warehouseRepository.create(secondWarehouse);
        warehouseRepository.create(thirdWarehouse);
    });

    it('should delete a warehouse', async () => {
        const warehouse = await warehouseRepository.create(firstWarehouse);
        const warehouses = await warehouseRepository.findAll();
        const warehousesCount = warehouses.length;

        expect(warehouses).toBeInstanceOf(Array);
        expect(warehouses).toHaveLength(4);

        await deleteWarehouseService.execute(warehouse.id);

        const found = await warehouseRepository.findById(warehouse.id);
        expect(found).toBeUndefined();

        const warehousesAfterDelete = await warehouseRepository.findAll();
        expect(warehousesAfterDelete).toBeInstanceOf(Array);
        expect(warehousesAfterDelete).toHaveLength(warehousesCount - 1);
    });

    it('should not delete a warehouse, id is invalid', async () => {
        await expect(
            deleteWarehouseService.execute('invalid-id')
        ).rejects.toEqual(new AppError('"value" must be a valid GUID', 422));
    });

    it('should not delete a warehouse, id does not exist', async () => {
        await expect(
            deleteWarehouseService.execute(
                '053fcaa0-edd9-42ed-bf90-bef536e4e0d1'
            )
        ).rejects.toEqual(new AppError('Warehouse not found', 404));
    });
});
