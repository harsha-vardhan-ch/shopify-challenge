import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';

import { GetWarehousesService } from './GetWarehousesService';

@autoInjectable()
export class GetWarehousesController {
    constructor(private GetWarehousesService: GetWarehousesService) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const response = await this.GetWarehousesService.execute();
        return res.status(200).json(response);
    }
}
