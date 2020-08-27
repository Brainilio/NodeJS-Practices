const EventEmitter = require('events');
const http = require('http');


// this is how different node modules implement events, so Sales int his case 
// use the events entirely.
class Sales extends EventEmitter {
     constructor() {
          super();
     }
}


const newEmitter = new Sales();


//Observer's pattern: 

// listen to the emitter
newEmitter.on('newSale', () => {
     console.log("There was a new sale!")
})

//another listener
newEmitter.on('newSale', () => {
     console.log("Costumer name: Brainilio")
})

//passed parameter to the listener (9 is being passed)
newEmitter.on('newSale', stock => {
     console.log("There are" + stock + "items left!")
})

//set event: emit an event
newEmitter.emit('newSale', 9);


////////////////////
// Another example! Set up a small webserver and see all the events.

const server = http.createServer();

// .on == is listening for an event
server.on('request', (req, res) => {
     console.log("Request received!");
     res.end("Request received");
})

server.on('request', (req, res) => {
     console.log("Another request 🍎")
})


server.on('close', () => {
     console.log('Server closed!')
})

server.listen(8000, () => {
     console.log('listening on port 8000')
})

//SERVER IS NOT SHUTTING DOWN because its waiting on I/O 