const {texto} = require("./base")
//flags
// g - global (encontra todas as ocorrências)
// i - insensitive
//(()()) grupos
// | ou

//funções para trabalhar com regex
// const regExp1 = /Teve 5 filhos/i;
// console.log(regExp1.exec(texto))

//-----------------------------------------------------------------------------
const regExp2 = /(maria|joão)(, hoje sua esposa)/i;
const found = regExp2.exec(texto)


console.log(regExp2.exec(texto))
console.log(found[0])
console.log(found[1])
console.log(found[2])

