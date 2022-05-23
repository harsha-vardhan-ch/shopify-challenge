import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';

import { UpdateProductQuantityService } from './UpdateProductQuantityService';

@autoInjectable()
export class UpdateProductQuantityController {
    constructor(
        private updateProductQuantityService: UpdateProductQuantityService
    ) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const response = await this.updateProductQuantityService.execute(
            req.body
        );
        return res.status(200).json(response);
    }
}
