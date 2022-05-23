interface IWarehouseAddress {
    
    city: string;
    
}



export interface IWarehouseEntity {
    id: string;
    name: string;
    address: IWarehouseAddress;
   
}

export class Warehouse implements IWarehouseEntity {
    id: string;
    name: string;
    address: IWarehouseAddress;

    constructor(warehouse: IWarehouseEntity) {
        Object.assign(this, warehouse);
    }

    static create(warehouse: IWarehouseEntity): Warehouse {
        return new Warehouse(warehouse);
    }
}
