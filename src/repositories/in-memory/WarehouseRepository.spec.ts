import 'reflect-metadata';
import { IWarehouseRepository } from '@repositories/IWarehouseRepository';

import { AppError } from '@shared/errors/AppError';
import {
    firstWarehouse,
    secondWarehouse,
    thirdWarehouse,
} from '@shared/utils/common.jest';

import { WarehouseRepository } from './WarehouseRepository';

describe('Test warehouse repository in memory', () => {
    let warehouseRepository: IWarehouseRepository;

    beforeAll(() => {
        warehouseRepository = new WarehouseRepository();
    });

    it('should create a warehouse', async () => {
        const warehouse = await warehouseRepository.create(firstWarehouse);

        expect(warehouse).toBeInstanceOf(Object);
        expect(warehouse).toHaveProperty('id');
        expect(warehouse.name).toBe(firstWarehouse.name);
        // expect(warehouse.address.street).toBe(firstWarehouse.address.street);
    });

    it('should find a warehouse by id', async () => {
        const warehouse = await warehouseRepository.create(secondWarehouse);
        const warehouseFound = await warehouseRepository.findById(warehouse.id);

        expect(warehouseFound).toEqual(warehouse);
    });

    it('should not find the warehouse by id, id does not exists', async () => {
        const found = await warehouseRepository.findById('id-does-not-exists');
        expect(found).toBeUndefined();
    });

    it('should get all warehouses', async () => {
        const warehouses = await warehouseRepository.findAll();

        expect(warehouses).toBeInstanceOf(Array);
        expect(warehouses).toHaveLength(2);
    });

    it('should find a warehouse by name', async () => {
        const warehouse = await warehouseRepository.create(thirdWarehouse);
        const warehouseFound = await warehouseRepository.findByName(
            warehouse.name
        );

        expect(warehouseFound).toBeInstanceOf(Array);
        expect(warehouseFound).toHaveLength(1);
        expect(warehouseFound[0]).toEqual(warehouse);
    });

    it('should find all warehouses that has "Warehouse" in the name', async () => {
        const warehouses = await warehouseRepository.findByName('Warehouse');

        expect(warehouses).toBeInstanceOf(Array);
        expect(warehouses).toHaveLength(3);
    });

    it('should not find any warehouse by name, name does not exists', async () => {
        const warehouses = await warehouseRepository.findByName('Any name');

        expect(warehouses).toBeInstanceOf(Array);
        expect(warehouses).toHaveLength(0);
    });

    it('should find a warehouse by postal code', async () => {
        const warehouseFound = await warehouseRepository.findByPostalCode(
            'R2C5G1'
        );

        expect(warehouseFound).toBeInstanceOf(Array);
        expect(warehouseFound).toHaveLength(1);
    });

    it('should update a warehouse name', async () => {
        const warehouse = await warehouseRepository.findByName(
            firstWarehouse.name
        );

        const updatedWarehouse = await warehouseRepository.update(
            warehouse[0].id,
            {
                ...firstWarehouse,
                name: `${firstWarehouse.name} - updated!`,
            }
        );

        expect(updatedWarehouse).toBeInstanceOf(Object);
        expect(updatedWarehouse.name).toBe(`${firstWarehouse.name} - updated!`);
    });

    it('should not update a warehouse name, warehouse does not exists', async () => {
        await expect(
            warehouseRepository.update('id-does-not-exists', {
                ...firstWarehouse,
                name: `${firstWarehouse.name} - updated!`,
            })
        ).rejects.toEqual(new AppError('Warehouse not found'));
    });

    it('should delete a warehouse', async () => {
        const warehouse = await warehouseRepository.create(secondWarehouse);

        const warehouses = await warehouseRepository.findAll();
        const countWarehouses = warehouses.length;

        await warehouseRepository.delete(warehouse.id);
        const warehouseFound = await warehouseRepository.findById(warehouse.id);

        expect(warehouseFound).toBeUndefined();
        expect(await warehouseRepository.findAll()).toHaveLength(
            countWarehouses - 1
        );
    });

    it('should not delete a warehouse, warehouse does not exists', async () => {
        await expect(
            warehouseRepository.delete('id-does-not-exists')
        ).rejects.toEqual(new AppError('Warehouse not found'));
    });
});
