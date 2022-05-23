import { IUpsertWarehouseRequestDTO } from '@modules/warehouse/warehouseDTO';
import Joi from 'joi';

import { uuidv4Pattern } from './shared.patterns';

export const upsertWarehouseValidation = (
    payload: IUpsertWarehouseRequestDTO
): Joi.ValidationResult => {
    const schema = Joi.object({
        name: Joi.string().required(),
        address: Joi.object({
            // street: Joi.string().required(),
            city: Joi.string().required(),
            // province: Joi.string().required(),
            // postalCode: Joi.string().required(),
        }).required(),
        // aisles: Joi.object({
        //     rows: Joi.number().min(1).required(),
        //     binsPerRow: Joi.number().min(1).required(),
        // }).required(),
    });

    return schema.validate(payload);
};

export const deleteWarehouseValidation = (id: string): Joi.ValidationResult => {
    return uuidv4Pattern.validate(id);
};
