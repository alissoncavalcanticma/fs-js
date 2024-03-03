import { Response } from "express";
import { Token } from "../api/auth";

function getToken(res: Response){
    //Define o formato do payload como type Token
    const payload = res.locals.payload as Token;
    if(!payload || !payload.accountId) return res.status(401).end;
    else return payload;
}

export default {getToken};