import app from "./app";
import database from './db';

(async() => {
    try{

        //obtendo as variáveis de ambiente
        const {PORT, DB_NAME} = process.env;

        //iniciando conexão ao database com sincronismo dos modelos
        await database.sync();
        console.log(`## INFO ## - Running Database ${DB_NAME}`);

        // Startando o server
        await app.listen(PORT);
        console.log(`## INFO ## - Start Server in port ${PORT}`);

    }catch(e){
        console.log(e);
    }
})();