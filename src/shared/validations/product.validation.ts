import {
    IUpsertProductRequestDTO,
    IUpdateProductQuantityRequestDTO,
    IDeleteProductRequestDTO,
    IAssignWarehouseRequestDTO,
} from '@modules/product/productDTO';
import Joi from 'joi';

export const upsertProductValidation = (
    payload: IUpsertProductRequestDTO
): Joi.ValidationResult => {
    const schema = Joi.object({
        barcode: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        quantity: Joi.number().required(),
    });

    return schema.validate(payload);
};

export const updateProductQuantityValidation = (
    payload: IUpdateProductQuantityRequestDTO
): Joi.ValidationResult => {
    const schema = Joi.object({
        barcode: Joi.string().required(),
        quantity: Joi.number().required(),
    });

    return schema.validate(payload);
};

export const deleteProductValidation = (
    payload: IDeleteProductRequestDTO
): Joi.ValidationResult => {
    const schema = Joi.object({
        barcodes: Joi.array().items(Joi.string()).required(),
    });

    return schema.validate(payload);
};

export const assignWarehouseValidation = (
    payload: IAssignWarehouseRequestDTO
): Joi.ValidationResult => {
    const schema = Joi.object({
        barcode: Joi.string().required(),
        location: Joi.object({
            warehouseId: Joi.string().required()
        }).required(),
    });

    return schema.validate(payload);
};
