import { Router } from "express";
import accountsController from "../controllers/accounts";
import { validateLogin, validateAccount, validateUpdateAccount, validateAuth } from "./middlewares";

const router = Router();


router.get('/accounts/', validateAuth, accountsController.getAccounts);
router.get('/accounts/:id', validateAuth, accountsController.getAccount);
router.post('/accounts/', validateAccount, accountsController.addAccount);
router.patch('/accounts/:id', validateAuth, validateUpdateAccount, accountsController.setAccount);
router.post('/accounts/login', validateLogin, accountsController.loginAccount);
router.post('/accounts/logout', validateAuth, accountsController.logoutAccount);


export default router;