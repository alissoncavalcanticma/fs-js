import {Request, Response} from 'express';
import commonsController from 'ms-commons/controllers/controller';
import { Token } from 'ms-commons/api/auth';
import repository from '../models/contactRepository';
import { IContact } from 'src/models/contact';


async function getContact(req: Request, res: Response, next: any){
    try{
        const id = parseInt(req.params.id);
        if(!id) return res.status(400).end();

        const token = commonsController.getToken(res) as Token;
        const contact = await repository.findById(id, token.accountId);

        if(contact === null) return res.status(404).end();
        else res.json(contact);
    }catch(e){
        console.log(`getContact: ${e}`);
        res.status(400).end();
    }
}

async function getContacts(req: Request, res: Response, next: any){
    try{
        const token = commonsController.getToken(res) as Token;
        const contacts = await repository.findAll(token.accountId);
        res.json(contacts);
    }catch(e){
        console.log(`getContacts: ${e}`);
        res.status(400).end();
    }
}

async function addContact(req: Request, res: Response, next: any){
    try{
        const token = commonsController.getToken(res) as Token;
        const contact = req.body as IContact;
        const result = await repository.add(contact, token.accountId);

        res.status(201).json(result);
    }catch(e){
        console.log(`Error addContact: ${e}`);
        res.status(400).end();
    }
}

export default {getContact, getContacts, addContact}