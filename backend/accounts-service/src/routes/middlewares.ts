import {Request, Response} from 'express';

//import commonsMiddleware from 'ms-commons/api/routes/middlewares';
import commonsMiddleware from 'ms-commons/api/routes/middlewares';
import {accountSchema, loginSchema, accountUpdateSchema} from '../models/accountSchemas';


function validateAccountSchema(req: Request, res: Response, next: any){
    return commonsMiddleware.validateSchema(accountSchema as any, req as any, res as any, next);
}

function validateUpdateAccountSchema(req: Request, res: Response, next: any){
    return commonsMiddleware.validateSchema(accountUpdateSchema as any, req as any, res as any, next);
}

function validateLoginSchema(req: Request, res: Response, next: any){
    return commonsMiddleware.validateSchema(loginSchema as any, req as any, res as any, next);
}

async function validateAuth(req: Request, res: Response, next: any){
    return commonsMiddleware.validateAuth(req as any, res as any, next);
}

export {validateAccountSchema, validateLoginSchema, validateUpdateAccountSchema, validateAuth}