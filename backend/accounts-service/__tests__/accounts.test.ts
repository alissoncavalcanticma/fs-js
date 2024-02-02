//lib para teste de request (teste de integração)
import supertest from 'supertest';
import app from '../src/app';
import {Response} from 'express';
//import global for @types jest
import { describe, expect, it, beforeAll, afterAll } from '@jest/globals';
import repository from '../src/models/accountRepository';
import { IAccount } from '../src/models/account';
import auth from '../src/auth';
import { randomInt } from 'crypto';


//constant's for test'
const testName = 'jestTest';
const testEmail = 'jestTest@gmail.com';
const testEmailPost = 'jestTest2@gmail.com';
const testPassword = '123456';
const hashPassword = '$2a$10$m31vwe9khOWgI527g7s/o.2sy9vnFUAKJSuiaRasxD1Iui1z69/v6';
const testDomain = 'gmail.com'
let jwt: string;
let result: IAccount;



//Data input for tests
beforeAll(async () => {
    const testAccount: IAccount = {
        name: testName,
        email: testEmail,
        password: hashPassword,
        domain: testDomain
    }

    result = await repository.add(testAccount);
    jwt = auth.sign(result.id!);
    console.log(`beforeAll: ${result}`);
});

// Data delete for tests
afterAll(async () => {
    await repository.removeByEmail(testEmail);
    await repository.removeByEmail(testEmailPost);
});



describe('Testando rotas do Account', () => {
    

    it('POST /accounts/ - Deve retornar statusCode 201', async () => {
        const payload: IAccount = {
            name: testName,
            email: testEmailPost,
            password: testPassword,
            status: 100,
            domain: testDomain
        }

        //instancia variável que recebe a chamada do supertest no post accounts do app.ts
        const resultado = await supertest(app)
            .post('/accounts/')
            .send(payload)

        expect(resultado.status).toEqual(201);
        expect(resultado.body.id).toBeTruthy();

        //console.log(resultado.body.id);
    });



    it('POST /accounts/ - Deve retornar statusCode 422', async () => {
        const payload = {
            id: 1,
            nome: testName,
            "e-mail": testEmail
        }

        //instancia variável que recebe a chamada do supertest no post accounts do app.ts
        const resultado = await supertest(app)
            .post('/accounts/')
            .send(payload)

        expect(resultado.status).toEqual(422);
    });




    it('PATCH /accounts/:id - Deve retornar statusCode 200', async () => {
        const payload = {
            name: testName,
            password: testPassword,
            status: 100,
            domain: testDomain
        }

        //instancia variável que recebe a chamada do supertest no post accounts do app.ts
        const resultado = await supertest(app)
            .patch(`/accounts/${result.id}`)
            .set('x-access-token', jwt)
            .send(payload)

        expect(resultado.status).toEqual(200);
        expect(resultado.body.id).toBeTruthy();
    });

    


    it('PATCH /accounts/:id - Deve retornar statusCode 400', async () => {
        const payload = {
            name: testName,
            password: testPassword,
            status: 102,
            domain: testDomain
        }

        //instancia variável que recebe a chamada do supertest no post accounts do app.ts
        const resultado = await supertest(app)
            .patch('/accounts/abs')
            .set('x-access-token', jwt)
            .send(payload)

        expect(resultado.status).toEqual(400);
    });




    it('PATCH /accounts/:id - Deve retornar statusCode 404', async () => {
        const payload = {
            name: testName,
            password: testPassword,
            status: 100,
            domain: testDomain
        }

        //instancia variável que recebe a chamada do supertest no post accounts do app.ts
        const resultado = await supertest(app)
            .patch('/accounts/-1')
            .set('x-access-token', jwt)
            .send(payload)

        expect(resultado.status).toEqual(404);
    });



    it('GET /accounts/ - Deve retornar statusCode 200', async () => {
        const resultado = await supertest(app)
                .get('/accounts')
                .set('x-access-token', jwt);

        expect(resultado.status).toEqual(200);
        expect(Array.isArray(resultado.body)).toBeTruthy();
    })

    it('GET /accounts/:id - Deve retornar statusCode 200', async () => {
        const resultado = await supertest(app)
                .get('/accounts/'+ result.id)
                .set('x-access-token', jwt);

        expect(resultado.status).toEqual(200);
        expect(resultado.body.id).toBe(result.id);
    })


    it('GET /accounts/:id - Deve retornar statusCode 404', async () => {
        const resultado = await supertest(app)
                .get('/accounts/3330')
                .set('x-access-token', jwt);

        expect(resultado.status).toEqual(404);
    })

    it('GET /accounts/:id - Deve retornar statusCode 400', async () => {
        const resultado = await supertest(app)
                .get('/accounts/string')
                .set('x-access-token', jwt);

        expect(resultado.status).toEqual(400);
    })


})