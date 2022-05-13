const {cpfs,ips} = require('./base')
// ^ -> Começa com
// $ -> Termina com
// execícios

// pegando os cpfs validos
console.log(cpfs)
console.log(cpfs.match(/[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}/g))

// pegando apenas ips validos
console.log(ips)
// 250-255 /25[0-5]/
// 200-249 /2[0-4]\d/
// 100-199 /1\d{2}/
// 10-99 /[1-9]\d/
// 0-9  /\d/
for(i = 0 ; i <= 300 ; i++ ){
  const ip = `${i}.${i}.${i}.${i}`
  console.log(ip,ip.match(/((25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)/g))
}

console.log(ips,ips.match(/((25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)/g))
