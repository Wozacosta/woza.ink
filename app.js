const http = require("http");

http.createServer(function (req, res) {
	res.write("On the way to being offline buddy");
	res.end();
}).listen(3000);

console.log("Server started");
