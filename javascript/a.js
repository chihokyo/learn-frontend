const aFunc = name =>{console.log('afunc:' + name)}
const bFunc = name =>{console.log('bfunc:' + name)}
const cFunc = name =>{console.log('cfunc:' + name)}
// exports.aModule =  aFunc
// exports.bModule =  bFunc

// module.exports.aModule = aFunc
// module.exports.bModule = bFunc

console.log(module.exports)
module.exports = {
    aModule:aFunc,
    bModule:bFunc,
    cModule:cFunc
}