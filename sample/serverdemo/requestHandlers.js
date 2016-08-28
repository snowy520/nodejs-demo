/**
 * Created by Richard on 2015/4/20.
 */
var querystring = require("querystring"),
    fs = require("fs"),
    util = require("util"),
    formidable = require("formidable");

function start(response) {
    console.log("Request handler 'start' was called.");

    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" enctype="multipart/form-data" '+
        'method="post">'+
        '<input type="file" name="upload" multiple="multiple">'+
        '<input type="submit" value="Upload file" />'+
        '</form>'+
        '</body>'+
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {
    console.log("Request handler 'upload' was called.");

    var form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(request, function(error, fields, files) {
        console.log("parsing done");

        // 从C盘重命名文件并保存到F盘就会导致 cross-device link not permitted
        //fs.renameSync(files.upload.path, "C:/temp/test0.png");

        var readStream = fs.createReadStream(files.upload.path)
        var writeStream = fs.createWriteStream("E:/tmp/test0.png");
        // node.js 0.6 and earlier you can use util.pump
        //util.pump(readStream, writeStream, function() {
        //    fs.unlinkSync(files.upload.path);
        //});

        readStream.pipe(writeStream);
        readStream.on('end',function() {
            fs.unlinkSync(files.upload.path);
        });

        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        //response.write("You've sent the text: "+querystring.parse(postData).text);
        response.end();
    });
}

function show(response) {
    console.log("Request handler 'show' was called.");
    fs.readFile("/tmp/test.png", "binary", function(error, file) {
        if(error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;