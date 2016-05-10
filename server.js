//
//
//
var http = require('http');
var path = require('path');

var express = require('express');

//
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var app = express();
var server = http.createServer(app);

app.use(express.static(path.resolve(__dirname, 'client')));

app.get('/api/whoami', function(req, res) {
// 	console.log(JSON.stringify(req.headers));
	var obj = {
		ipaddress: req.headers["x-forwarded-for"],
		language: req.headers["accept-language"].replace(/,.*/, ""),
		os: req.headers["user-agent"].replace(/.*?\((.*?)\).*/, "$1")
	};

	res.header('Content-Type', 'application/json');

	res.send(JSON.stringify(obj));
	
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});
