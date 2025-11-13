import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.3",
    info: {
      title: "API Cifra de César",
      version: "1.0.0",
      description:
        "API para cifrar e decifrar mensagens usando a Cifra de César. O alfabeto utilizado é: a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, x, w, y, z. Os espaços devem aparecer nas respostas",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      schemas: {
        CifrarRequest: {
          type: "object",
          required: ["textoClaro", "deslocamento"],
          properties: {
            textoClaro: {
              type: "string",
              maxLength: '255',
              description: "Texto a ser cifrado. Apenas letras minúsculas de 'a' a 'z' e espaços",
              example:
                "instituto federal de educacao ciencia e tecnologia do estado de sao paulo",
            },
            deslocamento: {
              type: "integer",
              description: "Valor de deslocamento da Cifra de César",
              example: 3,
              minimum: 0,
              maximum: 25,
            },
          },
        },
        CifrarResponse: {
          type: "object",
          properties: {
            textoCifrado: {
              type: "string",
              maxLength: '255',
              description: "Texto cifrado",
              example:
                "lqvwlwxwr ihghudo gh hgxfdfdr flhqfld h whfqrorjld gr hvwdgr gh vdr sdxor",
            },
          },
        },
        DecifrarRequest: {
          type: "object",
          required: ["textoCifrado", "deslocamento"],
          properties: {
            textoCifrado: {
              type: "string",
              maxLength: '255',
              description: "Texto a ser decifrado",
              example:
                "lqvwlwxwr ihghudo gh hgxfdfdr flhqfld h whfqrorjld gr hvwdgr gh vdr sdxor",
            },
            deslocamento: {
              type: "integer",
              description: "Valor de deslocamento usado na cifragem",
              example: 3,
              minimum: 0,
              maximum: 25,
            },
          },
        },
        DecifrarResponse: {
          type: "object",
          properties: {
            textoClaro: {
              type: "string",
              maxLength: '255',
              description: "Texto decifrado",
              example:
                "instituto federal de educacao ciencia e tecnologia do estado de sao paulo",
            },
          },
        },
        DecifrarForcaBrutaRequest: {
          type: "object",
          required: ["textoCifrado"],
          properties: {
            textoCifrado: {
              type: "string",
              maxLength: '255',
              description:
                "Texto a ser decifrado",
              example:
                "lqvwlwxwr ihghudo gh hgxfdfdr flhqfld h whfqrorjld gr hvwdgr gh vdr sdxor",
            },
          },
        },
        DecifrarForcaBrutaResponse: {
          type: "object",
          properties: {
            textoClaro: {
              description:
                "Texto decifrado",
              type: "string",
              maxLength: '255',
              example:
                "instituto federal de educacao ciencia e tecnologia do estado de sao paulo",
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            error: {
              type: "string",
              maxLength: '255',
              example:
                "Requisição inválida: 'deslocamento' deve estar entre 0 e 25.",
            },
          },
        },
      },
    },
    paths: {
      "/cifrar": {
        post: {
          tags: ["Cifra de César"],
          summary: "Cifra uma mensagem usando a Cifra de César",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CifrarRequest",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Mensagem cifrada com sucesso",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/CifrarResponse",
                  },
                },
              },
            },
            400: {
              description: "Requisição inválida",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
          },
        },
      },
      "/decifrar": {
        post: {
          tags: ["Cifra de César"],
          summary: "Decifra uma mensagem cifrada usando a Cifra de César",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/DecifrarRequest",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Mensagem decifrada com sucesso",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/DecifrarResponse",
                  },
                },
              },
            },
            400: {
              description: "Requisição inválida",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
          },
        },
      },
      "/decifrarForcaBruta": {
        post: {
          tags: ["Cifra de César"],
          summary: "Decifra uma mensagem cifrada que não possui a informação de deslocamento, utilizando força bruta na Cifra de César. Adotar o idioma português como o único idioma aceito.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/DecifrarForcaBrutaRequest",
                },
              },
            },
          },
          responses: {
            200: {
              description:
                "Mensagem decifrada com sucesso",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/DecifrarForcaBrutaResponse",
                  },
                },
              },
            },
            400: {
              description: "Requisição inválida",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [],
});

 
  export default swaggerSpec;
