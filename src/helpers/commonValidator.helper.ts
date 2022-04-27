import Joi from 'joi';

import { regexConstant } from '../constants';

export const commonValidator = {
    name: Joi.string().regex(regexConstant.NAME),
    phone: Joi.string().regex(regexConstant.PHONE),
    email: Joi.string().email().lowercase(),
    password: Joi.string().regex(regexConstant.PASSWORD),
    id: Joi.number(),
    idMongo: Joi.string(),
    address: {
        city: Joi.string().required(),
        oblast: Joi.string().required(),
        street: Joi.string().required(),
        buildingNumber: Joi.number().required(),
        app: Joi.number(),
    },
};
