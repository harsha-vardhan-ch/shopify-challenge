import request from 'supertest';

import { app } from '@shared/infra/http/app';
import { firstWarehouse } from '@shared/utils/common.jest';

describe('POST: /warehouse', () => {
    it('should be able to create a warehouse', async () => {
        const response = await request(app)
            .post('/warehouse')
            .send(firstWarehouse);

        expect(response.status).toBe(201);
    });
});
