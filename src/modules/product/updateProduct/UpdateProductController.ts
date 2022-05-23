import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';

import { UpdateProductService } from './UpdateProductService';

@autoInjectable()
export class UpdateProductController {
    constructor(private updateProductService: UpdateProductService) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const response = await this.updateProductService.execute(req.body);
        return res.status(200).json(response);
    }
}
