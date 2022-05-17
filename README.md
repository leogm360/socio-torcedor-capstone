# Documentação da API Sócio-Torcedor
API desenvolvida para cadastro e gerenciamento de usuários de programa de sócio torcedor de um clube de futebol.

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Diagrama ER](#2-diagrama-er)
- [Início Rápido](#3-início-rápido)
    - [Instalando Dependências](#31-instalando-dependências)
    - [Variáveis de Ambiente](#32-variáveis-de-ambiente)
    - [Migrations](#33-migrations)
- [Autenticação](#4-autenticação)
- [Endpoints](#5-endpoints)
- [Testes](#6-testes)
## 1. Visão Geral

API backend construída para permitir gerenciamento de usuários, planos de sócio torcedor e benefícios oferecidos.

Algumas das tecnologias usadas:

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)

URL base da aplicação:
*************INSERIR URL***************

---

## 2. Diagrama ER
[ Voltar para o topo ](#tabela-de-conteúdos)


Diagrama ER da API definindo bem as relações entre as tabelas do banco de dados.



## 3. Início Rápido
[ Voltar para o topo ](#tabela-de-conteúdos)


### 3.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```
yarn
```

### 3.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:
```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

### 3.3. Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts
```

---

## 4. Autenticação
[ Voltar para o topo ](#tabela-de-conteúdos)

---

## 5. Endpoints
[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [Users](#1-users)
    - [POST - /users](#11-criação-de-usuário)
    - [POST - /users/login](#12-login-de-usuário)
	- [GET - /users/](#13-listar-todos-usuários)
	- [GET - /users/:user_id](#14-listar-usuário-por-id)
	- [GET - /users/me](#15-listar-próprio-usuário)
	- [PATCH - /users/:user_id](#16-atualizar-usuário-por-id)
	- [PATCH - /users/me](#17-atualizar-próprio-usuário)
	- [DELETE - /users/:user_id](#18-deletar-usuário-por-id)
	- [DELETE - /users/me](#19-deletar-próprio-usuário)
- [Partnerships](#2-partnerships)
- [Rewards](#3-rewards)

---

## 1. **Users**
[ Voltar para os Endpoints ](#5-endpoints)

O objeto User é definido como:

| Campo         | Tipo   | Descrição                                       |
| --------------|--------|-------------------------------------------------|
| id            | string | Identificador único do usuário                  |
| name          | string | O nome do usuário.                              |
| username      | string | O username do usuário                           |
| password      | string | A senha de acesso do usuário                    |
| age           | number | A idade do usuário                              |
| phone         | integer| O telefone do usuário                           |
| gender        | integer| O sexo do usuário                               |
| isAdm         | boolean| Define se um usuário é Administrador ou não     |
| created_at    | date   | Data de criação do usuário                      |
| updated_at    | date   | Data de atualização do usuário                  |
| address_id    | number | Referência ao endereço na tabelas address       |
| partnership_id| boolean| Referência ao plano na tabelas partnerships     |



### Endpoints

| Método   | Rota       | Descrição                               |
|----------|------------|-----------------------------------------|
| POST     | /users     | Criação de um usuário.                  |
| POST     | /users/login     | Faz login para acesso às rotas protegidas
| GET      | /users     | Lista todos os usuários                 |
| GET      | /users/:user_id     | Lista um único usuário pelo seu ID
| GET      | /users/me  | Lista o próprio usuário que está logado
| PATCH    | /users/:user_id     | Atualiza os dados de um único usuário
| PATCH    | /users/me     | Atualiza os dados do próprio usuário que está logado
| DELETE   | /users/:user_id     | Deleta um único usuário
| DELETE   | /users/me     | Deleta o próprio usuário logado


---

### 1.1. **Criação de Usuário**

[ Voltar para os Endpoints ](#5-endpoints)

### `/users`

### Exemplo de Request:
```
POST /users
Host: http://suaapi.com/v1**************
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"name": "Leonardo Moraes",
	"user_name": "leogm360",
	"password": "123456789",
	"age": 20,
	"gender": "Masculino",
	"phone": "99123456789",
	"address":{
    "zip_code":"12345678",
    "street": "Rua sete de setembro",
    "number": 26,
    "complement": "Prédio",
    "city": "Rio de Janeiro",
    "state": "RJ",
    "country": "Brasil"  
  } 
	"is_adm": true,
	"partnership": 1,
}
```

### Schema de Validação com Yup:
```javascript

*****EXEMPLO*****
name: yup
        .string()
	.required()
	.transform((value, originalValue) => { 
		return titlelify(originalValue) 
	}),
email: yup
        .string()
	.email()
	.required()
	.transform((value, originalValue) => { 
		return originalValue.toLowerCase() 
	}),
password: yup
        .string()
	.required()
	.transform((value, originalValue) => { 
		return bcrypt.hashSync(originalValue, 10) 
	}),
isAdm: yup
        .boolean()
	.required(),
```
OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:
```
201 Created
```

```json
{
	"id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
	"name": "Leonardo Moraes",
	"user_name": "leogm360",
	"email": "leogm360@gmail.com",
  "age": 20,
  "gender": "Masculino",
  "phone": "99123456789",
  "address":{
    "zip_code":"12345678",
    "street": "Rua sete de setembro",
    "number": 26,
    "complement": "Prédio",
    "city": "Rio de Janeiro",
    "state": "RJ",
    "country": "Brasil"  
  } 
	"is_adm": true,
	"partnership": 1,
  "created_at": "2022-05-15 16:29:51.350149",
  "updated_at": "2022-05-15 16:29:51.350149"
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 409 Conflict   | Email already registered. |

---

### 1.2. **Listando Usuários**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users`

### Exemplo de Request:
```
GET /users
Host: http://suaapi.com/v1
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
[
	{
		"id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
		"name": "Eduardo",
		"email": "edu@mail.com",
		"isAdm": true
	}
]
```

### Possíveis Erros:
Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 1.3. **Listar Usuário por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users/:user_id`

### Exemplo de Request:
```
GET /users/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: http://suaapi.com/v1
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| user_id     | string      | Identificador único do usuário (User) |

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
{
	"id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
	"name": "Eduardo",
	"email": "edu@mail.com",
	"isAdm": true
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found   | User not found. |

---

## 2. **Partnerships**

---

## 3. **Rewards**

---

## 6. Testes
[ Voltar para o topo ](#tabela-de-conteúdos)
