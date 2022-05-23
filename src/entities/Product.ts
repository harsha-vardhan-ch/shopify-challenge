export interface IProductLocation {
    warehouseId: string;
}

export interface IProductEntity {
    barcode: string;
    sku: string;
    name: string;
    description: string;
    quantity: number;
    location: IProductLocation;
}

export class Product implements IProductEntity {
    barcode: string;
    sku: string;
    name: string;
    description: string;
    quantity: number;
    location: IProductLocation;

    constructor(product: IProductEntity) {
        Object.assign(this, product);
    }

    static create(product: IProductEntity): Product {
        return new Product(product);
    }
}
