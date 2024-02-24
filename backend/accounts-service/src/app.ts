//app.ts
import app from 'ms-commons/api/app'
import accountsRouter from './routes/accounts';

//Toda implementação realizada no __commons__

export default app(accountsRouter as any);