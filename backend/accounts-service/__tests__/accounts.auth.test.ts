import supertest from "supertest";
import app from "../src/app";
//import global for @types jest
//import { describe, expect, it } from '@jest/globals';

//import { beforeEach } from "node:test";
//import force for types/jest
import '@types/jest';

//import functions repository
import repository from "../src/models/accountRepository";
import { IAccount } from "../src/models/account";


//Data input for tests
beforeAll(async () => {
    const testAccount: IAccount = {
        name: 'jestTest',
        email: 'jestTest@gmail.com',
        password: '12345',
        domain: 'gmail.com'
    }

    const result = await repository.add(testAccount);
});


describe('Testando rodas de autenticação', () => {

    it('POST /accounts/login - 200 OK', async() =>{
        //Mockin data
        const newAccount = {
            id: 1,
            name: 'Alisson',
            email: 'alisson@alisson.com',
            password: '123456'
        }

        await supertest(app)
            .post('/accounts/')
            .send(newAccount)
        
        //testing

        const payload = {
            email: 'alisson@alisson.com',
            password: '123456'
        }

        const resultado = await supertest(app)
            .post('/accounts/login')
            .send(payload)

        expect(resultado.status).toEqual(200);
        expect(resultado.body.token).toBeTruthy();
        expect(resultado.body.auth).toBeTruthy();
    });

    it('POST /accounts/login - 401 OK', async() =>{
        const payload = {
            email: 'alisson@123.com',
            password: '123456'
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