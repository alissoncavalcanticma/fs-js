import { Router, Request, Response, NextFunction } from "express";
import accountsController from "../controllers/accounts";

//import Joi validator from account
import { accountSchema } from "../models/account";

const router = Router();

//Create middleware e validação de body
function validateAccount(req: Request, res: Response, next: any){
    const {error} = accountSchema.validate(req.body);
    if(error == null) return next();

    const {details} = error;
    const message = details.map(item => item.message).join(',');

    console.log(message);

    //status 422 é um bad request devido tipo inválido
    res.status(422).end();
}

router.get('/accounts/', accountsController.getAccounts);
router.get('/accounts/:id', accountsController.getAccount);
router.post('/accounts/', validateAccount, accountsController.addAccount);


export default router;