//lib para teste de request (teste de integração)
import supertest from 'supertest';
import app from '../src/app';
import {Response} from 'express';
//import global for @types jest
import { describe, expect, it } from '@jest/globals';
import { IAccount } from '../src/models/account';

//constant's for test
const testName = 'jestTest';
const testEmail = 'jestTest@gmail.com';
const testPassword = '$2a$10$m31vwe9khOWgI527g7s/o.2sy9vnFUAKJSuiaRasxD1Iui1z69/v6';
const testDomain = 'gmail.com'


describe('Testando rotas do Account', () => {
    
    it('POST /accounts/ - Deve retornar statusCode 201', async () => {
        const payload: IAccount = {
            name: testName,
            email: testEmail,
            password: testPassword,
            status: 100,
            domain: testDomain
        }

        //instancia variável que recebe a chamada do supertest no post accounts do app.ts
        const resultado = await supertest(app)
            .post('/accounts/')
            .send(payload)

        expect(resultado.status).toEqual(201);
        expect(resultado.body.id).toBe(1);
    });

    it('POST /accounts/ - Deve retornar statusCode 422', async () => {
        const payload = {
            "id": 1,
            "nome": 'Alisson',
            "e-mail": 'alisson@alisson.com',
        }

        //instancia variável que recebe a chamada do supertest no post accounts do app.ts
        const resultado = await supertest(app)
            .post('/accounts/')
            .send(payload)

        expect(resultado.status).toEqual(422);
    });

    it('PATCH /accounts/:id - Deve retornar statusCode 200', async () => {
        const payload = {
            name: 'Alisson',
            email: 'alisson@alisson.com',
            password: '245234'
        }

        //instancia variável que recebe a chamada do supertest no post accounts do app.ts
        const resultado = await supertest(app)
            .patch('/accounts/1')
            .send(payload)

        expect(resultado.status).toEqual(200);
        expect(resultado.body.id).toBe(1);
    });


    it('PATCH /accounts/:id - Deve retornar statusCode 400', async () => {
        const payload = {
            name: 'Alisson',
            email: 'alisson@alisson.com',
            password: '245234'
        }

        //instancia variável que recebe a chamada do supertest no post accounts do app.ts
        const resultado = await supertest(app)
            .patch('/accounts/abs')
            .send(payload)

        expect(resultado.status).toEqual(400);
    });

    it('PATCH /accounts/:id - Deve retornar statusCode 404', async () => {
        const payload = {
            name: 'Alisson',
            email: 'alisson@alisson.com',
            password: '245234'
        }

        //instancia variável que recebe a chamada do supertest no post accounts do app.ts
        const resultado = await supertest(app)
            .patch('/accounts/-1')
            .send(payload)

        expect(resultado.status).toEqual(404);
    });


    it('GET /accounts/ - Deve retornar statusCode 200', async () => {
        const resultado = await supertest(app)
                .get('/accounts');

        expect(resultado.status).toEqual(200);
        expect(Array.isArray(resultado.body)).toBeTruthy();
    })

    it('GET /accounts/:id - Deve retornar statusCode 200', async () => {
        const resultado = await supertest(app)
                .get('/accounts/1');

        expect(resultado.status).toEqual(200);
        expect(resultado.body.id).toBe(1);
    })

    it('GET /accounts/:id - Deve retornar statusCode 404', async () => {
        const resultado = await supertest(app)
                .get('/accounts/2');

        expect(resultado.status).toEqual(404);
    })

    it('GET /accounts/:id - Deve retornar statusCode 400', async () => {
        const resultado = await supertest(app)
                .get('/accounts/string');

        expect(resultado.status).toEqual(400);
    })
})