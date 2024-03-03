import {Request, Response} from 'express';
import Joi, { ObjectSchema } from 'joi';
import auth from '../auth';

function validateSchema(schema : ObjectSchema, req: Request, res: Response, next: any){
    const {error} = schema.validate(req.body);
    if(error == null) return next();

    const {details} = error;
    const message = details.map(item => item.message).join(',');

    console.log(`validateSchema: ${message}`);
    res.status(422).end();
}

async function validateAuth(req: Request, res: Response, next: any){
    try{
        //Get token from headers of requisition
        const token = req.headers['x-access-token'] as string;
        //console.log("request token:" + req.headers['x-access-token']);
        
        if(!token) return res.status(401).end();

        //verify token an return accountId value
        const payload = await auth.verify(token);
        //console.log("payload:" + JSON.stringify(payload));

        if(!payload) return res.status(401).end();

        res.locals.payload = payload;
        //console.log("res.locals.payload:" + res.locals.payload);

        next();
    }
    catch(error){
        console.log(`validateAuth: ${error}`);
        res.status(400).end();
    }
}

export default {validateAuth, validateSchema}