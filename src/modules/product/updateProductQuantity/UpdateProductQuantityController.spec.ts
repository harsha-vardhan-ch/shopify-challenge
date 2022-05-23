import request from 'supertest';

import { app } from '@shared/infra/http/app';
import { firstProduct } from '@shared/utils/common.jest';

describe('PATCH: /product/quantity', () => {
    it('should be able to update a product quantity', async () => {
        const createProduct = await request(app)
            .post('/product')
            .send(firstProduct);

        const productBarcode = createProduct.body.barcode;
        const response = await request(app).patch('/product/quantity').send({
            barcode: productBarcode,
            quantity: 10,
        });

        expect(response.status).toBe(200);
        expect(response.body.quantity).toBe(10);
    });
});
