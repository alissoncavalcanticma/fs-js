//lib para teste de request (teste de integração)
import supertest from 'supertest';
import app from '../src/app';
import {Response} from 'express';

describe('Testando rotas do Account', () => {
    
    it('POST /accounts/ - Deve retornar statusCode 201', async () => {
        const payload = {
            id: 1,
            name: 'Alisson',
            email: 'alisson@alisson.com',
            password: '245234',
            status: 100
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