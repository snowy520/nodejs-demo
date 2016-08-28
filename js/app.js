'use strict';
console.log('--->');
var http = require('http'),
    fs = require('fs');

console.log('--->');

http.createServer(function(request, response) {
	console.log('--->waiting');
    fs.readFile('views/index.html', { encoding: 'utf8' }, function(error, file) {
    	console.log('--->index');
        if (!error) {
            response.writeHead(200, { 'Content-Type': 'text/html'});
            response.write(file);
            response.end();
        }
    });
}).listen(8888);