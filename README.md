Alunos: Eduardo Paulino de Souza e João Leonardo Fleury Baldacim

# Cifra de César API

API RESTful em **Node.js + Express + TypeScript** que implementa a **Cifra de César** para cifrar e decifrar textos com **Swagger UI** para testar direto no navegador.

## Tecnologias

- Node.js
- Express
- TypeScript  
- Swagger UI Express
- Swagger JSDoc  
- CORS

## Pré-requisitos

- Node.js 18+  
- npm

## Descrição do projeto

Este projeto implementa uma API REST que permite:

- **Cifrar** textos usando a Cifra de César.  
- **Decifrar** textos com deslocamento informado.  
- **Decifrar por força bruta**, utilizando regras linguísticas para identificar o texto mais provável em português.

## Como iniciar o projeto

### 1. Instalar dependências

```bash
npm install
```

### 2. Executar o servidor

```bash
npm run dev
```

O servidor será iniciado na porta **3000**, ou na porta definida pela variável `PORT`.

### 3. Acessar documentação Swagger

```
http://localhost:3000/api-docs
```

## Endpoints

### 1. POST /cifrar

Recebe o texto claro e a chave e retorna o texto cifrado.

```json
{
  "textoClaro": "instituto federal de educacao ciencia e tecnologia do estado de sao paulo",
  "deslocamento": 3
}
```

---

### 2. POST /decifrar

Recebe o texto cifrado e a chave e retorna o texto claro.

```json
{
  "textoCifrado": "lqvwlwxwr ihghudo gh hgxfdfdr flhqfld h whfqrorjld gr hvwdgr gh vdr sdxor",
  "deslocamento": 3
}
```

---

### 3. POST /decifrarForcaBruta

Recebe o texto cifrado e retorna o texto claro através de força bruta e identificação de padrões linguísticos.

```json
{
  "textoCifrado": "lqvwlwxwr ihghudo gh hgxfdfdr flhqfld h whfqrorjld gr hvwdgr gh vdr sdxor"
}
```