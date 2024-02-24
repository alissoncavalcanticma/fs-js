import request from 'supertest';
import app from './../src/app'
import accountApp from '../../accounts-service/src/app';
import { IContact } from '../src/models/contact';
import repository from '../src/models/contactRepository';
//import global @types for the use before and after functions
import { jest, describe, expect, it, beforeAll, afterAll } from '@jest/globals';
//import '@types/jest';

const testEmail = 'jest@accounts.com';
const testEmail2 = 'jest2@accounts.com';
let jwt : string = '';
let testAccountId : number = 0;
let testContactId: number = 0;

beforeAll(async () => {
    const testAccount = {
        name: 'jest',
        email: testEmail,
        password: 12345,
        domain: 'jest.com'
    }
    
    //Criando conta
    const account = await request(accountApp)
        .post('/accounts/')
        .send(testAccount);
    testAccountId = account.body.id;

    //Autenticando conta

    const result = await request(accountApp)
        .post('/accounts/login')
        .send({
            email: testAccount.email,
            password: testAccount.password
        });
    
    jwt = result.body.token;
})

afterAll(async () => {
  await repository.removeByEmail(testEmail);
  await repository.removeByEmail(testEmail2);
})

describe('Testando rotas do accounts', () => {
  it('GET /accounts/ - Deve retornar statusCode 200', async () => {
    const resultado = await request(app)
      .get('/accounts/')
      .set('x-access-token', jwt);
    
    expect(resultado.status).toEqual(200);
    expect(Array.isArray(resultado.body)).toBeTruthy();
  })

  it('POST /accounts/ - Deve retornar statusCode 201', async () => {
    const payload : IAccount = {
      name: 'jest2',
      email: testEmail2,
      password: '123456',
      domain: 'jest.com'
    }

    const resultado = await request(app)
      .post('/accounts/')
      .send(payload)

    expect(resultado.status).toEqual(201);
    expect(resultado.body.id).toBeTruthy();
  })

  it('POST /accounts/ - Deve retornar statusCode 422', async () => {
    const payload = {
      street: 'rua dos tupis',
      city: 'Gravatai',
      state: 'RS'
    }

    const resultado = await request(app)
      .post('/accounts/')
      .send(payload)

    expect(resultado.status).toEqual(422);
  })

  
  it('PATCH /accounts/:id - Deve retornar statusCode 200', async () => {
    const payload = {
      name: 'Daniel Castro'
    }

    const resultado = await request(app)
      .patch('/accounts/' + testId)
      .send(payload)
      .set('x-access-token', jwt);

    expect(resultado.status).toEqual(200);
    expect(resultado.body.id).toEqual(testId);
    expect(resultado.body.name).toEqual(payload.name);
  })

  it('PATCH /accounts/:id - Deve retornar statusCode 400', async () => {
    const payload = {
      name: 'Daniel Castro'
    }

    const resultado = await request(app)
      .patch('/accounts/abc')
      .send(payload)
      .set('x-access-token', jwt);

    expect(resultado.status).toEqual(400);
  })

  it('PATCH /accounts/:id - Deve retornar statusCode 404', async () => {
    const payload = {
      name: 'Daniel Castro'
    }

    const resultado = await request(app)
      .patch('/accounts/-1')
      .send(payload)
      .set('x-access-token', jwt);

    expect(resultado.status).toEqual(404);
  })
  
  it('GET /accounts/:id - Deve retornar statusCode 200', async () => {
    const resultado = await request(app)
      .get('/accounts/' + testId)
      .set('x-access-token', jwt);
    
    expect(resultado.status).toEqual(200);
    expect(resultado.body.id).toBe(testId);
  })

  
  it('GET /accounts/:id - Deve retornar statusCode 404', async () => {
    const resultado = await request(app)
      .get('/accounts/-1')
      .set('x-access-token', jwt);
    
    expect(resultado.status).toEqual(404);
  })

  it('GET /accounts/:id - Deve retornar statusCode 400', async () => {
    const resultado = await request(app)
      .get('/accounts/abc')
      .set('x-access-token', jwt);
    
    expect(resultado.status).toEqual(400);
  })
  
})