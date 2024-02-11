import app from 'ms-commons/api/app';
import accountsRouter from './routes/accounts';
//import contactsRouter from './routes/contacts';
//import { Router } from 'express';

//Toda implementação realizada no __commons__

export default app(accountsRouter);