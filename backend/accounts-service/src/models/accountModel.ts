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