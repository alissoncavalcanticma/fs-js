import Sequelize, {Optional, Model} from 'sequelize';
import database from 'ms-commons/data/db';
import {IContact} from './contact';

//interface para definir atributo optional para casos de Update
interface IContactCreationAttributes extends Optional<IContact, "id">{}

//export de interface que cruza os types definidos em IContact com a interface Optional
export interface IContactModel extends Model<IContact, IContactCreationAttributes>, IContact {}

export default database.define<IContactModel>('contact', {
    id:{
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    accountId:{
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    name:{
        type: Sequelize.STRING(150),
        allowNull: true
    },
    email:{
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true
    },
    phone:{
        type: Sequelize.STRING(11),
        allowNull: true
    },
    status:{
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
        defaultValue: 100
    }

})
