import request from 'supertest';

import { app } from '@shared/infra/http/app';
import { firstWarehouse } from '@shared/utils/common.jest';

describe('PUT: /warehouse', () => {
    it('should be able to update a warehouse', async () => {
        const createResponse = await request(app)
            .post('/warehouse')
            .send(firstWarehouse);

        const warehouseId = createResponse.body.id;

        const updateResponse = await request(app)
            .put(`/warehouse/${warehouseId}`)
            .send({
                ...firstWarehouse,
                name: 'Name updated',
            });
        expect(updateResponse.status).toBe(200);
        expect(updateResponse.body.name).toBe('Name updated');
    });
});
