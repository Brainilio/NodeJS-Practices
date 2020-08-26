const fs = require("fs")
const http = require("http")
const url = require("url")

/////////////////////////////////////////////////////////
// FILEREADER

// **** code blocking, synchronous way
/*
const textIn = fs.readFileSync("./txt/input.txt", "utf-8")
console.log(textIn)

const textOut = `This is what we know about the avocado: ${textIn}. \n created on ${Date.now()}`
fs.writeFileSync("./txt/output.txt", textOut)
console.log("file written!")
*/

// **** async way CALLBACK HELLL!!!!!!! 😩
/*
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
	fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
		console.log(data2)
		fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
			console.log(data3)
			fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
				console.log("Your file has been written!")
			})
		})
	})
})
console.log("Reading file...")
*/

////////////////////////////////
// SERVER

//executed only once when we start program

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8")
const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {
	const pathName = req.url

	if (pathName === "/" || pathName === "/overview") {
		res.end("This is the overview")
	} else if (pathName === "/product") {
		res.end("This is the product")
	} else if (pathName === "/api") {
		res.writeHead(200, {
			"Content-Type": "application/json",
		})
		res.end(data)
	} else {
		//write headers before response
		res.writeHead(404, {
			"Content-type": "text/html",
			"my-header": "my-own-header",
		})
		res.end("<h1>Page not found!</h1>")
	}
})

server.listen(8000, () => {
	console.log("Listening to requests on port 8000")
})
