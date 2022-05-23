import Joi from 'joi';

export const uuidv4Pattern = Joi.string().guid({ version: 'uuidv4' });
