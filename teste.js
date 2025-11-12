// --- definição das regras (regex) ---
// nota: as regras agora esperam um texto em caixa-baixa.

// regra 1: "n" antes de "p" ou "b".
const n_antes_de_pb = /[n][pb]/g;

// regra 2: "m" antes de consoante que não seja "p" ou "b".
const m_antes_de_outras_consoantes = /[m][cdfghjklmnqrstvwxyz]/g;

// regra 3: "rr" no início de uma palavra.
const rr_inicio_palavra = /\b[r]{2}/g;

// regra 4: "ss" no início de uma palavra.
const ss_inicio_palavra = /\b[s]{2}/g;

// regra 5: "rr" ou "ss" ao lado de uma consoante.
// "rr" e "ss" só são usados entre vogais.
const consoantes_ascii = 'bcdfghjklmnpqrstvwxyz';
const rr_ss_junto_consoante = new RegExp(
  `([${consoantes_ascii}][r]{2})|([r]{2}[${consoantes_ascii}])|([${consoantes_ascii}][s]{2})|([s]{2}[${consoantes_ascii}])`,
  'g'
);

// regra 6: "ch" após um ditongo (duas vogais juntas).
// geralmente, após ditongos, usa-se "x" (ex: "caixa", "peixe", "frouxo").
const ch_depois_ditongo = /[aeiou]{2}ch/g;

// regra 7: "h" após uma consoante que não seja c, l, ou n.
// os únicos dígrafos válidos com h são "ch", "lh", "nh".
const h_invalido_apos_consoante = /[bdfgjkmpqrstvwxyz]h/g;


/**
 * lista de todas as regras a serem verificadas.
 */
const todas_as_regras = [
  n_antes_de_pb,
  m_antes_de_outras_consoantes,
  rr_inicio_palavra,
  ss_inicio_palavra,
  rr_ss_junto_consoante,
  ch_depois_ditongo,
  h_invalido_apos_consoante,
];

/**
 * verifica um texto e conta a quantidade de violações
 * de regras ortográficas estruturais encontradas.
 *
 * @param texto o string de entrada para verificar.
 * @returns um número total de violações encontradas.
 */
export function contar_violacoes_ortograficas(texto) {
  let contador_violacoes = 0;
  
  // converte o texto para caixa-baixa para garantir que as regras funcionem
  const texto_minusculo = texto.toLowerCase();

  for (const regex of todas_as_regras) {
    let match;
    // resetamos o lastindex do regex global antes de um novo loop exec()
    regex.lastIndex = 0; 
    
    while ((match = regex.exec(texto_minusculo)) !== null) {
      // incrementa o contador para cada violação encontrada
      contador_violacoes++;
    }
  }

  return contador_violacoes;
}

// --- exemplo de uso ---

const texto_exemplo_1 = `
o rrato roeu a roupa do rei.
o ssinistro da canpanha comprou um bonbo.
aquela honra (gh) é um absurdo.
eu vi uma peicha na caicha.
o passsaro voou.
`;

// exemplo com texto em caixa alta para provar que a função funciona
const texto_exemplo_2 = `
O RRAto ROEU A ROUPA DO REI.
O SSINISTRO DA CANPANHA COMPROU UM BONBO.
`;

const total_erros_1 = contar_violacoes_ortograficas(texto_exemplo_1);
console.log(`total de violações (texto 1): ${total_erros_1}`);

const total_erros_2 = contar_violacoes_ortograficas(texto_exemplo_2);
console.log(`total de violações (texto 2): ${total_erros_2}`);

/*
saída do exemplo:

total de violações (texto 1): 8
total de violações (texto 2): 4
*/