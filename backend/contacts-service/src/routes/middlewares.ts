import {Request, Response} from 'express';

//import commonsMiddleware from 'ms-commons/api/routes/middlewares';
import commonsMiddleware from 'ms-commons/api/routes/middlewares';
import {accountSchema, loginSchema, accountUpdateSchema} from '../models/accountSchemas';

//import controller and auth module from ms-commons for authenticate function
import controllerCommons from 'ms-commons/controllers/controller';
import { Token } from 'ms-commons/api/auth';


function validateAccountSchema(req: Request, res: Response, next: any){
    return commonsMiddleware.validateSchema(accountSchema as any, req as any, res as any, next);
}

function validateUpdateAccountSchema(req: Request, res: Response, next: any){
    return commonsMiddleware.validateSchema(accountUpdateSchema as any, req as any, res as any, next);
}

function validateLoginSchema(req: Request, res: Response, next: any){
    return commonsMiddleware.validateSchema(loginSchema as any, req as any, res as any, next);
}

async function validateAuthentication(req: Request, res: Response, next: any){
    return commonsMiddleware.validateAuth(req as any, res as any, next);
}

//Function for verify authorization
function validateAuthorization(req: Request, res: Response, next: any){
    
    const accountId = parseInt(req.params.id);
    if (!accountId) return res.status(400).end();

    const token = controllerCommons.getToken(res) as Token;
    if(accountId !== token.accountId) return res.status(403).end();

    next();
}

export {validateAccountSchema, validateLoginSchema, validateUpdateAccountSchema, validateAuthentication, validateAuthorization}