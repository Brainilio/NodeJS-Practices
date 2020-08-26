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

//replace template, based on the product that you have
const replaceTemplate = (temp, product) => {
	let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName)
	output = output.replace(/{%IMAGE%}/g, product.image)
	output = output.replace(/{%PRICE%}/g, product.price)
	output = output.replace(/{%FROM%}/g, product.from)
	output = output.replace(/{%NUTRIENTS%}/g, product.nutrients)
	output = output.replace(/{%QUANTITY%}/g, product.quantity)
	output = output.replace(/{%DESCRIPTION%}/g, product.description)
	output = output.replace(/{%ID%}/g, product.id)

	if (!product.organic) {
		output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic")
	}

	return output
}

//templates
const tempOverview = fs.readFileSync(
	`${__dirname}/templates/template-overview.html`,
	"utf-8"
)
const tempCard = fs.readFileSync(
	`${__dirname}/templates/template-card.html`,
	"utf-8"
)
const tempProduct = fs.readFileSync(
	`${__dirname}/templates/template-product.html`,
	"utf-8"
)

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8")
const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {
	const { query, pathname } = url.parse(req.url, true)

	//overview
	if (pathname === "/" || pathname === "/overview") {
		res.writeHead(200, {
			"Content-Type": "text/html",
		})

		//loop through cards and replace all templatecards {%something%} with
		//the data in the data and ten join
		const cardsHtml = dataObj
			.map((el) => replaceTemplate(tempCard, el))
			.join("")
		//then replace the product_cards with all the objects that you have from the cardshtml
		const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml)
		res.end(output)
	}

	//product page
	else if (pathname === "/product") {
		//return element based on query string
		const product = dataObj[query.id]
		//replace all variables with the properties
		const output = replaceTemplate(tempProduct, product)
		//send output with replaced templates
		res.end(output)
	}

	//API
	else if (pathname === "/api") {
		res.writeHead(200, {
			"Content-Type": "application/json",
		})
		res.end(data)
	}

	//Not found
	else {
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
