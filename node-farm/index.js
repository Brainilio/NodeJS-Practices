const fs = require("fs")
const http = require("http")
const url = require("url")
const replaceTemplate = require("./modules/replaceTemplate")

////////////////////////////////
// SERVER
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
