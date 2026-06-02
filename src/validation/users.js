import Joi from 'joi';

const safePattern  = /[a-zA-Z]/;
export const usersValidation = Joi.object({
    name: Joi.string().required().pattern(safePattern),
    email: Joi.string().email().required(),
    skip: Joi.number().integer().min(0),
    limit: Joi.number().integer().max(100)
}).unknown(true);