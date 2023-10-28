//to create passwords hash
import bcrypt from 'bcryptjs';

//to create jwt token assimetrics
import jwt, { VerifyOptions } from 'jsonwebtoken';

//import fileSystem Module
import fs from 'fs';

//readFileSync for block load flow
const privateKey = fs.readFileSync('./keys/private.key', 'utf8');
const publicKey = fs.readFileSync('./keys/public.key', 'utf8');

//expiration for token JWT
const jwtExpires = parseInt(`${process.env.JWT_EXPIRES}`);
//algorithm for cryptography
const jwtAlgorithm = 'RS256';



// functions for password hash's

function hashPassword(password: string){
    return bcrypt.hashSync(password, 10);
}

function comparePassword(password: string, hashPassword: string){
    return bcrypt.compareSync(password, hashPassword);
}


//function for json web tokens

type Token = { accountId: number };

function sign(accountId: number){
    const token: Token = {accountId};
    return jwt.sign(token, privateKey, {expiresIn: jwtExpires, algorithm: jwtAlgorithm});
}

async function verify(token: string){
    try{
        const decoded: Token = await jwt.verify(token, publicKey, {algorithm: [jwtAlgorithm]} as VerifyOptions) as Token;
        return {accountId: decoded.accountId};
    }catch(e){
        console.log(`Verify: ${e}`);
        return null;
    }
}



export default {hashPassword, comparePassword, sign, verify};