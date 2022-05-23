import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';

import { UpdateWarehouseService } from './UpdateWarehouseService';

@autoInjectable()
export class UpdateWarehouseController {
    constructor(private updateWarehouseService: UpdateWarehouseService) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const response = await this.updateWarehouseService.execute(
            id,
            req.body
        );

        return res.status(200).json(response);
    }
}
