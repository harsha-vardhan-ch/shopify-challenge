import { RemoveProductWarehouseService } from '@modules/product/removeProductWarehouse/RemoveProductWarehouseService';
import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';

import { DeleteWarehouseService } from './DeleteWarehouseService';

@autoInjectable()
export class DeleteWarehouseController {
    constructor(
        private deleteWarehouseService: DeleteWarehouseService,
        private removeProductWarehouseService: RemoveProductWarehouseService
    ) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        await this.deleteWarehouseService.execute(id);
        await this.removeProductWarehouseService.execute(id);

        return res.status(200).json({ message: 'Warehouse deleted' });
    }
}
