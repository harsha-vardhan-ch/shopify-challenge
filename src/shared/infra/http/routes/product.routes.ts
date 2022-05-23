import { assignWarehouseController } from '@modules/product/assignWarehouse';
import { createProductController } from '@modules/product/createProduct';
import { deleteProductController } from '@modules/product/deleteProduct';
import { getProductsController } from '@modules/product/getProducts';
import { updateProductController } from '@modules/product/updateProduct';
import { updateProductQuantityController } from '@modules/product/updateProductQuantity';
import { Router } from 'express';

const productRoutes = Router();

productRoutes.get('/', async (req, res) => {
    return getProductsController.handle(req, res);
});

productRoutes.post('/', async (req, res) => {
    return createProductController.handle(req, res);
});

productRoutes.patch('/quantity', async (req, res) => {
    return updateProductQuantityController.handle(req, res);
});

productRoutes.patch('/', async (req, res) => {
    return updateProductController.handle(req, res);
});

productRoutes.delete('/', async (req, res) => {
    return deleteProductController.handle(req, res);
});

productRoutes.patch('/location', async (req, res) => {
    return assignWarehouseController.handle(req, res);
});

export { productRoutes };
