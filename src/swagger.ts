import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.3",
    info: {
      title: "API Cifra de César",
      version: "1.0.0",
      description:
        "API para cifrar e decifrar textos usando a Cifra de César.",
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
              description: "Texto em claro a ser cifrado. Apenas letras minúsculas de 'a' a 'z' e espaços.",
              example:
                "instituto federal de educacao ciencia e tecnologia do estado de sao paulo",
            },
            deslocamento: {
              type: "integer",
              description: "Valor de deslocamento da Cifra de César (0 a 25).",
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
              description: "Texto resultante após a cifragem.",
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
              description: "Texto cifrado a ser decifrado.",
              example:
                "lqvwlwxwr ihghudo gh hgxfdfdr flhqfld h whfqrorjld gr hvwdgr gh vdr sdxor",
            },
            deslocamento: {
              type: "integer",
              description: "Valor de deslocamento usado na cifragem (0 a 25).",
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
              description: "Texto decifrado (em claro).",
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
              description:
                "Texto cifrado sobre o qual será aplicada a força bruta.",
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
                "Resultado(s) da decifragem por força bruta. Pode ser um texto único ou uma lista de tentativas, dependendo da implementação do service.",
              oneOf: [
                {
                  type: "string",
                  example:
                    "instituto federal de educacao ciencia e tecnologia do estado de sao paulo",
                },
                {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      deslocamento: {
                        type: "integer",
                        example: 3,
                      },
                      texto: {
                        type: "string",
                        example:
                          "instituto federal de educacao ciencia e tecnologia do estado de sao paulo",
                      },
                    },
                  },
                },
              ],
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            error: {
              type: "string",
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
          summary: "Cifra um texto usando a Cifra de César.",
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
              description: "Texto cifrado com sucesso.",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/CifrarResponse",
                  },
                },
              },
            },
            400: {
              description: "Erro de validação da requisição.",
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
          summary: "Decifra um texto cifrado usando a Cifra de César.",
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
              description: "Texto decifrado com sucesso.",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/DecifrarResponse",
                  },
                },
              },
            },
            400: {
              description: "Erro de validação da requisição.",
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
          summary: "Tenta decifrar um texto cifrado por força bruta.",
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
                "Resultado(s) da tentativa de decifragem por força bruta.",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/DecifrarForcaBrutaResponse",
                  },
                },
              },
            },
            400: {
              description: "Erro de validação da requisição.",
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
