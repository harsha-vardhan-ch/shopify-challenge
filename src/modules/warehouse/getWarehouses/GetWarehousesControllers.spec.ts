import request from 'supertest';

import { app } from '@shared/infra/http/app';

describe('GET: /warehouse', () => {
    it('should be able to fetch all available warehouses', async () => {
        await request(app).get('/warehouse').expect(200);
    });
});
