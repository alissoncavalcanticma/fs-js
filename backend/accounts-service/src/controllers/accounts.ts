import {Request, Response} from 'express';
import { IAccount } from '../models/account';

//import Account Model Sequelize
//import AccountRepository, {AccountModel} from '../models/accountModel';
import repository from '../models/accountRepository';

//import auth for bcrypt
import auth from '../auth';
import { Console } from 'console';

const dataHora = () => {
    const data = new Date();
    const now = new Date(data.getTime() - data.getTimezoneOffset() * 60000);
    return now;
}


async function getAccounts(req: Request, res: Response, next: any){
    
    const accounts = await repository.findAll();
    res.json(accounts.map(item => {
        item.password = '';
        return item;
    }));

}

async function addAccount(req: Request, res: Response, next: any){
    try{
        const newAccount = req.body as IAccount;
        newAccount.password = auth.hashPassword(newAccount.password);
        const result = await repository.add(newAccount);
        newAccount.id = result.id;
        newAccount.password = '';
        console.log(dataHora() + " ## INFO ## - Added Account.");
        res.status(201).json(newAccount);
    }catch(e){
        console.log(e);
        res.status(422).end();
    }
}

async function getAccount(req: Request, res: Response, next: any){
    try{
        const id = parseInt(req.params.id);
        if(!id) throw new Error (dataHora() + " ## ERROR ## - ID is invalid format");
        
        const account = await repository.findById(id);
        if(account === null){
            return res.status(404).end();
        }else{
            account.password = '';
            return res.json(account);
        }
    }catch(e){
        //console.log(e);
        res.status(400).end();
    }
}

async function setAccount(req: Request, res: Response, next: any){
    try{
        const accountId = parseInt(req.params.id);
        if(!accountId){
            throw new Error(dataHora() + ' ## ERROR ## - Id is in invalid format.');
            //res.status(400).end(0);
        } 

        const accountParams = req.body as IAccount;

        accountParams.password = auth.hashPassword(accountParams.password);
        const updatedAccount = await repository.set(accountId, accountParams);
        if(updatedAccount !== null){
            updatedAccount.password = '';
            console.log(dataHora() + ' ## INFO ## - Update account successfuly.')
            res.status(200).json(updatedAccount);
        }else{
            res.status(404).end();
        }

    }catch(e){
        res.status(400).end();
    }
}

async function loginAccount(req: Request, res: Response, next: any){
    try{

        const loginParams = req.body as IAccount;
        const account = await repository.findByEmail(loginParams.email);

        if(account !== null){
            const isValid = auth.comparePassword(loginParams.password, account.password);
            if(isValid){
                const token = await auth.sign(account.id!);
                console.log(dataHora(), " ## INFO ## - Login true, generated token.");
                res.json({auth: true, token});
            }else{
                console.log(dataHora(), " ## ALERT ## - Password is not valid!");
                return res.status(401).end();
            }
        }else{
            console.log(dataHora(), " ## ALERT ## - Account not exist, verify your e-mail!");
        }
        
        return res.status(401).end();

    }catch(e){
        console.log(e);
        res.status(400).end();
    }

}

function logoutAccount(req: Request, res: Response, next: any){
    res.json({auth: false, token: null}).end();
}


export default {getAccounts, addAccount, getAccount, setAccount, loginAccount, logoutAccount};