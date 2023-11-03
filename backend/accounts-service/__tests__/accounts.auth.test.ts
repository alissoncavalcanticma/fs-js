import supertest from "supertest";
import app from "../src/app";
//import global for @types jest
import { describe, expect, it, beforeAll, afterAll } from '@jest/globals';

//import { beforeEach } from "node:test";

//import functions repository
import repository from "../src/models/accountRepository";
import { IAccount } from "../src/models/account";

//constant's for test
const testName = 'jestTest';
const testEmail = 'jestTest@gmail.com';
const testPassword = '123456';
const hashPassword = '$2a$10$m31vwe9khOWgI527g7s/o.2sy9vnFUAKJSuiaRasxD1Iui1z69/v6';
const testDomain = 'gmail.com'

//Data input for tests
beforeAll(async () => {
    const testAccount: IAccount = {
        name: testName,
        email: testEmail,
        password: hashPassword,
        domain: testDomain
    }

    const result = await repository.add(testAccount);
    console.log(`beforeAll: ${result}`);
});

// Data delete for tests
afterAll(async () => {
    const result = await repository.removeByEmail(testEmail);

    console.log(`afterAll: ${result}`);
});



describe('Testando rodas de autenticação', () => {



    it('POST /accounts/login - 200 OK', async() =>{
        
        //testing
        const payload = {
            email: testEmail,
            password: testPassword
        }

        const resultado = await supertest(app)
            .post('/accounts/login')
            .send(payload)

        expect(resultado.status).toEqual(200);
        expect(resultado.body.token).toBeTruthy();
        expect(resultado.body.auth).toBeTruthy();
    });



    it('POST /accounts/login - 422 OK', async() =>{
        const payload = {
            email: testEmail,
            password: 'abc'
        }

        const resultado = await supertest(app)
            .post('/accounts/login')
            .send(payload)

        expect(resultado.status).toEqual(422);
    });



    it('POST /accounts/login - 401 OK', async() =>{
        const payload = {
            email: testEmail,
            password: '123568'
        }

        const resultado = await supertest(app)
            .post('/accounts/login')
            .send(payload)

        expect(resultado.status).toEqual(401);
    });



    it('POST /accounts/logout - 200 OK', async() =>{
        
        const resultado = await supertest(app)
            .post('/accounts/logout')
            .send()

        expect(resultado.status).toEqual(200);
    });


});