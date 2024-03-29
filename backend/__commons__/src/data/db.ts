// Conexão ao banco de dados

import { Sequelize } from 'sequelize';

const DB_NAME = process.env.DB_NAME!; 
const DB_USER = process.env.DB_USER!; 
const {DB_PASSWORD, DB_HOST} = process.env; 
const logging = process.env.SQL_LOG ? true : false

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    dialect: 'mysql',
    host: DB_HOST,
    logging: logging
});

export default sequelize;

