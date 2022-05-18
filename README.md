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
	- [GET - /users/me](#15-listar-próprio-usuário-logado)
	- [PATCH - /users/:user_id](#16-atualizar-usuário-por-id)
	- [PATCH - /users/me](#17-atualizar-próprio-usuário-logado)
	- [DELETE - /users/:user_id](#18-deletar-usuário-por-id)
	- [DELETE - /users/me](#19-deletar-próprio-usuário-logado)
	
- [Partnerships](#2-partnerships)
	- [POST - /partnerships](#21-criação-de-plano)
	- [GET - /partnerships/](#22-listar-todos-planos)
	- [GET - /partnerships/:partnership_id](#23-listar-plano-por-id)
	- [GET - /partnerships/:partnership_id/rewards](#24-listar-benefícios-de-plano-por-id)
	- [PATCH - /partnerships/:partnership_id](#25-atualizar-plano-por-id)
	- [DELETE - /partnerships/:partnership_id](#26-deletar-plano-por-id) 
	
- [Rewards](#3-rewards)
 	- [POST - /rewards](#31-criação-de-benefício)
	- [GET - /rewards/](#32-listar-todos-benefícios)
	- [GET - /rewards/:reward_id](#33-listar-benefício-por-id)
	- [PATCH - /rewards/:reward_id](#34-atualizar-benefício-por-id)
	- [DELETE - /rewards/:reward_id](#35-deletar-benefício-por-id) 

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
| partnership_id| number | Referência ao plano na tabelas partnerships     |



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
	"user_name": "leo360",
	"email": "leonardo@email.com",
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
    "country": "Brasil",
    "created_at": "2022-05-15 16:29:51.350149",
    "updated_at": "2022-05-15 16:29:51.350149"
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
| 409 Conflict   | Conflict, resource already registered. |

---

### 1.2. **Login de usuário**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users`

### Exemplo de Request:
```
GET /users/login
Host: 
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"user_name": "leo360",
	"password": "123456789",
}
ou
{
	"email": "leonardo@email.com",
	"password": "123456789",
}
```

### Exemplo de Response:
```
200 OK
```
```json
	{
		"message": "User logged in.",
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
	}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found   | Resource not found. |
| 401 Unauthorized| User/password is invalid. |


---

### 1.3. **Listar todos usuários**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users/`

### Exemplo de Request:
```
GET /users
Host: **********
Authorization: token, isAdm
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
  "name": "Leonardo Moraes",
  "user_name": "leo360",
  "email": "leonardo@email.com",
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
    "country": "Brasil",
    "created_at": "2022-05-15 16:29:51.350149",
    "updated_at": "2022-05-15 16:29:51.350149"
  } 
  "is_adm": true,
  "partnership": 1,
  "created_at": "2022-05-15 16:29:51.350149",
  "updated_at": "2022-05-15 16:29:51.350149"
  }
]
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 403 Forbidden   | User must be an admin to access this resource. |


---

### 1.4. **Listar Usuário por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users/:user_id`

### Exemplo de Request:
```
GET /users/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: **********
Authorization: token, isAdm
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
  "name": "Leonardo Moraes",
  "user_name": "leo360",
  "email": "leonardo@email.com",
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
    "country": "Brasil",
    "created_at": "2022-05-15 16:29:51.350149",
    "updated_at": "2022-05-15 16:29:51.350149"
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
| 403 Forbidden   | User must be an admin to access this resource. |
| 404 Not Found   | User not found. |

---

### 1.5. **Listar próprio usuário logado**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users/me`

### Exemplo de Request:
```
GET /users/me
Host: **********
Authorization: token
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| header      | string      | Dado do usuário retirado do jwt(authorization header) |

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
  "name": "Leonardo Moraes",
  "user_name": "leo360",
  "email": "leonardo@email.com",
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
    "country": "Brasil",
    "created_at": "2022-05-15 16:29:51.350149",
    "updated_at": "2022-05-15 16:29:51.350149"
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
| 403 Forbidden   | User cannot access this resource. |

---

### 1.6. **Atualizar usuário por ID**
[ Voltar aos Endpoints ](#5-endpoints)

### `/users/:user_id`

### Exemplo de Request:
```
PATCH /users/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: **********
Authorization: token, isAdm
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| user_id     | string      | Identificador único do usuário (User) |

### Corpo da Requisição:
```json
  "name": "Leonardo Moraes de Almeida",
  "age": 45,
```

### Exemplo de Response:
```
200 OK
```
```json
  {
  "id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
  "name": "Leonardo Moraes de Almeida",
  "user_name": "leo360",
  "email": "leonardo@email.com",
  "age": 45,
  "gender": "Masculino",
  "phone": "99123456789",
  "address":{
    "zip_code":"12345678",
    "street": "Rua sete de setembro",
    "number": 26,
    "complement": "Prédio",
    "city": "Rio de Janeiro",
    "state": "RJ",
    "country": "Brasil",
    "created_at": "2022-05-15 16:29:51.350149",
    "updated_at": "2022-05-15 16:29:51.350149"
  } 
  "is_adm": true,
  "partnership": 1,
  "created_at": "2022-05-15 16:29:51.350149",
  "updated_at": "2022-05-25 18:20:21.305144"
  }
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 403 Forbidden   | User cannot access this resource. 				   |
| 404 Not Found   | User not found. 						   |
| 400 Bad Request | Requisition body must have at least one property to be updated |


---

### 1.7. **Atualizar próprio usuário logado**
[ Voltar aos Endpoints ](#5-endpoints)

### `/users/me`

### Exemplo de Request:
```
PATCH /users/me
Host: **********
Authorization: token
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| header      | string      | Dado do usuário retirado do jwt(authorization header) |

### Corpo da Requisição:
```json
  "name": "Leonardo Moraes de Almeida",
  "age": 45,
```

### Exemplo de Response:
```
200 OK
```
```json
  {
  "id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
  "name": "Leonardo Moraes de Almeida",
  "user_name": "leo360",
  "email": "leonardo@email.com",
  "age": 45,
  "gender": "Masculino",
  "phone": "99123456789",
  "address":{
    "zip_code":"12345678",
    "street": "Rua sete de setembro",
    "number": 26,
    "complement": "Prédio",
    "city": "Rio de Janeiro",
    "state": "RJ",
    "country": "Brasil",
    "created_at": "2022-05-15 16:29:51.350149",
    "updated_at": "2022-05-15 16:29:51.350149"
  } 
  "is_adm": true,
  "partnership": 1,
  "created_at": "2022-05-15 16:29:51.350149",
  "updated_at": "2022-05-25 18:20:21.305144"
  }
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 403 Forbidden   | User cannot access this resource. 				   |
| 404 Not Found   | User not found. 						   |
| 400 Bad Request | Requisition body must have at least one property to be updated |


---

### 1.8. **Deletar usuário por ID**
[ Voltar aos Endpoints ](#5-endpoints)

### `/users/:user_id`

### Exemplo de Request:
```
DELETE /users/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: **********
Authorization: token, isAdm
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| header      | string      | Dado do usuário retirado do jwt(authorization header) |

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
204 OK
```
```json
Vazio
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 403 Forbidden   | User cannot access this resource.  |
| 404 Not Found   | User not found. 		       |

---

### 1.9. **Deletar próprio usuário logado**
[ Voltar aos Endpoints ](#5-endpoints)

### `/users/me`

### Exemplo de Request:
```
DELETE /users/me
Host: **********
Authorization: token, isAdm
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
204 OK
```
```json
Vazio
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 403 Forbidden   | User cannot access this resource.  |

---

## 2. **Partnerships**
[ Voltar para os Endpoints ](#5-endpoints)

O objeto Partnership é definido como:

| Campo         | Tipo   | Descrição                                       |
| --------------|--------|-------------------------------------------------|
| id            | string | Identificador único do plano                    |
| name          | string | O nome do plano                                 |
| price         | number | O preço do plano                                |
| created_at    | date   | Data de criação do plano                        |
| updated_at    | date   | Data de atualização do plano                    |
| rewards_id    | number | Referência ao benefício na tabelas rewards      |



### Endpoints

| Método   | Rota          | Descrição                               |
|----------|---------------|-----------------------------------------|
| POST     | /partnerships 			| Criação de um plano                     
| GET      | /partnerships     			| Lista todos os planos                 
| GET      | /partnerships/:partnership_id      | Lista um único plano pelo seu ID
| GET      | /partnerships/:partnership_id/rewards  | Lista os benefícios de um plano por seu ID
| PATCH    | /partnerships/:partnership_id      | Atualiza os dados de um único plano
| DELETE   | /partnerships/:partnership_id      | Deleta um único plano


---

### 2.1. **Criação de Plano**
### 2.2. **Listar todos planos**
### 2.3. **Listar Plano por ID**
### 2.4. **Listar benefícios de Plano por ID**
### 2.5. **Atualizar Plano por ID**
### 2.6. **Deletar Plano por ID**

---

## 3. **Rewards**
[ Voltar para os Endpoints ](#5-endpoints)
### 3.1. **Criação de Benefício**
### 3.2. **Listar todos Benefícios**
### 3.3. **Listar Benefício por ID**
### 3.4. **Atualizar Benefício por ID**
### 3.5. **Deletar Benefício por ID**

---

## 6. Testes
[ Voltar para o topo ](#tabela-de-conteúdos)
