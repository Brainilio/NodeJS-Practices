const C = require('./test-module-1')

//module.exports
const calc1 = new C()

console.log(calc1.add(2, 3))

//exports
const calc2 = require('./test-module-2')

//you can also use destructuring 
const {
     add,
     multiply
} = require('./test-module-2')

console.log(add(2, 3))



//caching, if you call this multiple times, the console.log will only run once 
//if you call the function, it will return the function from teh cache

require('./test-module-3')();