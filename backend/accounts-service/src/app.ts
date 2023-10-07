import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';

//Instanciando o express
const app = express();

//Definindo o user do helmet
app.use(helmet());
//Definindo o tratamento do body da req para JSON com body-parser
app.use(bodyParser.json());

//obtendo as variáveis de ambiente
const port = parseInt(`${process.env.PORT}`);

// Startando o server
app.listen(port);
console.log(`## INFO ## - Start Server in port ${port}`);