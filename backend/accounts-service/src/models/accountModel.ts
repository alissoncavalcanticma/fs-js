import Sequelize, { Model, Optional } from 'sequelize';
import database from '../db';
//import Account Interface
import { IAccount } from './account';

//define Interface Optional Creation Attributes in the Model
interface IAccountCreationAttributes extends Optional<IAccount, "id">{};


//export interface AccountModel
export interface IAccountModel extends Model<IAccount, IAccountCreationAttributes>, IAccount{};


//Model de criação das tabelas do DB usando conceito de Generics <AccountModel>
export default database.define<IAccountModel>('account', {
    id: {
        //UNISGNED = Sem sinal (+/-)
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false 
    },
    name: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    status: {
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
        defaultValue: 100
    },
    domain: {
        type: Sequelize.STRING(100),
        allowNull: false
    }

});