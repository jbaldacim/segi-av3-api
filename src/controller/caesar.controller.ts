import { Request, Response } from "express";
import * as Caesar from "../services/caesar.services";
import { franc } from "franc";
import { text } from "stream/consumers";

const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  " ",
];

export async function cipherHandler(req: Request, res: Response) {
  try {
    const { textoClaro, deslocamento } = req.body;
    const desloc = +deslocamento;

    if (!textoClaro || !deslocamento) {
      return res.status(400).json({
        error:
          "Requisição inválida: 'textoClaro' e 'deslocamento' são parâmetros obrigatórios.",
      });
    }

    textoClaro.split("").forEach((char: string) => {
      if (!alphabet.includes(char)) {
        return res.status(400).json({
          error:
            "Requisição inválida: caracteres possíveis incluem as letras de 'a' a 'z' e espaços.",
        });
      }
    });

    if (isNaN(desloc) || !Number.isInteger(desloc)) {
      return res.status(400).json({
        error:
          "Requisição inválida: 'deslocamento' deve ser um número inteiro.",
      });
    }

    if (desloc < 0 || desloc > 25) {
      return res.status(400).json({
        error: "Requisição inválida: 'deslocamento' deve estar entre 0 e 25.",
      });
    }

    const textoCifrado = Caesar.cipher(textoClaro, deslocamento);
    return res.status(200).json({ textoCifrado });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido.";

    return res.status(400).json({ error: errorMessage });
  }
}

export async function decipherHandler(req: Request, res: Response) {
  try {
    const { textoCifrado, deslocamento } = req.body;
    const desloc = +deslocamento;

    if (!textoCifrado || !deslocamento) {
      return res.status(400).json({
        error:
          "Requisição inválida: 'textoCifrado' e 'deslocamento' são parâmetros obrigatórios.",
      });
    }

    if (isNaN(desloc) || !Number.isInteger(desloc)) {
      return res.status(400).json({
        error:
          "Requisição inválida: 'deslocamento' deve ser um número inteiro.",
      });
    }

    if (desloc < 0 || desloc > 25) {
      return res.status(400).json({
        error: "Requisição inválida: 'deslocamento' deve estar entre 0 e 25.",
      });
    }

    // Chamar service
    const textoClaro = Caesar.decipher(textoCifrado, deslocamento);
    return res.status(200).json({ textoClaro });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido.";

    return res.status(400).json({ error: errorMessage });
  }
}

export async function bruteForceDecipherHandler(req: Request, res: Response) {
  try {
    const { textoCifrado } = req.body;

    if (!textoCifrado) {
      return res.status(400).json({
        error: "Requisição inválida: 'textoCifrado' é parâmetro obrigatório.",
      });
    }

    const textoClaro = Caesar.bruteForceDecipher(textoCifrado)
    return res.status(200).json({textoClaro})
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido.";

      return res.status(400).json({ error: errorMessage });
  }
}
