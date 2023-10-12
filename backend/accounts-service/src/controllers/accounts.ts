import {Request, Response} from 'express';
import { IAccount } from '../models/account';

const accounts: IAccount[] = [];


function getAccounts(req: Request, res: Response, next: any){
    res.json(accounts);
}

function addAccount(req: Request, res: Response, next: any){
    try{
        const newAccount = req.body as IAccount;
        accounts.push(newAccount);
        res.status(201).json(newAccount);
    }catch(e){
        console.log(e);
        res.status(422).end();
    }
}

function getAccount(req: Request, res: Response, next: any){
    try{
        const id = parseInt(req.params.id);
        if(!id) throw new Error ("ID is invalid format");
        const index = accounts.findIndex(item => item.id === id);
        if(index === -1){
            return res.status(404).end();
        }else{
            return res.json(accounts[index]);
        }
    }catch(e){
        //console.log(e);
        res.status(400).end();
    }
}

export default {getAccounts, addAccount, getAccount};