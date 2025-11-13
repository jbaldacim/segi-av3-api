# 📘 Trabalho avaliativo 6 - Criar API para criptografar e descriptografar usando cifra de César

**Disciplina:** Segurança da Informação  
**Autores:** **Eduardo Souza** e **João Fleury Baldacim**

---

## 📌 Descrição do projeto

Este projeto implementa uma API REST desenvolvida em **Node.js + TypeScript** que permite:

- **Cifrar** textos usando a Cifra de César.  
- **Decifrar** textos com deslocamento informado.  
- **Decifrar por força bruta**, utilizando regras linguísticas avançadas e análise probabilística da biblioteca **franc** para identificar o texto mais provável em português.

---

## 🚀 Como iniciar o projeto

### ✔️ 1. Instalar dependências

```bash
npm install
```

### ✔️ 2. Executar o servidor

```bash
npm run dev
```

O servidor será iniciado na porta **3000**, ou na porta definida pela variável `PORT`.

### ✔️ 3. Acessar documentação Swagger

```
http://localhost:3000/api-docs
```

---

## 📂 Estrutura do projeto

```
segi-av3-api/
├── controller/
│   └── caesar.controller.ts
├── routes/
│   └── caesar.routes.ts
├── services/
│   └── caesar.services.ts
├── src/
│   └── tests/
│       └── caesar.test.ts
├── swagger.ts
├── server.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📡 Endpoints da API

### 🔐 1. POST /cifrar

```json
{
  "textoClaro": "instituto federal de educacao ciencia e tecnologia do estado de sao paulo",
  "deslocamento": 3
}
```

---

### 🔓 2. POST /decifrar

```json
{
  "textoCifrado": "lqvwlwxwr ihghudo gh hgxfdfdr flhqfld h whfqrorjld gr hvwdgr gh vdr sdxor",
  "deslocamento": 3
}
```

---

### 🧠 3. POST /decifrarForcaBruta

```json
{
  "textoCifrado": "lqvwlwxwr ihghudo gh hgxfdfdr flhqfld h whfqrorjld gr hvwdgr gh vdr sdxor"
}
```

---

## 🧬 Regras de Negócio (services)

- `cipher` — Cifra texto com deslocamento.
- `decipher` — Decifra com deslocamento conhecido.
- `bruteForceDecipher` — Testa 26 possibilidades e usa heurísticas + franc.




