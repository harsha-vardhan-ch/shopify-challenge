import { Product } from '@entities/Product';
import {
    IAssignWarehouseRequestDTO,
    IDeletedProductResponseDTO,
    IUpsertProductRequestDTO,
} from '@modules/product/productDTO';

export interface IProductRepository {
    create(product: IUpsertProductRequestDTO): Promise<Product>;
    updateQuantity(barcode: string, quantity: number): Promise<Product>;
    update(product: IUpsertProductRequestDTO): Promise<Product>;
    delete(barcodes: string[]): Promise<IDeletedProductResponseDTO>;

    assignLocation(payload: IAssignWarehouseRequestDTO): Promise<Product>;
    findByBarcode(barcode: string): Promise<Product>;
    findAll(): Promise<Product[]>;
    findByName(name: string): Promise<Product[]>;
    findByDescription(description: string): Promise<Product[]>;
    findByWarehouseId(warehouseId: string): Promise<Product[]>;
    unassignLocation(warehouseId: string): Promise<void>;
}
