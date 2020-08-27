const stream = require('stream')
const fs = require('fs')
const server = require('http').createServer()

server.on('request', (req, res) => {
     //Solution 1 
     //      fs.readFile('test-file.txt', (err, data) => {
     //           if (err) console.log(err)
     //           res.end(data);
     //      })

     //Solution 2: Streams: backpressure! 
     //backpressure: when response can't send data as fast as it's receiving it
     // const readable = fs.createReadStream('test-fe.txt')
     // /*
     // every time there is a new data piece we can consume, we push it to 
     // the client using the event listener
     // */
     // readable.on('data', chunk => {
     //      /* 
     //      streaming content from the file, to the client 
     //      we write it, once it's ready; we send it to the client 
     //      we read it bit by bit and every chunk that 's read, we send.
     //      */
     //      res.write(chunk)
     // })
     // //handle event once all data is read 
     // readable.on('end', () => {
     //      res.end();
     // })
     // readable.on('error', err => {
     //      console.log(err);
     //      res.statusCode = 500;
     //      res.end('File not found.')
     // })

     //Solution 3: using pipe operator to fix backpressure
     //available on each readable stream, will handle the speed of data coming in vs data going out
     const readable = fs.createReadStream('test-file.txt')
     readable.pipe(res);
     //readableSource.pipe(writabledestination)

})


server.listen(8000, () => {
     console.log("Listening to 8000")
});