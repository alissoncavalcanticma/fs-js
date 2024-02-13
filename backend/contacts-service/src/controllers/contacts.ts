import {Request, Response} from 'express';
import commonsController from 'ms-commons/controllers/controller';
import { Token } from 'ms-commons/api/auth';
import repository from 'src/models/contactRepository';

async function getContacts(req: Request, res: Response, next: any){
    const token = commonsController.getToken(res) as Token;
    const contacts = await repository.findAll(token.accountId);
    res.json(contacts);
}

export default {getContacts}