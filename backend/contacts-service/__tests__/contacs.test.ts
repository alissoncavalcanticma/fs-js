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
let testContactId: number = 0;

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
    console.log(`account: ${account.status}`);
    testAccountId = account.body.id;

    //Autenticando conta
    const result = await supertest(accountApp)
        .post('/accounts/login')
        .send({
            email: testAccount.email,
            password: testAccount.password
        });
    console.log(`loginResponse: ${result.status}`);
    console.log(`{
        loginResponse: ${result.status},
        jwt: ${result.body.token}}`
      );
    jwt = result.body.token;

    const testContact = {
      name: 'jest',
      email: testEmail,
      phone: '88998899',
    } as IContact;
    const result2 = await repository.add(testContact, testAccountId);
    console.log(`testContact: ${result2.status}`);
    testContactId = result2.id!;
})

afterAll(async () => {
  
    await repository.removeByEmail(testEmail, testAccountId);

    const deleteResponse = await supertest(accountApp)
    .delete('/accounts/' + testAccountId)
    .set('x-access-token', jwt);
    console.log(`deleteResponse: ${deleteResponse.status}`);

    const logoutResponse = await supertest(accountApp)
        .post('/accounts/logout')
        .set('x-access-token', jwt);
    console.log(`logoutResponde: ${logoutResponse.status}`);
})

describe('Testando rotas do Contacts', () => {
  it('GET /contacts/ - Deve retornar statusCode 200', async () => {
    const resultado = await supertest(app)
      .get('/contacts/')
      .set('x-access-token', jwt);
    
    expect(resultado.status).toEqual(200);
    expect(Array.isArray(resultado.body)).toBeTruthy();
  })

  it('GET /contacts/ - Deve retornar statusCode 401', async () => {
    const resultado = await supertest(app)
      .get('/contacts/');
    
    expect(resultado.status).toEqual(401);
  })


  it('GET /contacts/:id - Deve retornar statusCode 200', async () => {
    const resultado = await supertest(app)
      .get('/contacts/' + testContactId)
      .set('x-access-token', jwt);
    
    expect(resultado.status).toEqual(200);
    expect(resultado.body.id).toEqual(testContactId);
  })

  it('GET /contacts/:id - Deve retornar statusCode 404', async () => {
    const resultado = await supertest(app)
      .get('/contacts/-1')
      .set('x-access-token', jwt);
    
    expect(resultado.status).toEqual(404);
  })

  it('GET /contacts/:id - Deve retornar statusCode 400', async () => {
    const resultado = await supertest(app)
      .get('/contacts/abc')
      .set('x-access-token', jwt);
    
    expect(resultado.status).toEqual(400);
  })

  it('GET /contacts/:id - Deve retornar statusCode 401', async () => {
    const resultado = await supertest(app)
      .get('/contacts/abc');
    
    expect(resultado.status).toEqual(401);
  })

  it('POST /contacts/ - Deve retornar statusCode 201', async () => {
    
    const testContac = {
      name: 'jest2',
      email: testEmail2,
      phone: '88998899',
    } as IContact;
    
    const resultado = await supertest(app)
      .post('/contacts/')
      .set('x-access-token', jwt)
      .send(testContac);
    
    expect(resultado.status).toEqual(201);
  })


})