import { ProductRepository } from '@repositories/in-memory/ProductRepository';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export class RemoveProductWarehouseService {
    constructor(private productRepository: ProductRepository) {}

    async execute(warehouseId: string): Promise<void> {
        this.productRepository.unassignLocation(warehouseId);
    }
}
