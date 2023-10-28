import Sequelize, { Model, Optional } from 'sequelize';
import database from '../db';
//import Account Interface
import { IAccount } from './account';

//define Interface Optional Creation Attributes in the Model
interface AccountCreationAttributes extends Optional<IAccount, "id">{};


//export interface AccountModel
export interface AccountModel extends Model<IAccount, AccountCreationAttributes>, IAccount{};


//Model de criação das tabelas do DB usando conceito de Generics <AccountModel>
const accountModel =  database.define<AccountModel>('account', {
    id: {
        //UNISGNED = Sem sinal (+/-)
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false 
    },
    name: {
        type: Sequelize.STRING(),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
        defaultValue: 100
    },
    domain: {
        type: Sequelize.STRING,
        allowNull: false
    }

});

function findAll(){
    return accountModel.findAll<AccountModel>();
};

function findByEmail(emailFilter: string){
    return accountModel.findOne<AccountModel>({where: {email: emailFilter}});
};

function findById(id: number){
    return accountModel.findByPk<AccountModel>(id);
}

function add(account: IAccount){
    return accountModel.create(account);
}

async function set(id: number, account: IAccount){
    const originalAccount = await accountModel.findByPk<AccountModel>(id);
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