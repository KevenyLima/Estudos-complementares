const {lookahead} = require("./base")
console.log(lookahead)
// console.log(lookahead.match(/.+[^in]active$/gim))
//?= lookahead 
// lookahead serve para verifica se algum esta na frase (no final ?) mas nao devolve essa parte da string
// ?! negative lookahead 
// serve para verificar se algum esta no começo da frase e nao devolve o essa parte na string
// ?<= lookbehind serve para
// ?<! negative lookbehind

// Positive lookahead (frase que ten active)
console.log(lookahead.match(/.+(?=[^in]active)/gim))

// Negative lookahead
console.log(lookahead.match(/^(?!.+[^in]active).+$/gim))
// frase que nao tem inactive
console.log(lookahead.match(/^(?!.+inactive).+$/gim))

// positive lookbehind (frases qye comecem com ONLINE)
console.log(lookahead.match(/(?<=ONLINE\s+)\S+.*/gim))
// negative lookbehind (frases que nao comecem com online)
console.log(lookahead.match(/^.+(?<!ONLINE.+)$/gim))

const cpf = `
012.250.785-90
000.000.000-01
999.999.999-99
111.111.111-11
`
console.log(cpf.match(/^(?!^(\d)\1{2}\.\1{3}\.\1{3}-\1{2}$)\d{3}\.\d{3}\.\d{3}\-\d{2}$/gm))