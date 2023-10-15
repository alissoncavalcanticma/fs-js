import { Router } from "express";
import accountsController from "../controllers/accounts";
import { validateLogin, validateAccount } from "./middlewares";

const router = Router();


router.get('/accounts/', accountsController.getAccounts);
router.get('/accounts/:id', accountsController.getAccount);
router.post('/accounts/', validateAccount, accountsController.addAccount);
router.patch('/accounts/:id', validateAccount, accountsController.setAccount);
router.post('/accounts/login', validateLogin, accountsController.loginAccount);
router.post('/accounts/logout', accountsController.logoutAccount);


export default router;