import request from 'supertest';

import { app } from '@shared/infra/http/app';
import { firstProduct } from '@shared/utils/common.jest';

describe('POST: /product', () => {
    it('should be able to create a product', async () => {
        const response = await request(app).post('/product').send(firstProduct);

        expect(response.status).toBe(201);
        expect(response.body).not.toHaveProperty('location');
        expect(response.body.location).toBeUndefined();
    });
});
