const {texto,arquivos} = require("./base")


//quantificadores 
// * (opcionais 0 ou n)
// + (obrigatório) 1 ou n
// ? (opcionais) 0 au 1
// \ caractere de escape
// {n,m} especifica o mínimo e o máximo de ocorrências
// exemplo {1,} mínimo uma ocorrência e nao tem limite para máximo 
// {10,} no mínimo 10
//{,10} de 0 a 10
// {5,10} de 5 a 10
// {10} deve ter 10 vezes
// console.log(texto);
// const regExp1 = /joão/gi
// console.log(texto.match(regExp1))
// e possível utilizar codificadores para grupos inteiros
// exemplo
const regex =/\.((jp|JP)(e|E)?(g|G))/g
const result = arquivos.map((arquivo,index)=>{
  return {arquivo,extensão:arquivo.match(regex)}
})

console.log("resultado",result)

const regExp2 = /\.jpe?g/gi
for ( const arquivo of arquivos){
  const valido  = arquivo.match(regExp2)
  // caso seja invalido ele pula para o proximo laco de repetição
  if(!valido) continue;

  console.log(arquivo,valido)
}