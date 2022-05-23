import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';

import { GetProductsService } from './GetProductsService';

@autoInjectable()
export class GetProductsController {
    constructor(private GetProductsService: GetProductsService) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const response = await this.GetProductsService.execute();
        return res.status(200).json(response);
    }
}
