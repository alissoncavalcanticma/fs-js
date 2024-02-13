import {Request, Response} from 'express';

//import commonsMiddleware from 'ms-commons/api/routes/middlewares';
import middlewareCommons from 'ms-commons/api/routes/middlewares';
import {accountSchema, loginSchema, accountUpdateSchema} from '../models/accountSchemas';


function validateAccountSchema(req: Request, res: Response, next: any){
    return middlewareCommons.validateSchema(accountSchema as any, req as any, res as any, next);
}

function validateUpdateAccountSchema(req: Request, res: Response, next: any){
    return middlewareCommons.validateSchema(accountUpdateSchema as any, req as any, res as any, next);
}

function validateLoginSchema(req: Request, res: Response, next: any){
    return middlewareCommons.validateSchema(loginSchema as any, req as any, res as any, next);
}

async function validateAuth(req: Request, res: Response, next: any){
    return middlewareCommons.validateAuth(req as any, res as any, next);
}

export {validateAccountSchema, validateLoginSchema, validateUpdateAccountSchema, validateAuth}