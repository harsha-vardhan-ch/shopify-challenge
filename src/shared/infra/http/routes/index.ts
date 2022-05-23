import { Router } from 'express';

import { productRoutes } from './product.routes';
import { publicRoutes } from './public.routes';
import { warehouseRoutes } from './warehouse.routes';

const router = Router();
router.use('/', publicRoutes);
router.use('/warehouse', warehouseRoutes);
router.use('/product', productRoutes);

export { router };
