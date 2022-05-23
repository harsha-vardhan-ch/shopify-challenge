import request from 'supertest';

import { app } from '@shared/infra/http/app';
import { firstProduct } from '@shared/utils/common.jest';

describe('DELETE: /product', () => {
    it('should be able to delete a product', async () => {
        const createProduct = await request(app)
            .post('/product')
            .send(firstProduct);

        const productBarcode = createProduct.body.barcode;
        const response = await request(app)
            .delete('/product')
            .send({ barcodes: [productBarcode] });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('productsDeleted');
        expect(response.body.productsDeleted).toBe(1);
    });
});
