const {html} = require('./base')
// . significa qualquer caractere
console.log(html)
//o comportamento do regex e greedy(guloso)
// ou seja ele tenta pegar toda a string
console.log(html.match(/<.+>.+<\/.+>/g)) //greedy
//colocando o sinal de ? o regex vai tentar pegar o menor comprimento possível 
console.log(html.match(/<.+?>.+?<\/.+?>/g)) // non-greedy
