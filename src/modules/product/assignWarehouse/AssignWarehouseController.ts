import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';

import { AssignWarehouseService } from './AssignWarehouseService';

@autoInjectable()
export class AssignWarehouseController {
    constructor(private assignWarehouseService: AssignWarehouseService) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const response = await this.assignWarehouseService.execute(req.body);
        return res.status(200).json(response);
    }
}
