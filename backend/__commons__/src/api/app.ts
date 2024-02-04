//app.ts Genérico

import express, {Router} from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';

export default (router: Router) => {

    //Instanciando o express
    const app = express();

    //Definindo o uso do helmet para segurança dos headers
    app.use(helmet());
    //Definindo o tratamento do body da req para JSON com body-parser
    app.use(bodyParser.json());

    app.use(router);

    return app;

}