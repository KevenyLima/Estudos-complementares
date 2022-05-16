// ^ começo da expressão
// $ fim da expressão

const {html2} = require("./base")

//$1 $2 $3 <-- retrovisores \1 \2 \3 -> para usa-lo no regex
// retrovisores sao variáveis que guardam os grupos de um regex e possível acessa-los no próprio regex ou pelos caracteres $1, $2 ... no javascript
// (:?) -> significa para nao contar o grupo como retrovisor assim nao guardando na memoria
//exemplo 
//console.log(html2.replace(/(<(\w+)(:?[\s\S]*?>))([\s\S]*?)(<\/\2>)/g,'$1 haha $3 hahah $4'))

console.log("html2",html2)
console.log(html2.match(/<\w+[\s\S]*?>([\s\S]*?)<\/\1>/g))
// pegando o html utilizando [\s\S] com espaços ou quebras de linhas utilizando *? para previvir o comportamento greedy do regex
console.log(html2.replace(/(<(\w+)[\s\S]*?>)([\s\S]*?)(<\/\2>)/g,'$1 haha $3 hahah $4'))




// tentando pegar so o ultimo parâmetro de uma url 
// const regexHttp  = /https?:\/\/.+(\/.+)*/g
// const text = "https://www.youtube.com/watch?v=_ckmHSQupvc/regex/params"
// const httpValid = text.match(regexHttp)
// console.log(httpValid)
// if(httpValid){
//   const splitOnParams = /([^/]\/[\w?=]+)+/g
//   const findParamsRegex = /(\/\/.+?\/)+?/g
//   httpValid.map((string)=>{
//     console.log('console na split params',string.match(splitOnParams))
//     console.log("console no findParams",string.match(findParamsRegex))
//   })
// }
