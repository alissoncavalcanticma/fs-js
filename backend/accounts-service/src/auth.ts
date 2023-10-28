//to create passwords hash
import bcrypt from 'bcryptjs';

//to create jwt token assimetrics
import jwt from 'jsonwebtoken';


// password hash
function hashPassword(password: string){
    return bcrypt.hashSync(password, 10);
}

function comparePassword(password: string, hashPassword: string){
    return bcrypt.compareSync(password, hashPassword);
}

//json web tokens
function sign(){
    
}



export default {hashPassword, comparePassword};