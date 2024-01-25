import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import accountsRouter from './routes/accounts';

//Instanciando o express
const app = express();

//Definindo o uso do helmet para segurança dos headers
app.use(helmet());
//Definindo o tratamento do body da req para JSON com body-parser
app.use(bodyParser.json());

app.use(accountsRouter);

export default app;