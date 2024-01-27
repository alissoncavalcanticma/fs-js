import { Request, Response, NextFunction } from "express";

//import Schemas do Joi validator from account
import { accountSchema, accountUpdateSchema, loginSchema } from "../models/accountSchemas";

//import lib Joi
import Joi from "joi";
import auth from "../auth";

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

function validateAccountSchema(req: Request, res: Response, next: any){
    //retornando o response de validateSchema
    return validateSchema(accountSchema, req, res, next);
}

function validateUpdateAccountSchema(req: Request, res: Response, next: any){
    //retornando o response de validateSchema
    return validateSchema(accountUpdateSchema, req, res, next);
}

function validateLoginSchema(req: Request, res: Response, next: any){
    //retornando o response de validateSchema
    return validateSchema(loginSchema, req, res, next);
}


// Middleware de validação da autenticação

async function validateAuth(req: Request, res: Response, next: any){
    try{
        const token = req.headers['x-access-token'] as string;
        if(!token) return res.status(401).end();

        const payload = await auth.verify(token);
        if(!payload) return res.status(400).end();

        //recomendado pelo HTTP passar o payload pelo res.locals para a continuação da execução do controller
        res.locals.payload = payload;

        next();

    }catch(e){
        console.log(`validateAuth: ${e}`);
        res.status(400).end();
    }
}

export {validateAccountSchema, validateLoginSchema, validateUpdateAccountSchema, validateAuth};