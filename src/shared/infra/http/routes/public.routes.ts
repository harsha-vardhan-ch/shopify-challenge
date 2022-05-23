import { memoryProducts } from '@repositories/in-memory/ProductRepository';
import { memoryWarehouses } from '@repositories/in-memory/WarehouseRepository';
import { Router } from 'express';

const publicRoutes = Router();

publicRoutes.get('/', async (req, res) => {
    res.render('index', {
        products: memoryProducts,
        warehouses: memoryWarehouses,
    });
});

export { publicRoutes };
