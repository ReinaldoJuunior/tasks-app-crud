# Backend de Cadastro (CRUD de Usuários)

Backend simples em Node.js **sem dependências externas** (não precisa de `npm install`), pronto para rodar na porta `4000` e resolver o erro `ECONNREFUSED 127.0.0.1:4000` do seu frontend em React/Next.js.

## Como rodar

```bash
node server.js
```

ou

```bash
npm start
```

Você verá no terminal:
```
Backend rodando em http://127.0.0.1:4000
```

Deixe esse terminal aberto rodando enquanto testa o frontend (rode o frontend em outro terminal, ex: `npm run dev`).

## Armazenamento

Os usuários são salvos em `db.json` (criado automaticamente na primeira execução). É um banco simples em arquivo — ótimo para desenvolvimento/testes. Se quiser resetar os dados, basta apagar o `db.json`.

As senhas **nunca** são salvas em texto puro: são protegidas com hash (`scrypt`, nativo do Node).

## Rotas disponíveis

### Registrar usuário
```
POST /auth/register
Content-Type: application/json

{
  "username": "junior",
  "email": "junior@gmail.com",
  "password": "132456456"
}
```
Respostas: `201` sucesso | `400` campos faltando | `409` e-mail já cadastrado

### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "junior@gmail.com",
  "password": "132456456"
}
```
Respostas: `200` sucesso | `401` credenciais inválidas

### Listar usuários
```
GET /users
```

### Buscar usuário por ID
```
GET /users/:id
```

### Atualizar usuário
```
PUT /users/:id
Content-Type: application/json

{
  "username": "novoNome",
  "email": "novo@email.com",
  "password": "novaSenha"
}
```
(envie apenas os campos que quiser alterar)

### Remover usuário
```
DELETE /users/:id
```

## CORS

Já está liberado para qualquer origem (`Access-Control-Allow-Origin: *`), então seu frontend React/Next.js pode chamar essas rotas sem problema de CORS.

## Estrutura de arquivos

```
backend/
├── server.js      # servidor HTTP e rotas
├── db.js          # leitura/escrita do db.json
├── password.js     # hash e verificação de senha
├── package.json
└── db.json        # criado automaticamente
```
