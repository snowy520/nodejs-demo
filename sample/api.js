/**
 * Created by Richard Xue on 05/16/2015.
 */
var fs = require('fs');
var os = require("os");
var crypto = require("crypto");

//console.log(os.tmpdir());
//console.log(os.platform());
//
////crypto.setEngine("ENGINE_METHOD_ALL");
//var ciphers = crypto.getCiphers();
//console.log(ciphers);
//var hashes = crypto.getHashes();
//console.log(hashes);

var filename = "D:\\java技术.txt";

var shasum = crypto.createHash('sha1');

var s = fs.ReadStream(filename);
s.on('data', function(d) {
    shasum.update(d);
});

s.on('end', function() {
    var d = shasum.digest('hex');
    console.log(d + '  ' + filename);
});