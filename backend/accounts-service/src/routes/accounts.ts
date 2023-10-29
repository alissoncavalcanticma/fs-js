import { Router } from "express";
import accountsController from "../controllers/accounts";
import { validateLoginSchema, validateAccountSchema, validateUpdateAccountSchema, validateAuth } from "./middlewares";

const router = Router();


router.get('/accounts/', validateAuth, accountsController.getAccounts);
router.get('/accounts/:id', validateAuth, accountsController.getAccount);
router.post('/accounts/', validateAccountSchema, accountsController.addAccount);
router.patch('/accounts/:id', validateAuth, validateUpdateAccountSchema, accountsController.setAccount);
router.post('/accounts/login', validateLoginSchema, accountsController.loginAccount);
router.post('/accounts/logout', validateAuth, accountsController.logoutAccount);


export default router;