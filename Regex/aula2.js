const {texto} = require("./base")

const regExp1 = /joão|maria/gi

// match verifica se o regex existe no texto
//retorna todas as ocorrências em um array
console.log(texto.match(regExp1))

console.log(texto.replace(regExp1,'substituído'))
// ao utilizar grupos o javascript habilita $1 para referencia o grupo
console.log(texto.replace(/(joão|maria)/gi,'"$1"'))
//e possível passar uma função como segundo parâmetro para fazer alguma coisa com as ocorrências
//cada ocorrência ira passar nessa função
console.log(texto.replace(/(joão|maria)/gi,function(input){
  return input.toUpperCase()
}))
