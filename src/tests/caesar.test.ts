import { bruteForceDecipher, cipher, decipher } from "../services/caesar.services";

for (var i = 0; i<=25; i++) {
    console.log('-------------------------------\n')
    console.log(`Chave: ${i}`)
    console.log(bruteForceDecipher(cipher('instituto federal de educacao ciencia e tecnologia do estado de sao paulo', i)))
}
