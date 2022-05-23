import { Product } from '@entities/Product';
import { ProductRepository } from '@repositories/in-memory/ProductRepository';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export class GetProductsService {
    constructor(private productRepository: ProductRepository) {}

    async execute(): Promise<Product[]> {
        return this.productRepository.findAll();
    }
}
