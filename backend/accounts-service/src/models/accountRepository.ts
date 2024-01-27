/*

accountRepository




*/


//import DestryOption for Sequelize (lib for use delete function)
import { DestroyOptions } from "sequelize";
//missing for define model of data 
import { IAccount } from "./account";
//missing for attributes definitions
import accountModel, {IAccountModel} from "./accountModel";


function findAll(){
    return accountModel.findAll<IAccountModel>();
};

function findByEmail(emailFilter: string){
    return accountModel.findOne<IAccountModel>({where: {email: emailFilter}});
};

function findById(id: number){
    return accountModel.findByPk<IAccountModel>(id);
}

function add(account: IAccount){
    return accountModel.create(account);
}

async function set(id: number, account: IAccount){
    const originalAccount = await accountModel.findByPk<IAccountModel>(id);
    if(originalAccount !== null){
        originalAccount.name = account.name;
        originalAccount.domain = account.domain;
        originalAccount.status = account.status;
        if(account.password){
            originalAccount.password = account.password;
        }
        await originalAccount.save();
        return originalAccount;
    }
    throw new Error(`Account not found.`);
}

function remove(id: number){
    return accountModel.destroy({where: {id: id}} as DestroyOptions<IAccount>);
}

function removeByEmail(email: string){
    return accountModel.destroy({where: {email: email}} as DestroyOptions<IAccount>);
}




export default {findAll, findById, findByEmail, add, set, remove, removeByEmail};