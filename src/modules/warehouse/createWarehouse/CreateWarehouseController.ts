import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';

import { CreateWarehouseService } from './CreateWarehouseService';

@autoInjectable()
export class CreateWarehouseController {
    constructor(private createWarehouseService: CreateWarehouseService) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const response = await this.createWarehouseService.execute(req.body);
        return res.status(201).json(response);
    }
}
