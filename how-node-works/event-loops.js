const fs = require('fs')
const crypto = require('crypto')

const start = Date.now()
process.env.UV_THREADPOOL_SIZE = 1; //only 1 thread in threadpool


setTimeout(() => {
     console.log('Time 1 finished');
}, 0);

setImmediate(() => console.log("Immediate 1 finished"))


fs.readFile('text-file.txt', () => {
     console.log('I/O Finished');
     console.log('--------------------');

     setTimeout(() => {
          console.log('Time 2 finished');
     }, 0);

     setTimeout(() => {
          console.log('Time 3 finished');
     }, 3000);

     setImmediate(() => console.log("Immediate 2 finished"))

     //Part of microtask queue, gets called after each phase
     process.nextTick(() => console.log('Process.nextTick'))

     crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
          console.log(Date.now() - start, "Password hashed")
     });

     crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
          console.log(Date.now() - start, "Password hashed")
     });

     crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
          console.log(Date.now() - start, "Password hashed")
     });

     crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
          console.log(Date.now() - start, "Password hashed")
     });
})


console.log("Hello from the top-level code!")