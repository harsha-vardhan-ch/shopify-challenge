import request from 'supertest';

import { app } from '@shared/infra/http/app';
import { firstWarehouse } from '@shared/utils/common.jest';

describe('DELETE /warehouse/{warehouseId}', () => {
    it('should be able to delete a warehouse', async () => {
        const createResponse = await request(app)
            .post('/warehouse')
            .send(firstWarehouse);

        const warehouseId = createResponse.body.id;

        const deleteResponse = await request(app).delete(
            `/warehouse/${warehouseId}`
        );
        expect(deleteResponse.status).toBe(200);
        expect(deleteResponse.body.message).toBe('Warehouse deleted');
    });
});
