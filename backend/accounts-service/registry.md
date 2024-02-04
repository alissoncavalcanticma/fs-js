# Desenvolvimento
##### Dependências:

`npm i express helmet dotenv-safe` // Instalando dependências
`npm i -g nodemon` // configurar script no package.json
`npm i joi` // para validação de esquema
`npm i sequelize mysql2` // Sequelize
`npm i bcryptjs` // bcryptjs para senha hash

//Segurança

`npm i jsonwebtoken`


##### Types da Dependências

`npm i -D @types/node @types/express @types/joi @types/validator @types/jsonwebtoken`

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


###### For using jest types in your code, should be import the declaration under to force function identification:
> "import '@types/jest';" 

###### For using environment variables in jest tests, should be uncomment in jest.config.js setupfiles[] and include "dotenv/config":

>     setupFiles: ["dotenv/config"],

### Criação de Keys RSA

##### Site de apoio:

`https://www.csfieldguide.org.nz/en/interactives/rsa-key-generator/`

-- KeySize: 2048 bits
-- FormatScheme: PKCS #1 (base64)




<br><br>===========================
### Configurações de import de módulos (EX: "__commons__") que foram realizadas:

Inclusão de 2 novos pacotes:

`npm i ts-node tsconfig-paths`

/*
tsconfig-paths é referente à configuração "paths" do tsconfig.json, que serve para mapear arquivos de maneira simplificada, definindo alias. É através dele que podemos usar o import apenas pelo alias, sem necessidade de referenciar todo o caminho

Deve-se fazer algumas configurações no typescript (tsconfig.json) para que funcione:
Ex:

    "baseUrl": ".",                                  /* Specify point "." */
    "paths": {
      "ms-commons/*":["../__commons__/src/*"]
    }, 

Tem que ser usado,  comentando a config do rootDir do tsconfig.json, e descomentando o rootDirs (no plural), que aceita vários diretórios e root.
Ex:

    //"rootDir": "./src/",                               #comentado
    "rootDirs": ["./src/", "../__commons__/src/*"],      #descomentado

*/

OBS: Onde os módulos/functions/etc... do commons forem ser usados, precisam ser registrados na inicialização, na hora de compilar.
Ex: se o accounts-service utiliza algum modulo/function/etc importado do commons, precisa incluir no script de inicialização (package.json) o comando:

`-r tsconfig-paths/register`

e, se caso foi feito algum import de commons, verificar se na nova compilação (pasta /dist), o caminho dos arquivos mudou, e mudar o apontamento para o server:

`./dist/accounts-service/src/server`

e acrescentando "tsc && ts-node" no lugar de "node" no script de inicialização:

`tsc && ts-node`

Ex:

```
  "scripts": {
    "test": "jest",
    "start": "tsc && ts-node -r dotenv/config -r tsconfig-paths/register ./dist/accounts-service/src/server",
    "compile": "tsc && ts-node -r dotenv/config -r tsconfig-paths/register ./dist/accounts-service/src/server",
    "dev": "nodemon -e ts,json --ignore dist --exec \" npm run compile\""
  },
```

<br><br>======================================================================
#### Como inializar typescript quando o tsc --init não funcionar:

Install the typescript package globally by running npm install typescript@latest -g 
or 
use the npx command with the --package flag, e.g. npx --package typescript tsc --init.