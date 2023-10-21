import {Request, Response} from 'express';
import { IAccount } from '../models/account';

//import Account Model Sequelize
import AccountRepository, {AccountModel} from '../models/accountModel';

const accounts: IAccount[] = [];


async function getAccounts(req: Request, res: Response, next: any){
    
    const accounts = await AccountRepository.findAll<AccountModel>();
    res.json(accounts.map(item => {
        item.password = '';
        return item;
    }));

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

function setAccount(req: Request, res: Response, next: any){
    try{
        const accountId = parseInt(req.params.id);
        if(!accountId) throw new Error('Id is in invalid format.');

        const accountParams = req.body as IAccount;
        const index = accounts.findIndex(item => item.id === accountId);
        if(index === -1) return res.status(404).end();
        
        const originalAccount = accounts[index];
        if(accountParams.name) originalAccount.name = accountParams.name;
        if(accountParams.password) originalAccount.password = accountParams.password;

        accounts[index] = originalAccount;
        res.status(200).json(originalAccount);

    }catch(e){
        res.status(400).end();
    }
}

function loginAccount(req: Request, res: Response, next: any){
    try{
        const loginParams = req.body as IAccount;
        const index = accounts.findIndex(item => item.email === loginParams.email && item.password === loginParams.password);
    
        if(index === -1) return res.status(401).end();
    
        res.json({auth: true, token: {}});

    }catch(e){
        console.log(e);
        res.status(400).end();
    }

}

function logoutAccount(req: Request, res: Response, next: any){
    try{
        res.json({auth: false, token: null}).end();
    }catch(e){
        console.log(e);
    }
}


export default {getAccounts, addAccount, getAccount, setAccount, loginAccount, logoutAccount};