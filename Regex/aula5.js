const {alfabeto} = require('./base')

//[abc] conjuntos (tenta encontrar o conjunto de caracteres informados entre colchetes)
//[^abc] e a negação, ou seja procura por tudo menos o que esta no conjunto
//[a-z] ranges 
//(para criar ranges e preciso respeitar a ordem da sequencia dos caracteres que pode ser encontrada através do link
//https://en.wikipedia.org/wiki/List_of_Unicode_characters)
console.log(alfabeto)
//o comportamento aqui por conta do + e de tentar tanto encontrar caracteres sozinho 
//quanto em sequencia ele devolve o menor trabalho possível(agrupa o máximo possível dos dados)
console.log(alfabeto.match(/[abc123]+/g))


//-----------------------------------------------------------------------------
console.log(alfabeto.match(/[0-9]+/g))
console.log(alfabeto.match(/[a-k]+/g))
console.log(alfabeto.match(/[A-Z]+/g))
console.log(alfabeto.match(/[^a-zA-Z0-9]+/g)) //negação
console.log(alfabeto.match(/[a-zA-Z0-9çã]+/g))
console.log(alfabeto.match(/[\u00A0-\u00BA]+/g)) //unicode
//dicas existem shorthands para alguns conjuntos mais comuns
//exemplo \w que e igual ao conjunto [a-zA-Z0-9_]
console.log(alfabeto.match(/[\wçã]+/g)) 
//sempre e possível negar um conjunto de um shorthand utilizando um uppercase do shorthand
//exemplo \W => negação
console.log(alfabeto.match(/\W+/g)) //negação
//alguns shorthands uteis sao 
// d para dígitos 0-9
// s encontra todos os espaços muito util sua negação mais o +
//exemplo 
console.log(alfabeto.match(/\S+/g))

