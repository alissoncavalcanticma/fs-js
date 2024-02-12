import Sequelize, {Optional, Model} from 'sequelize';
import database from 'ms-commons/data/db';
import {IContact} from './contact';

interface IContactCreationAttributes extends Optional<IContact, "id">{}

export interface IContactModel extends Model<IContact, IContactCreationAttributes>, IContact {}

/*export default database.define<IContactModel>('contact', {
   
})*/