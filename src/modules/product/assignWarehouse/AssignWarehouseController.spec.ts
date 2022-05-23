import request from 'supertest';

import { app } from '@shared/infra/http/app';
import { firstProduct, firstWarehouse } from '@shared/utils/common.jest';

describe('PATCH: /product/location', () => {
    it('should be able to assign a warehouse location to a product', async () => {
        // First we create a warehouse so we can assign a product to it
        const createWarehouse = await request(app)
            .post('/warehouse')
            .send(firstWarehouse);

        const warehouseId = createWarehouse.body.id;
        expect(createWarehouse.status).toBe(201);

        const createProduct = await request(app)
            .post('/product')
            .send(firstProduct);

        const productBarcode = createProduct.body.barcode;
        expect(createProduct.status).toBe(201);

        const assignWarehouse = await request(app)
            .patch('/product/location')
            .send({
                barcode: productBarcode,
                location: {
                    warehouseId,
                    aisle: 5,
                    bin: 10,
                },
            });

        expect(assignWarehouse.status).toBe(200);
        expect(assignWarehouse.body).toHaveProperty('location');
        expect(assignWarehouse.body.location).not.toBeUndefined();
    });
});
