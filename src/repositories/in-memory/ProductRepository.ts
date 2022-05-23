import { Product } from '@entities/Product';
import {
    IAssignWarehouseRequestDTO,
    IDeletedProductResponseDTO,
    IUpsertProductRequestDTO,
} from '@modules/product/productDTO';
import { IProductRepository } from '@repositories/IProductRepository';

import { AppError } from '@shared/errors/AppError';

export const memoryProducts: Product[] = [];

export class ProductRepository implements IProductRepository {
    private findProductIndex(barcode: string): number {
        return memoryProducts.findIndex(
            (product) => product.barcode === barcode
        );
    }

    create(product: IUpsertProductRequestDTO): Promise<Product> {
        const newProduct: Product = {
            ...product,
            location: undefined,
        };

        memoryProducts.push(newProduct);
        return Promise.resolve(newProduct);
    }

    updateQuantity(barcode: string, quantity: number): Promise<Product> {
        const productIndex = this.findProductIndex(barcode);
        if (productIndex === -1) {
            return Promise.reject(new AppError('Product not found'));
        }

        memoryProducts[productIndex] = {
            ...memoryProducts[productIndex],
            quantity,
        };

        return Promise.resolve(memoryProducts[productIndex]);
    }

    update(product: IUpsertProductRequestDTO): Promise<Product> {
        const productIndex = this.findProductIndex(product.barcode);
        if (productIndex === -1) {
            return Promise.reject(new AppError('Product not found'));
        }

        memoryProducts[productIndex] = {
            ...memoryProducts[productIndex],
            ...product,
        };

        return Promise.resolve(memoryProducts[productIndex]);
    }

    delete(barcodes: string[]): Promise<IDeletedProductResponseDTO> {
        let productsDeleted = 0;

        barcodes.forEach((barcode) => {
            const productIndex = this.findProductIndex(barcode);
            if (productIndex !== -1) {
                memoryProducts.splice(productIndex, 1);
                productsDeleted += 1;
            }
        });

        return Promise.resolve({ productsDeleted });
    }

    assignLocation(payload: IAssignWarehouseRequestDTO): Promise<Product> {
        const { barcode, location } = payload;

        const productIndex = this.findProductIndex(barcode);
        if (productIndex === -1) {
            return Promise.reject(new AppError('Product not found'));
        }

        memoryProducts[productIndex] = {
            ...memoryProducts[productIndex],
            location,
        };

        return Promise.resolve(memoryProducts[productIndex]);
    }

    findByBarcode(barcode: string): Promise<Product> {
        const productIndex = this.findProductIndex(barcode);

        return Promise.resolve(memoryProducts[productIndex]);
    }

    findAll(): Promise<Product[]> {
        return Promise.resolve(memoryProducts);
    }

    findByName(name: string): Promise<Product[]> {
        const names = name.toLocaleLowerCase().split(' ');
        const products = memoryProducts.filter((product) => {
            return names.every((name) =>
                product.name.toLocaleLowerCase().includes(name)
            );
        });

        return Promise.resolve(products);
    }

    findByDescription(description: string): Promise<Product[]> {
        const descriptions = description.toLocaleLowerCase().split(' ');
        const products = memoryProducts.filter((product) => {
            return descriptions.every((description) =>
                product.description.toLocaleLowerCase().includes(description)
            );
        });

        return Promise.resolve(products);
    }

    findByWarehouseId(warehouseId: string): Promise<Product[]> {
        const products = memoryProducts.filter((product) => {
            return (
                product.location && product.location.warehouseId === warehouseId
            );
        });

        return Promise.resolve(products);
    }

    unassignLocation(warehouseId: string): Promise<void> {
        memoryProducts.forEach((product, index) => {
            if (
                product.location &&
                product.location.warehouseId === warehouseId
            ) {
                memoryProducts[index].location = undefined;
            }
        });

        return Promise.resolve();
    }
}
