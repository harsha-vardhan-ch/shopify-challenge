import request from 'supertest';

import { app } from '@shared/infra/http/app';
import { firstProduct } from '@shared/utils/common.jest';

describe('PATCH: /product', () => {
    it('should be able to update a product', async () => {
        const createProduct = await request(app)
            .post('/product')
            .send(firstProduct);

        const productBarcode = createProduct.body.barcode;
        const response = await request(app)
            .patch('/product')
            .send({
                ...firstProduct,
                barcode: productBarcode,
                name: 'Updated product name',
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Updated product name');
    });
});
