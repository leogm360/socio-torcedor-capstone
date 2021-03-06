# Documentação da API Sócio-Torcedor
API desenvolvida para cadastro e gerenciamento de usuários, planos, benefícios e clubes de programa de sócio torcedor.

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
https://socio-torcedor-api-capstone-m4.herokuapp.com/

---

## 2. Diagrama ER
[ Voltar para o topo ](#tabela-de-conteúdos)

![NlV6hp1](https://user-images.githubusercontent.com/89955737/170357216-75f245c7-8998-4044-8d25-67ff2419f413.png)



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

A autenticação será feita através do [endpoint de login](#12-login-de-usuário). O retorno esperado, em caso de sucesso, deverá conter um token JWT.

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
	- [PATCH - /partnerships/:partnership_id](#24-atualizar-plano-por-id)
	- [DELETE - /partnerships/:partnership_id](#25-deletar-plano-por-id) 
	
- [Rewards](#3-rewards)
 	- [POST - /rewards](#31-criação-de-benefício)
	- [GET - /rewards/](#32-listar-todos-benefícios)
	- [GET - /rewards/:reward_id](#33-listar-benefício-por-id)
	- [PATCH - /rewards/:reward_id](#34-atualizar-benefício-por-id)
	- [DELETE - /rewards/:reward_id](#35-deletar-benefício-por-id) 

- [Clubs](#4-clubs)
 	- [POST - /clubs](#41-criação-de-clube)
	- [GET - /clubs/](#42-listar-todos-clubes)
	- [GET - /clubs/:reward_id](#43-listar-clube-por-id)
	- [PATCH - /clubs/:club_id](#44-atualizar-clube-por-id)
	- [DELETE - /clubs/:club_id](#45-deletar-clube-por-id) 

---

## 1. **Users**
[ Voltar para os Endpoints ](#5-endpoints)

O objeto User é definido como:

| Campo         | Tipo   | Descrição                                       |
| --------------|--------|-------------------------------------------------|
| id            | string | Identificador único do usuário                  |
| name          | string | O nome do usuário.                              |
| userName      | string | O username do usuário                           |
| email         | string | O email do usuário                              |
| password      | string | A senha de acesso do usuário                    |
| age           | number | A idade do usuário                              |
| phone         | string | O telefone do usuário                           |
| gender        | string | O sexo do usuário                               |
| isAdm         | boolean| Define se um usuário é Administrador ou não     |
| created_at    | date   | Data de criação do usuário                      |
| updated_at    | date   | Data de atualização do usuário                  |
| address       | object | Objeto contendo endereço do usuário             |
| partnershipId | number | Referência ao plano na tabelas partnerships     |
| clubId        | number | Referência ao clube na tabelas clubs            |




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
Host: https://socio-torcedor-api-capstone-m4.herokuapp.com/
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"name": "Leonardo Moraes",
	"userName": "leogm360",
	  "email": "leonardo@email.com",
	"password": "123456789",
	"age": 32,
	"gender": "Masculino",
	"phone": "99123456789",
	"address": {
	    "zip_code":"12345678",
	    "street": "Rua sete de setembro",
	    "number_house": 26,
	    "complement": "Prédio",
	    "city": "Rio de Janeiro",
	    "state": "RJ",
	    "country": "Brasil"  
	  }, 
	"isAdm": false,
	"partnership": 3,
	"clubId": 2
}
```

### Schema de Validação com Yup:
```javascript

  name: yup.string().required("name is required"),
  userName: yup.string().required("userName is required"),
  email: yup.string().required("email is required"),
  password: yup
    .string()
    .required()
    .min(6, "password must have at least 6 characters")
    .transform((password: string) => bcrypt.hashSync(password, 10)),
  age: yup.number().required("age is required"),
  gender: yup.string().required("gender is required"),
  phone: yup.string().required("phone is required"),
  address: addressSchema,
  clubId: yup.number().required("clubid is required"),
  partnershipId: yup.number().required("partnershipId is required"),
  isAdm: yup.boolean().required("isAdm is required"),
```
OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:
```
201 Created
```

```json
{
	"id": "77c4e27c-68d9-404e-810b-3b63d49ff8d5",
	"name": "Leonardo Moraes",
	"userName": "leogm360",
	"email": "rodrigo@email.com",
	"age": 32,
	"gender": "male",
	"phone": "123456789",
	"isAdm": false,
	"created_at": "2022-05-25T20:46:54.153Z",
	"update_at": "2022-05-25T20:46:54.153Z",
	"address": {
		"id": 68,
		"zip_code": "12345678",
		"street": "Rua sete de setembro",
		"number_house": "26",
		"complement": "Prédio",
		"city": "Rio de Janeiro",
		"state": "RJ",
		"country": "Brasil",
		"created_at": "2022-05-25T20:46:54.153Z",
		"updated_at": "2022-05-25T20:46:54.153Z"
	},
	"partnership": {
		"id": 3,
		"name": "Silverzao",
		"price": 99.9,
		"created_at": "2022-05-25T16:02:59.951Z",
		"update_at": "2022-05-25T16:02:59.951Z",
		"rewards": [
			{
				"id": 3,
				"name": "Desconto ingressos 20",
				"description": "20% de desconto em ingressos",
				"created_at": "2022-05-25T16:02:50.918Z",
				"update_at": "2022-05-25T16:02:50.918Z"
			}
		]
	},
	"club": {
		"id": 2,
		"name": "Fluminense",
		"created_at": "2022-05-25T16:02:08.090Z",
		"update_at": "2022-05-25T16:02:08.090Z"
	}
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 409 Conflict   | Conflict, resource already registered. |
| 400 Bad Request| name is required                       |


---

### 1.2. **Login de usuário**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users`

### Exemplo de Request:
```
GET /users/login
Host: https://socio-torcedor-api-capstone-m4.herokuapp.com/
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"userName": "leo360",
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
		"message": "Authenticated.",
		"userToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
	}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found   | Resource not found. |
| 401 Unauthorized| Unauthorized, user credentials are invalid. |


---

### 1.3. **Listar todos usuários**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users/`

### Exemplo de Request:
```
GET /users
Host: https://socio-torcedor-api-capstone-m4.herokuapp.com/
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
		"id": "670452c8-b349-4b54-b9e4-fff462568103",
		"name": "Leonardo Moraes",
		"userName": "leo36",
		"email": "leonardo@email.com",
		"age": 32,
		"gender": "male",
		"phone": "123456789",
		"isAdm": false,
		"created_at": "2022-05-26T12:59:20.800Z",
		"update_at": "2022-05-26T12:59:20.800Z",
		"address": {
			"id": 70,
			"zip_code": "12345678",
			"street": "Rua sete de setembro",
			"number_house": "26",
			"complement": "Prédio",
			"city": "Rio de Janeiro",
			"state": "RJ",
			"country": "Brasil",
			"created_at": "2022-05-26T12:59:20.800Z",
			"updated_at": "2022-05-26T12:59:20.800Z"
		},
		"partnership": {
			"id": 4,
			"name": "Gold",
			"price": 99.9,
			"created_at": "2022-05-26T12:57:23.240Z",
			"update_at": "2022-05-26T12:57:23.240Z",
			"rewards": [
				{
					"id": 3,
					"name": "Desconto ingressos 20",
					"description": "20% de desconto em ingressos",
					"created_at": "2022-05-25T16:02:50.918Z",
					"update_at": "2022-05-25T16:02:50.918Z"
				}
			]
		},
		"club": {
			"id": 2,
			"name": "Fluminense",
			"created_at": "2022-05-25T16:02:08.090Z",
			"update_at": "2022-05-25T16:02:08.090Z"
		}
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
GET /users/670452c8-b349-4b54-b9e4-fff462568103
Host: https://socio-torcedor-api-capstone-m4.herokuapp.com/
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
	"id": "670452c8-b349-4b54-b9e4-fff462568103",
	"name": "Leonardo Moraes",
	"userName": "leo36",
	"email": "leonardo@email.com",
	"age": 32,
	"gender": "male",
	"phone": "123456789",
	"isAdm": false,
	"created_at": "2022-05-26T12:59:20.800Z",
	"update_at": "2022-05-26T12:59:20.800Z",
	"address": {
		"id": 70,
		"zip_code": "12345678",
		"street": "Rua sete de setembro",
		"number_house": "26",
		"complement": "Prédio",
		"city": "Rio de Janeiro",
		"state": "RJ",
		"country": "Brasil",
		"created_at": "2022-05-26T12:59:20.800Z",
		"updated_at": "2022-05-26T12:59:20.800Z"
	},
	"partnership": {
		"id": 4,
		"name": "Gold",
		"price": 99.9,
		"created_at": "2022-05-26T12:57:23.240Z",
		"update_at": "2022-05-26T12:57:23.240Z",
		"rewards": [
			{
				"id": 3,
				"name": "Desconto ingressos 20",
				"description": "20% de desconto em ingressos",
				"created_at": "2022-05-25T16:02:50.918Z",
				"update_at": "2022-05-25T16:02:50.918Z"
			}
		]
	},
	"club": {
		"id": 2,
		"name": "Fluminense",
		"created_at": "2022-05-25T16:02:08.090Z",
		"update_at": "2022-05-25T16:02:08.090Z"
	}
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 403 Forbidden   | User must be an admin to access this resource. |
| 404 Not Found   | Resource not found. |

---

### 1.5. **Listar próprio usuário logado**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users/me`

### Exemplo de Request:
```
GET /users/me
Host: https://socio-torcedor-api-capstone-m4.herokuapp.com/
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
	"id": "670452c8-b349-4b54-b9e4-fff462568103",
	"name": "Leonardo Moraes",
	"userName": "leo36",
	"email": "leonardo@email.com",
	"age": 32,
	"gender": "male",
	"phone": "123456789",
	"isAdm": false,
	"created_at": "2022-05-26T12:59:20.800Z",
	"update_at": "2022-05-26T12:59:20.800Z",
	"address": {
		"id": 70,
		"zip_code": "12345678",
		"street": "Rua sete de setembro",
		"number_house": "26",
		"complement": "Prédio",
		"city": "Rio de Janeiro",
		"state": "RJ",
		"country": "Brasil",
		"created_at": "2022-05-26T12:59:20.800Z",
		"updated_at": "2022-05-26T12:59:20.800Z"
	},
	"partnership": {
		"id": 4,
		"name": "Gold",
		"price": 99.9,
		"created_at": "2022-05-26T12:57:23.240Z",
		"update_at": "2022-05-26T12:57:23.240Z",
		"rewards": [
			{
				"id": 3,
				"name": "Desconto ingressos 20",
				"description": "20% de desconto em ingressos",
				"created_at": "2022-05-25T16:02:50.918Z",
				"update_at": "2022-05-25T16:02:50.918Z"
			}
		]
	},
	"club": {
		"id": 2,
		"name": "Fluminense",
		"created_at": "2022-05-25T16:02:08.090Z",
		"update_at": "2022-05-25T16:02:08.090Z"
	}
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized   | Unauthorized, authorization token missing/invalid. |

---

### 1.6. **Atualizar usuário por ID**
[ Voltar aos Endpoints ](#5-endpoints)

### `/users/:user_id`

### Exemplo de Request:
```
PATCH /users/670452c8-b349-4b54-b9e4-fff462568103
Host: https://socio-torcedor-api-capstone-m4.herokuapp.com/
Authorization: token, isAdm
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| user_id     | string      | Identificador único do usuário (User) |

### Corpo da Requisição:
```json
{
  "name": "Leonardo Moraes de Almeida",
  "age": 45
}
```

### Exemplo de Response:
```
200 OK
```
```json
  {
	"id": "670452c8-b349-4b54-b9e4-fff462568103",
	"name": "Leonardo Moraes de Almeida",
	"userName": "leo36",
	"email": "leonardo@email.com",
	"age": 45,
	"gender": "male",
	"phone": "123456789",
	"isAdm": false,
	"created_at": "2022-05-26T12:59:20.800Z",
	"update_at": "2022-05-26T12:59:20.800Z",
	"address": {
		"id": 70,
		"zip_code": "12345678",
		"street": "Rua sete de setembro",
		"number_house": "26",
		"complement": "Prédio",
		"city": "Rio de Janeiro",
		"state": "RJ",
		"country": "Brasil",
		"created_at": "2022-05-26T12:59:20.800Z",
		"updated_at": "2022-05-26T12:59:20.800Z"
	},
	"partnership": {
		"id": 4,
		"name": "Gold",
		"price": 99.9,
		"created_at": "2022-05-26T12:57:23.240Z",
		"update_at": "2022-05-26T12:57:23.240Z",
		"rewards": [
			{
				"id": 3,
				"name": "Desconto ingressos 20",
				"description": "20% de desconto em ingressos",
				"created_at": "2022-05-25T16:02:50.918Z",
				"update_at": "2022-05-25T16:02:50.918Z"
			}
		]
	},
	"club": {
		"id": 2,
		"name": "Fluminense",
		"created_at": "2022-05-25T16:02:08.090Z",
		"update_at": "2022-05-25T16:02:08.090Z"
	}
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
Host: https://socio-torcedor-api-capstone-m4.herokuapp.com/
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
  "age": 45
```

### Exemplo de Response:
```
200 OK
```
```json
 {
	"id": "670452c8-b349-4b54-b9e4-fff462568103",
	"name": "Leonardo Moraes de Almeida",
	"userName": "leo36",
	"email": "leonardo@email.com",
	"age": 45,
	"gender": "male",
	"phone": "123456789",
	"isAdm": false,
	"created_at": "2022-05-26T12:59:20.800Z",
	"update_at": "2022-05-26T12:59:20.800Z",
	"address": {
		"id": 70,
		"zip_code": "12345678",
		"street": "Rua sete de setembro",
		"number_house": "26",
		"complement": "Prédio",
		"city": "Rio de Janeiro",
		"state": "RJ",
		"country": "Brasil",
		"created_at": "2022-05-26T12:59:20.800Z",
		"updated_at": "2022-05-26T12:59:20.800Z"
	},
	"partnership": {
		"id": 4,
		"name": "Gold",
		"price": 99.9,
		"created_at": "2022-05-26T12:57:23.240Z",
		"update_at": "2022-05-26T12:57:23.240Z",
		"rewards": [
			{
				"id": 3,
				"name": "Desconto ingressos 20",
				"description": "20% de desconto em ingressos",
				"created_at": "2022-05-25T16:02:50.918Z",
				"update_at": "2022-05-25T16:02:50.918Z"
			}
		]
	},
	"club": {
		"id": 2,
		"name": "Fluminense",
		"created_at": "2022-05-25T16:02:08.090Z",
		"update_at": "2022-05-25T16:02:08.090Z"
	}
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
DELETE /users/670452c8-b349-4b54-b9e4-fff462568103
Host: https://socio-torcedor-api-capstone-m4.herokuapp.com/
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
| 404 Not Found   | Resource not found.		       |

---

### 1.9. **Deletar próprio usuário logado**
[ Voltar aos Endpoints ](#5-endpoints)

### `/users/me`

### Exemplo de Request:
```
DELETE /users/me
Host: https://socio-torcedor-api-capstone-m4.herokuapp.com/
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
| 401 Unauthorized| Unauthorized, authorization token missing/invalid.  |

---

## 2. **Partnerships**
[ Voltar para os Endpoints ](#5-endpoints)

O objeto Partnership é definido como:

| Campo         | Tipo   | Descrição                                       |
| --------------|--------|-------------------------------------------------|
| id            | number | Identificador único do plano                    |
| name          | string | O nome do plano                                 |
| price         | number | O preço do plano                                |
| created_at    | date   | Data de criação do plano                        |
| updated_at    | date   | Data de atualização do plano                    |
| rewards       | array  | array com rewards incluídas no plano            |



### Endpoints

| Método   | Rota          | Descrição                               |
|----------|---------------|-----------------------------------------|
| POST     | /partnerships 			| Criação de um plano                     
| GET      | /partnerships     			| Lista todos os planos                 
| GET      | /partnerships/:partnership_id      | Lista um único plano pelo seu ID
| PATCH    | /partnerships/:partnership_id      | Atualiza os dados de um único plano
| DELETE   | /partnerships/:partnership_id      | Deleta um único plano


---

### 2.1. **Criação de Plano**
[ Voltar para os Endpoints ](#5-endpoints)

### `/partnerships`

### Exemplo de Request:
```
POST /partnerships
Host: https://socio-torcedor-api-capstone-m4.herokuapp.com/
Authorization: token, isAdm
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"name": "Gold"
	"price": 99.90
	"rewards": [3] (optional)
}
```

### Schema de Validação com Yup:
```javascript
	name: yup.string().required("name is required"),
        price: yup.number().required("price is required")
```

### Exemplo de Response:
```
201 Created
```

```json
{
	"id": "1",
	"name": "Gold
	"price": 99.90
	"rewards": [
	  {
	    "id":1,
	    "name": "Prioridade Ingresso 3",
	    "description": "Prioridade na compra de ingressos",
	    "created_at": "2022-05-15 16:29:51.350149",
    	    "updated_at": "2022-05-15 16:29:51.350149"
	   },
	   {
	    "id":2,
	    "name": "VIP 3",
	    "description": "VIP 3 com acesso a assentos cobertos",
	    "created_at": "2022-05-15 16:29:51.350149",
    	    "updated_at": "2022-05-15 16:29:51.350149"
	   },
	   {
	    "id":4,
	    "name": "Acesso Atleta 3",
	    "description": "Acesso com prioridade 3 aos atletas do club",
	    "created_at": "2022-05-15 16:29:51.350149",
    	    "updated_at": "2022-05-15 16:29:51.350149"
	   }	   
	],
	"created_at": "2022-05-15 16:29:51.350149",
    	"updated_at": "2022-05-15 16:29:51.350149"	
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 409 Conflict   | Conflict, resource already registered. |

---

### 2.2. **Listar todos planos**
[ Voltar aos Endpoints ](#5-endpoints)

### `/partnerships/`

### Exemplo de Request:
```
GET /partnerships
Host: https://socio-torcedor-api-capstone-m4.herokuapp.com/
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
  	"id": "1",
	"name": "Gold,
	"price": 99.90,
	"rewards": [
	  {
	    "id":1,
	    "name": "Prioridade Ingresso 3",
	    "description": "Prioridade na compra de ingressos",
	    "created_at": "2022-05-15 16:29:51.350149",
    	    "updated_at": "2022-05-15 16:29:51.350149"
	   },
	   {
	    "id":2,
	    "name": "VIP 3",
	    "description": "VIP 3 com acesso a assentos cobertos",
	    "created_at": "2022-05-15 16:29:51.350149",
    	    "updated_at": "2022-05-15 16:29:51.350149"
	   },
	   {
	    "id":4,
	    "name": "Acesso Atleta 3",
	    "description": "Acesso com prioridade 3 aos atletas do club",
	    "created_at": "2022-05-15 16:29:51.350149",
    	    "updated_at": "2022-05-15 16:29:51.350149"
	   }	   
	],
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
### 2.3. **Listar Plano por ID**
[ Voltar aos Endpoints ](#5-endpoints)

### `/partnerships/:partnership_id`

### Exemplo de Request:
```
GET /partnerships/1
Host: https://socio-torcedor-api-capstone-m4.herokuapp.com/
Authorization: token, isAdm
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro      | Tipo        | Descrição                                  |
|----------------|-------------|--------------------------------------------|
| partnership_id | string      | Identificador único do plano (Partnership) |

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
  	"id": "1",
	"name": "Gold,
	"price": 99.9,
	"created_at": "2022-05-15 16:29:51.350149",
    	"updated_at": "2022-05-15 16:29:51.350149",	
	"rewards": [
	  {
	    "id":1,
	    "name": "Prioridade Ingresso 3",
	    "description": "Prioridade na compra de ingressos",
	    "created_at": "2022-05-15 16:29:51.350149",
    	    "updated_at": "2022-05-15 16:29:51.350149"
	   },
	   {
	    "id":2,
	    "name": "VIP 3",
	    "description": "VIP 3 com acesso a assentos cobertos",
	    "created_at": "2022-05-15 16:29:51.350149",
    	    "updated_at": "2022-05-15 16:29:51.350149"
	   },
	   {
	    "id":4,
	    "name": "Acesso Atleta 3",
	    "description": "Acesso com prioridade 3 aos atletas do club",
	    "created_at": "2022-05-15 16:29:51.350149",
    	    "updated_at": "2022-05-15 16:29:51.350149"
	   }	   
	]
  }
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 403 Forbidden   | User must be an admin to access this resource. |
| 404 Not Found   | Resource not found. 			   |

---

### 2.4. **Atualizar Plano por ID**
[ Voltar aos Endpoints ](#5-endpoints)

### `/partnerships/:partnership_id`

### Exemplo de Request:
```
PATCH /partnerships/1
Host: https://socio-torcedor-api-capstone-m4.herokuapp.com/
Authorization: token, isAdm
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| partnership_id | string   | Identificador único do plano (Partnership) |


### Corpo da Requisição:
```json
	"name": "Gold 2022",
	"price": 109.99,
```

### Exemplo de Response:
```
200 OK
```
```json
  {
  	"id": "1",
	"name": "Gold 2022",
	"price": 109.99,
	"rewards": [
	  {
	    "id":1,
	    "name": "Prioridade Ingresso 3",
	    "description": "Prioridade na compra de ingressos",
	    "created_at": "2022-05-15 16:29:51.350149",
    	    "updated_at": "2022-05-15 16:29:51.350149"
	   },
	   {
	    "id":2,
	    "name": "VIP 3",
	    "description": "VIP 3 com acesso a assentos cobertos",
	    "created_at": "2022-05-15 16:29:51.350149",
    	    "updated_at": "2022-05-15 16:29:51.350149"
	   },
	   {
	    "id":4,
	    "name": "Acesso Atleta 3",
	    "description": "Acesso com prioridade 3 aos atletas do club",
	    "created_at": "2022-05-15 16:29:51.350149",
    	    "updated_at": "2022-05-15 16:29:51.350149"
	   }	   
	],
	"created_at": "2022-05-15 16:29:51.350149",
    	"updated_at": "2022-10-22 18:21:12.205167"	
  }
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 403 Forbidden   | User cannot access this resource. 				   |
| 404 Not Found   | Resource not found 						   |
| 400 Bad Request | Requisition body must have at least one property to be updated |


---
### 2.5. **Deletar Plano por ID**
[ Voltar aos Endpoints ](#5-endpoints)

### `/partnerships/:partnership_id`

### Exemplo de Request:
```
DELETE /partnerships/1
Host: https://socio-torcedor-api-capstone-m4.herokuapp.com/
Authorization: token, isAdm
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| partnership_id | string   | Identificador único do plano (Partnership) |

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
| 404 Not Found   | Resource not found		       |

---


## 3. **Rewards**
[ Voltar para os Endpoints ](#5-endpoints)

O objeto Reward é definido como:

| Campo         | Tipo   | Descrição                                       |
| --------------|--------|-------------------------------------------------|
| id            | number | Identificador único do benefício                |
| name          | string | O nome do benefício                             |
| description   | number | A descrição do benefício                        |
| created_at    | date   | Data de criação do benefício                    |
| updated_at    | date   | Data de atualização do benefício                |



### Endpoints

| Método   | Rota          | Descrição                               |
|----------|---------------|-----------------------------------------|
| POST     | /rewards 		      | Criação de um benefício                     
| GET      | /rewards     	      | Lista todos os benefícios                 
| GET      | /rewards/:reward_id      | Lista um único benefício pelo seu ID
| PATCH    | /rewards/:reward_id      | Atualiza os dados de um único benefício
| DELETE   | /rewards/:reward_id      | Deleta um único benefício

---

### 3.1. **Criação de Benefício**
[ Voltar para os Endpoints ](#5-endpoints)

### `/rewards`

### Exemplo de Request:
```
POST /rewards
Host: https://socio-torcedor-api-capstone-m4.herokuapp.com/
Authorization: token, isAdm
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"name": "Desconto Bomboniere 3",
	"description": "Desconto Bomboniere 3 para compra de gêneros alimentícios durante jogos."
}
```

### Schema de Validação com Yup:
```javascript
 	name: yup.string().required("name is required"),
        description: yup.string().required("description is required"),
```
OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:
```
201 Created
```

```json
{
	"id": "1",
	"name": "Desconto Bomboniere 3",
	"description": "Desconto Bomboniere 3 para compra de gêneros alimentícios durante jogos.",
	"created_at": "2022-05-15 16:29:51.350149",
    	"updated_at": "2022-05-15 16:29:51.350149"	
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 409 Conflict   | Conflict, resource already registered. |

---
### 3.2. **Listar todos Benefícios**
[ Voltar aos Endpoints ](#5-endpoints)

### `/rewards/`

### Exemplo de Request:
```
GET /rewards
Host: https://socio-torcedor-api-capstone-m4.herokuapp.com/
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
  	"id": "1",
	"name": "Desconto Bomboniere 3",
	"description": "Desconto Bomboniere 3 para compra de gêneros alimentícios durante jogos.",
	"created_at": "2022-05-15 16:29:51.350149",
    	"updated_at": "2022-05-15 16:29:51.350149"
  },
  {
  	"id": "2",
	"name": "Desconto ingressos 50",
	"description": "Desconto de 50% em ingressos nos jogos no estádio do time.",
	"created_at": "2022-05-16 15:29:51.350149",
    	"updated_at": "2022-05-16 15:29:51.350149"
  }
]
```

### Possíveis Erros:
| Código do Erro  | Descrição |
|-----------------|-----------|
| 403 Forbidden   | User must be an admin to access this resource. |

---

### 3.3. **Listar Benefício por ID**
[ Voltar aos Endpoints ](#5-endpoints)

### `/rewards/:reward_id`

### Exemplo de Request:
```
GET /rewards/1
Host: https://socio-torcedor-api-capstone-m4.herokuapp.com/
Authorization: token, isAdm
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro      | Tipo        | Descrição                                  |
|----------------|-------------|--------------------------------------------|
| rewards_id     | string      | Identificador único do benefício (Reward)  |

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
  	"id": "1",
	"name": "Desconto Bomboniere 3",
	"description": "Desconto Bomboniere 3 para compra de gêneros alimentícios durante jogos.",
	"created_at": "2022-05-15 16:29:51.350149",
    	"updated_at": "2022-05-15 16:29:51.350149"
  }
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 403 Forbidden   | User must be an admin to access this resource. |
| 404 Not Found   | Resource not found. 			   |

---
### 3.4. **Atualizar Benefício por ID**
[ Voltar aos Endpoints ](#5-endpoints)

### `/rewards/:reward_id`

### Exemplo de Request:
```
PATCH /rewards/1
Host: https://socio-torcedor-api-capstone-m4.herokuapp.com/
Authorization: token, isAdm
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro      | Tipo        | Descrição                                  |
|----------------|-------------|--------------------------------------------|
| rewards_id     | string      | Identificador único do benefício (Reward)  |

### Corpo da Requisição:
```json
	"description": "Desconto Bomboniere 3 para compra de gêneros alimentícios durante jogos e amostra grátis de refrigerante"
```

### Exemplo de Response:
```
200 OK
```
```json
  {
	"id": "1",
	"name": "Desconto Bomboniere 3",
	"description": "Desconto Bomboniere 3 para compra de gêneros alimentícios durante jogos e amostra grátis de refrigerante"
	"created_at": "2022-05-15 16:29:51.350149",
    	"updated_at": "2022-10-22 18:21:12.205167"
  }
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 403 Forbidden   | User cannot access this resource. 				   |
| 404 Not Found   | Resource not found 						   |
| 400 Bad Request | Either name, description must be provided.                     |


---

### 3.5. **Deletar Benefício por ID**
[ Voltar aos Endpoints ](#5-endpoints)

### `/rewards/:reward_id`

### Exemplo de Request:
```
DELETE /rewards/1
Host: https://socio-torcedor-api-capstone-m4.herokuapp.com/
Authorization: token, isAdm
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| rewards_id  | string      | Identificador único do benefício (Reward)  |

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
| 404 Not Found   | Resource not found		       |

---

## 4. **Clubs**
[ Voltar para os Endpoints ](#5-endpoints)

O objeto Club é definido como:

| Campo         | Tipo   | Descrição                        |
| --------------|--------|----------------------------------|
| id            | number | Identificador único do clube     |
| name          | string | O nome do clube                  |
| created_at    | date   | Data de criação do clube         |
| updated_at    | date   | Data de atualização do clube     |



### Endpoints

| Método   | Rota       | Descrição                               |
|----------|------------|-----------------------------------------|
| POST     | /clubs      	 | Criação de um clube            |
| GET      | /clubs      	 | Lista todos os clubes          |
| GET      | /clubs/:club_id     | Lista um único clube pelo seu ID
| PATCH    | /clubs/:club_id     | Atualiza os dados de um único clube
| DELETE   | /clubs/:club_id     | Deleta um único clube


---

### 4.1. **Criação de Clube**
[ Voltar para os Endpoints ](#5-endpoints)

### `/clubs`

### Exemplo de Request:
```
POST /clubs
Host: https://socio-torcedor-api-capstone-m4.herokuapp.com/
Authorization: token, isAdm
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"name": "Monte Alegre FC",
}
```

### Schema de Validação com Yup:
```javascript
name: yup.string().required("name is required"),
```
OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:
```
201 Created
```

```json
{
	"id": "1",
	"name": "Monte Alegre FC",
	"created_at": "2022-05-15 16:29:51.350149",
    	"updated_at": "2022-05-15 16:29:51.350149"	
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 409 Conflict   | Conflict, resource already registered. |
| 403 Forbidden  | User must be an admin to access this resource. |

---

### 4.2. **Listar todos Clubes**
[ Voltar aos Endpoints ](#5-endpoints)

### `/clubs/`

### Exemplo de Request:
```
GET /clubs
Host: https://socio-torcedor-api-capstone-m4.herokuapp.com/
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
  	"id": "1",
	"name": "Monte Alegre FC",
	"created_at": "2022-05-15 16:29:51.350149",
    	"updated_at": "2022-05-15 16:29:51.350149"
  },
  {
  	"id": "2",
	"name": "Campo Limpo Esporte Clube",
	"created_at": "2022-05-16 15:29:51.350149",
    	"updated_at": "2022-05-16 15:29:51.350149"
  }
]
```

### Possíveis Erros:
| Código do Erro  | Descrição |
|-----------------|-----------|
| 403 Forbidden   | User must be an admin to access this resource. |

---

### 4.3. **Listar Clube por ID**
[ Voltar aos Endpoints ](#5-endpoints)

### `/clubs/:club_id`

### Exemplo de Request:
```
GET /clubs/1
Host: https://socio-torcedor-api-capstone-m4.herokuapp.com/
Authorization: token, isAdm
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro     | Tipo        | Descrição                            |
|---------------|-------------|--------------------------------------|
| club_id       | string      | Identificador único do clube (Club)  |

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
  	"id": "1",
	"name": "Monte Alegre FC",
	"created_at": "2022-05-15 16:29:51.350149",
    	"updated_at": "2022-05-15 16:29:51.350149"
  }
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 403 Forbidden   | User must be an admin to access this resource. |
| 404 Not Found   | Resource not found. 			   |

---

### 4.4. **Atualizar Clube por ID**
[ Voltar aos Endpoints ](#5-endpoints)

### `/clubs/:club_id`

### Exemplo de Request:
```
PATCH /clubs/1
Host: https://socio-torcedor-api-capstone-m4.herokuapp.com/
Authorization: token, isAdm
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro      | Tipo        | Descrição                            |
|----------------|-------------|--------------------------------------|
| clubs_id       | string      | Identificador único do clube (Club)  |


### Corpo da Requisição:
```json
	"name": "Monte Alegre Futebol Clube"
```

### Exemplo de Response:
```
200 OK
```
```json
  {
	"id": "1",
	"name": "Monte Alegre Futebol Clube",
	"created_at": "2022-05-15 16:29:51.350149",
    	"updated_at": "2022-05-15 16:29:51.350149"
  }
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 403 Forbidden   | User cannot access this resource 	 |
| 404 Not Found   | Resource not found 			 |
| 400 Bad Request | Name is required			 |


---
### 4.5. **Deletar Clube por ID**
[ Voltar aos Endpoints ](#5-endpoints)

### `/clubs/:club_id`

### Exemplo de Request:
```
DELETE /clubs/1
Host: https://socio-torcedor-api-capstone-m4.herokuapp.com/
Authorization: token, isAdm
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro  | Tipo        | Descrição                            |
|------------|-------------|--------------------------------------|
| club_id    | string      | Identificador único do clube (Club)  |

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
| 403 Forbidden  | User cannot access this resource. |
| 404 Not Found  | Resource not found		     |

---


## 6. Testes
[ Voltar para o topo ](#tabela-de-conteúdos)
