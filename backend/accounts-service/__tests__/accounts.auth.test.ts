import supertest from "supertest";
import app from "../src/app";
//import global for @types jest
import { describe, expect, it, beforeAll, afterAll } from '@jest/globals';

//import { beforeEach } from "node:test";

//import functions repository
import repository from "../src/models/accountRepository";
import { IAccount } from "../src/models/account";
import auth from "../src/auth";

//constant's for test
const mockAccount = {
    name: 'jestAuthTest',
    email: 'jestAuthTest@gmail.com',
    password: '123456',
    domain: 'gmail.com',
    hashPassword: '$2a$10$m31vwe9khOWgI527g7s/o.2sy9vnFUAKJSuiaRasxD1Iui1z69/v6'
}

let jwt: string;

//Data input for tests
beforeAll(async () => {
    const testAccount: IAccount = {
        name: mockAccount.name,
        email: mockAccount.email,
        password: mockAccount.hashPassword,
        domain: mockAccount.domain
    }

    const result = await repository.add(testAccount);
    jwt = auth.sign(result.id!);
    console.log(`beforeAll: ${result}`);
});

// Data delete for tests
afterAll(async () => {
    const result = await repository.removeByEmail(mockAccount.email);

    console.log(`afterAll: ${result}`);
});



describe('Testando rodas de autenticação', () => {



    it('POST /accounts/login - 200', async() =>{
        
        //testing
        const payload = {
            email: mockAccount.email,
            password: mockAccount.password
        }

        const resultado = await supertest(app)
            .post('/accounts/login')
            .send(payload)

        expect(resultado.status).toEqual(200);
        expect(resultado.body.token).toBeTruthy();
        expect(resultado.body.auth).toBeTruthy();
    });



    it('POST /accounts/login - 422', async() =>{
        const payload = {
            email: mockAccount.email,
            password: 'abc'
        }

        const resultado = await supertest(app)
            .post('/accounts/login')
            .send(payload)

        expect(resultado.status).toEqual(422);
    });

    it('POST /accounts/login - 400', async() =>{
        const payload = {
            email: mockAccount.email
        }

        const resultado = await supertest(app)
            .post('/accounts/login')
            .send(payload)

        expect(resultado.status).toEqual(400);
    });

    it('POST /accounts/login - 401', async() =>{
        const payload = {
            email: mockAccount.email,
            password: '123568'
        }

        const resultado = await supertest(app)
            .post('/accounts/login')
            .send(payload)

        expect(resultado.status).toEqual(401);
    });



    it('POST /accounts/logout - 200', async() =>{
        
        const resultado = await supertest(app)
            .post('/accounts/logout')
            .send()

        expect(resultado.status).toEqual(200);
    });

    it('GET /accounts/ - 200', async() => {

        const resultado = await supertest(app)
            .get('/accounts/')
            .set('x-access-token', jwt);


        expect(resultado.status).toEqual(200);
        expect(resultado.body).toBeTruthy();
        expect(Array.isArray(resultado.body)).toBeTruthy();
    });


});