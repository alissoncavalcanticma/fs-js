# Desenvolvimento
##### Dependências:

`npm i express helmet dotenv-safe` // Instalando dependências
`npm i -g nodemon` // configurar script no package.json
`npm i joi` // para validação de esquema

##### Types da Dependências

`npm i -D @types/node @types/express @types/joi`

##### Config's

`tsc --init` //Iniciando o TypeScript

# Testes

##### Dependências:

`npm i -D jest supertest ts-jest` // Instalando dependências

##### Types da Dependências

`npm i -D @types/jest @types/supertest`

##### Config's

`npx ts-jest config:init`
`jest --init` //Options: y-y-n-node-y-v8-y

** Include params in jest.config.js:
> preset: 'ts-jest'


** Include param in tsconfig.json to exclude dir tests for the execution:

``
,
  "exclude": ["__tests__"]
``


** Uncomment e edit testMatch in jest.config.js:

```   
testMatch: [
        "**/__tests__/**/*.ts",
],
``` 


** Create __`<rootDir>/__tests__`__ dir for tests;

** Uncomment __"collectCoverage: true,"__;

** Uncomment and edit __`collectCoverageFrom: ['<rootDir>/src/**/*.ts'],`__;

** Uncomment and edit coverageReporters:
```
coverageReporters: [
  "text-summary",
  "lcov",
],
```

Execute Jest Test:

>npm run test 