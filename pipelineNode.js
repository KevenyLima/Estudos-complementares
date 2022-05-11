process.stdin.pipe(process.stdout)

.on('data', msg => console.log('data terminal',msg.toString()))
// eventos 
// .on("error")
// .on("end")
// .on("close")