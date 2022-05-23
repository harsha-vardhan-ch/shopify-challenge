import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';

import { CreateProductService } from './CreateProductService';

@autoInjectable()
export class CreateProductController {
    constructor(private createProductService: CreateProductService) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const response = await this.createProductService.execute(req.body);
        return res.status(201).json(response);
    }
}
