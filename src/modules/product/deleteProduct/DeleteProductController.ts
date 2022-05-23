import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';

import { DeleteProductService } from './DeleteProductService';

@autoInjectable()
export class DeleteProductController {
    constructor(private deleteProductService: DeleteProductService) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const response = await this.deleteProductService.execute(req.body);
        return res.json(response);
    }
}
