import { franc, francAll } from "franc";

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
];

const ASCII_CONSONANTS = 'bcdfghjklmnpqrstvwxyz'

// ===== REGRAS NEGATIVAS (PENALIZAM) =====
// Essas regras ELIMINAM candidatos que não podem ser português

const N_BEFORE_PB = /[n][pb]/g;
const M_BEFORE_CONSONANTS = /[m][cdfghjklmnqrstvwxyz]/g
const RR_SS_WITH_CONSONANTS = new RegExp(
  `([${ASCII_CONSONANTS}][r]{2})|([r]{2}[${ASCII_CONSONANTS}])|([${ASCII_CONSONANTS}][s]{2})|([s]{2}[${ASCII_CONSONANTS}])`,
  'g'
);
const CH_AFTER_DIPHTHONG = /[aeiou]{2}ch/g;
const H_AFTER_CONSONANT = /[bdfgjkmpqrstvwxyz]h/g;
const INVALID_CONSONANT_CLUSTER = /(tl|dl|kn|tm|ptl|gk|dt|kt|tp|pk|bk|gb|td|pd|dg|kg)/g;

// NOVAS REGRAS NEGATIVAS

// 1. Q sem U depois é SEMPRE inválido
const Q_WITHOUT_U = /q(?!u)/g;

// 2. Consoantes dobradas inválidas (apenas rr, ss, cc são válidos)
// const INVALID_DOUBLE_CONSONANTS = /(bb|dd|ff|gg|hh|jj|kk|ll|mm|nn|pp|tt|vv|ww|xx|yy|zz)/g;

// 3. Vogais repetidas inválidas
const INVALID_DOUBLE_VOWELS = /(aa|ee|ii|uu)/g;

// 4. CC só válido antes de E ou I
const CC_INVALID = /cc[aou]/g;

// 6. Quatro consoantes seguidas (impossível em português)
const FOUR_CONSONANTS = new RegExp(`[${ASCII_CONSONANTS}]{4}`, 'g');

// 9. Consoante + mesma consoante + vogal (exceto rr, ss, cc)
const SAME_CONSONANT_PATTERN = /([bdfghjklmpqtvwxyz])\1/g;

// 10. Padrões de início de palavra inválidos
const INVALID_WORD_START = /\b(pb|td|kg|nm|pn|bd|gd|dt|kt|dm|dn)/g;

// 11. Padrões de fim de palavra inválidos  
const INVALID_WORD_END = /(pb|td|kg|pn|bd|gd|dt|kt|dm|gb|db)\b/g;

// 12. Y é letra estrangeira (não existe em português sem acentos)
const Y_LETTER = /y/g;

// 13. K é letra estrangeira
const K_LETTER = /k/g;

// 14. W é letra estrangeira
const W_LETTER = /w/g;

// ===== REGRAS POSITIVAS (BONIFICAM) =====
// Essas regras IDENTIFICAM padrões característicos do português

const PTBR_DIPHTHONG = /(ao|ae|ai|ei|oi|ui|ou|au|eu|iu)/g;
const X_AFTER_CONSONANT = /[aeiou]x/g;
const QU_GU = /(que|qui|gue|gui)/g;
const ENDING_CAO = /co(e|a)s?\b/g;
const LH_NH_CH = /(lh|nh|ch)/g;

// NOVAS REGRAS POSITIVAS

// 15. SS entre vogais (muito comum)
const SS_BETWEEN_VOWELS = /[aeiou]ss[aeiou]/g;

// 16. RR entre vogais (muito comum)
const RR_BETWEEN_VOWELS = /[aeiou]rr[aeiou]/g;

// 17. Encontros consonantais com R (muito produtivos)
const CONSONANT_R = /[bcdfgptv]r[aeiou]/g;

// 18. Encontros consonantais com L
const CONSONANT_L = /[bcfgp]l[aeiou]/g;

// 19. SC antes de E/I (nascer, crescer)
const SC_BEFORE_EI = /sc[ei]/g;

// 20. Padrão consoante-vogal (estrutura silábica básica)
const CV_BASIC = /[bcdfghjlmnpqrstvxz][aeiou]/g;

// 21. MP e MB (nasais)
const MP_MB = /(mp|mb)/g;

// 22. NT, ND, NC, NF, NV (nasais comuns)
const NASAL_CLUSTERS = /(nt|nd|nc|nf|nv)/g;

// 23. Palavras funcionais muito comuns (artigos, preposições)
const COMMON_WORDS = /\b(de|da|do|dos|das|em|no|na|nos|nas|ao|aos|um|uma|uns|umas|com|por|para|que|se|te|me|le|la|as|os)\b/g;

// 24. Terminações verbais comuns
const VERB_ENDINGS = /\b\w+(ar|er|ir|ado|ido|ando|endo|indo|ava|ia|ou|am|em)\b/g;

// 25. Terminações de substantivos/adjetivos
const NOUN_ADJ_ENDINGS = /\b\w+(mente|cao|dade|ismo|ista|ncia|vel|al|or|ez|eza)\b/g;

// 26. Vogal-consoante-vogal (padrão muito comum)
const VCV_PATTERN = /[aeiou][bcdfghjlmnpqrstvxz][aeiou]/g;

// 27. NH e LH entre vogais (característico)
const NH_LH_MIDDLE = /[aeiou](nh|lh)[aeiou]/g;

// 28. Plural em S
const PLURAL_S = /[aeiou]s\b/g;

// 29. Sequências típicas: ão, ões (simulando til)
const AO_OES_PATTERN = /(ao|oes|aes)\b/g;

const negativeRules: RegExp[] = [
  N_BEFORE_PB,
  M_BEFORE_CONSONANTS,
  RR_SS_WITH_CONSONANTS,
  CH_AFTER_DIPHTHONG,
  H_AFTER_CONSONANT,
  INVALID_CONSONANT_CLUSTER,
  Q_WITHOUT_U,
  INVALID_DOUBLE_VOWELS,
  CC_INVALID,
  FOUR_CONSONANTS,
  SAME_CONSONANT_PATTERN,
  INVALID_WORD_START,
  INVALID_WORD_END,
  Y_LETTER,
  K_LETTER,
  W_LETTER,
]

const positiveRules: RegExp[] = [
  PTBR_DIPHTHONG,
  X_AFTER_CONSONANT,
  LH_NH_CH,
  QU_GU,
  ENDING_CAO,
  SS_BETWEEN_VOWELS,
  RR_BETWEEN_VOWELS,
  CONSONANT_R,
  CONSONANT_L,
  SC_BEFORE_EI,
  CV_BASIC,
  MP_MB,
  NASAL_CLUSTERS,
  COMMON_WORDS,
  VERB_ENDINGS,
  NOUN_ADJ_ENDINGS,
  VCV_PATTERN,
  NH_LH_MIDDLE,
  PLURAL_S,
  AO_OES_PATTERN,
]

function countViolations(attempt: string): number{
  let violationCount = 0;
  for (const regex of negativeRules) {
    let match;
    regex.lastIndex = 0; 
    
    while ((match = regex.exec(attempt)) !== null) {
      violationCount++;
    }
  }

  return violationCount;
}

function countValidPatterns(attempt: string): number {
  let validPatternCount = 0;
  for (const regex of positiveRules) {
    let match;
    regex.lastIndex = 0; 
    
    while ((match = regex.exec(attempt)) !== null) {
      validPatternCount++;
    }
  }

  return validPatternCount;
}

function positiveModulo(dividend: number, divisor: number): number {
  return ((dividend % divisor) + divisor) % divisor;
}

export const cipher = (textoClaro: string, deslocamento: number): string => {
  const textoCifrado = textoClaro
    .split("")
    .map((char) => {
      if (char == " ") return " ";

      const indexInAlphabet = alphabet.indexOf(char);
      const newIndex = positiveModulo(indexInAlphabet + deslocamento, 26);
      const newLetter = alphabet[newIndex];

      return newLetter;
    })
    .join("");

  return textoCifrado;
};

export const decipher = (
  textoCifrado: string,
  deslocamento: number
): string => {
  const textoClaro = textoCifrado
    .split("")
    .map((char) => {
      if (char == " ") return " ";

      const indexInAlphabet = alphabet.indexOf(char);
      const newIndex = positiveModulo(indexInAlphabet - deslocamento, 26);
      const newLetter = alphabet[newIndex];

      return newLetter;
    })
    .join("");

  return textoClaro;
};

export const bruteForceDecipher=(
  textoCifrado: string
): string | Object => {
  const attempts = []
  for (var deslocamento = 0; deslocamento <= 25; deslocamento++)
  {
    const attempt = decipher(textoCifrado, deslocamento);
    const probability = francAll(attempt).find(attempt=>attempt[0] == 'por')
    const violationCount = countViolations(attempt)
    const validPatternCount = countValidPatterns(attempt)
    attempts.push({
      attempt,
      probability,
      violationCount,
      validPatternCount
    })
  }

  const noViolations = attempts.filter(attempt=>attempt.violationCount==0)
  
  if (noViolations.length === 0) {
    // Se nenhuma tentativa está sem violações, pega as com menos violações
    const minViolations = Math.min(...attempts.map(a => a.violationCount));
    const leastViolations = attempts.filter(a => a.violationCount === minViolations);
        
    const mostLikely = leastViolations.reduce((prev, current) => {
      const prevValidPatterns = prev.validPatternCount;
      const currValidPatterns = current.validPatternCount;
      
      if (currValidPatterns > prevValidPatterns) return current;
      return prev;
    });
    
    return mostLikely;
  }
  
  const mostLikely = noViolations.reduce((prev, current) => {
    const prevValidPatterns = prev.validPatternCount;
    const currValidPatterns = current.validPatternCount;

    if (currValidPatterns > prevValidPatterns) return current;

    return prev;
  });

  return mostLikely
}