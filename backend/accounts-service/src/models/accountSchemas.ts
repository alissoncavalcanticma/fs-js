// Import lib for schema validation
import Joi from "joi"

export const accountSchema = Joi.object({
    id: Joi.number()
        .integer()
        .min(1),
    name: Joi.string()
        .min(3)
        .max(150)
        .required(),
    email: Joi.string()
        .email()
        .min(8)
        .max(150)
        .required(),
    password: Joi.string()
        .alphanum()
        .min(6)
        .max(50),
    status: Joi.number()
        .min(100)
        .max(400),
    domain: Joi.string()
        .min(5)
        .max(50)
        .required()
})

export const accountUpdateSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(150),
    password: Joi.string()
        .alphanum()
        .min(6)
        .max(50),
    status: Joi.number()
        .integer()
        .min(100)
        .max(400),
    domain: Joi.string()
        .min(5)
        .max(50)
})

export const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .min(8)
        .max(150)
        .required(),
    password: Joi.string()
        .alphanum()
        .min(6)
        .max(50)
})