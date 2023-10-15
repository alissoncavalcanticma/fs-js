import { Request, Response, NextFunction } from "express";

//import Schemas do Joi validator from account
import { accountSchema, loginSchema } from "../models/account";
import Joi from "joi";

//Create middleware e validação de body

function validateSchema(schema: Joi.ObjectSchema<any>, req: Request, res: Response, next: any){
    const {error} = schema.validate(req.body);
    if(error == null) return next();

    const {details} = error;
    const message = details.map(item => item.message).join(',');

    console.log(message);

    //status 422 é um bad request devido tipo inválido
    res.status(422).end();
}

function validateAccount(req: Request, res: Response, next: any){
    //retornando o response de validateSchema
    return validateSchema(accountSchema, req, res, next);
}

function validateLogin(req: Request, res: Response, next: any){
    //retornando o response de validateSchema
    return validateSchema(loginSchema, req, res, next);
}

export {validateAccount, validateLogin}