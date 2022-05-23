import request from 'supertest';

import { app } from '@shared/infra/http/app';

describe('GET: /', () => {
    it('testing the public "view" route', async () => {
        await request(app).get('/').expect(200);
    });
});

describe('GET: /invalid', () => {
    it('testing the public "view" route', async () => {
        await request(app).get('/invalid').expect(404);
    });
});
