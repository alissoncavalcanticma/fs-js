import { IAccount } from "./account";
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




export default {findAll, findById, findByEmail, add, set};