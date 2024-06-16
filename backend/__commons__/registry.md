#### Módulo commons serve para funções e informações compartihadas entre os módulos

# Desenvolvimento
##### Dependências:

<!--* Foram copiados e filtradoos os conteúdos e configurações de account-service, tsconfig.json, package.json, jest.config.js, .gitignore --->
<!--* npm i para instalar as dependências necessárias que incluímos no package.json -->
`npm i` 


##### Módulos que forem usar o "__commons__" devem fazer a configuração abaixo, instalando os pacotes e ajustando o tsconfig.json (Exemplo: account-service)
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

##### Para permitir o acesso direto ou a partir de algum domínio específico, necessário instalar o cors:

`npm i cors --save`
`npm i @types/cors --save-dev`

### import e declare no commons:

```
import cors from 'cors'
...

app.use(cors())


``