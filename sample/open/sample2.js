/**
 * Created by Administrator on 08/06/2015.
 */
var http = require("http");
var url = require("url");
var querystring = require("querystring");
var fs = require("fs");
var postData = querystring.stringify({
    'msg' : 'Hello World!'
});
var options = {
    hostname: 'google.com',
    port: 80,
    path: '/path',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
    }
};
var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
});

req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

// write data to request body
req.write(postData);
req.end();