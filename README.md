# node-cpf-blacklist
 
# Repositório do Github
 https://github.com/JoaoWesley/node-cpf-blacklist

# Docker
## Executar aplicação
 - Estando dentro da pasta do projeto execute o comando: `docker-compose up` 
 - Após isso a aplicação estará disponível no endereço: http://localhost:3000

### Linter
 - Execute o comando `npm run lint` para executar o linter em todo o código

### Tests
  - Execute o comando `npm run test` para executar os testes na aplicação.

# Dependências
## Infraestrutura
- docker-ce stable
- docker-compose

## Backend
- NodeJS: JavaScript runtime
- Express: Framework web
- Apidoc: Documentacão da api
- Body-parser: Interagir com body das requsições
- Node-cpf-cnpj: Validar CPF
- Moment: Manipulação de data e hora
- Nodemon: Realizar reload automático
- Sequelize: ORM
- Sqlite3: Driver de database

## Front-end
- Ejs: Template Engine
- Material design lite: Template frontend
- Vuejs: Framework progressivo
- Vue Mask: Plugin de máscara para vuejs
- Sweetalert: Alerta personalizados em javaScript

## Tests
- Mocha: Framework de test para javascript
- Chai: Biblioteca para realizar asserção
- Chai-http: Testes de integração HTTP


# Padrão de código:
- Javascript standard com ESLINT

# Boas práticas
- ESLint(Airbnb): Ferramenta utilizada para encontrar e corrigir divergências no código com relação as boas práticas de codificacão javascript.

# Aplicação web

Existe duas páginas para que o usuário possa estar interagindo com a aplicação

## URLs
  - http://localhost:3000/ - Página para consultar, adicionar e remover CPF da blacklist.

  - http://localhost:3000/status - Página que fornece informações sobre o status da aplicação como: uptime(Tempo decorrido desde o início da aplicação), consumo de memória, quantidade de consultas realizadas, e quantidade de CPFs na blacklist.

# Documentação da API
## URL
 - http://localhost:3000/apidoc