import supertest from 'supertest';
import app from './../src/app'
import accountApp from '../../accounts-service/src/app';
import { IContact } from '../src/models/contact';
import repository from '../src/models/contactRepository';
//import global jest types for the use functions of Jest
import { jest, describe, expect, it, beforeAll, afterAll } from '@jest/globals';
//import '@types/jest';

const testEmail = 'jest@accounts.com';
const testEmail2 = 'jest2@accounts.com';
let jwt: string = '';
let testAccountId: number = 0;

beforeAll(async () => {
    const testAccount = {
        name: 'jest',
        email: testEmail,
        password: '123456',
        domain: 'jest.com'
    }
    
    //Criando conta
    const account = await supertest(accountApp)
        .post('/accounts/')
        .send(testAccount);
    testAccountId = account.body.id;

    //Autenticando conta
    const result = await supertest(accountApp)
        .post('/accounts/login')
        .send({
            email: testAccount.email,
            password: testAccount.password
        });
    //console.log(`loginResponse: ${result.status}`);
    console.log(`{
        loginResponse: ${result.status},
        jwt: ${result.body.token}}`
      );
    jwt = result.body.token;
})

afterAll(async () => {
  
    await supertest(accountApp)
        .post('/accounts/logout')
        .send();

    await supertest(accountApp)
        .delete('/accounts/' + testAccountId)
        .send();
})

describe('Testando rotas do Contacts', () => {
  it('GET /contacts/ - Deve retornar statusCode 200', async () => {
    const resultado = await supertest(app)
      .get('/contacts/')
      .set('x-access-token', jwt);
    
    expect(resultado.status).toEqual(200);
    expect(Array.isArray(resultado.body)).toBeTruthy();
  })
})