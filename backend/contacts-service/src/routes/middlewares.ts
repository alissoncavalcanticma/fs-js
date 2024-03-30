import {Request, Response} from 'express';

//import commonsMiddleware from 'ms-commons/api/routes/middlewares';
import commonsMiddleware from 'ms-commons/api/routes/middlewares';
import {contactSchema, contactUpdateSchema} from '../models/contactSchemas';


function validateContactSchema(req: Request, res: Response, next: any){
    return commonsMiddleware.validateSchema(contactSchema as any, req as any, res as any, next);
}

function validateUpdateContactSchema(req: Request, res: Response, next: any){
    return commonsMiddleware.validateSchema(contactUpdateSchema as any, req as any, res as any, next);
}

export {validateContactSchema, validateUpdateContactSchema}