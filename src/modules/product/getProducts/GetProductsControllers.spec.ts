import request from 'supertest';

import { app } from '@shared/infra/http/app';

describe('GET: /product', () => {
    it('should be able to fetch all available products', async () => {
        await request(app).get('/product').expect(200);
    });
});
