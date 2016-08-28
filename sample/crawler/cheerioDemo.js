/**
 * Created by Richard on 2015/4/21.
 */
var cheerio = require('cheerio');
var http = require("http");
var url = require("url");
var querystring = require("querystring");
var fs = require("fs");

var $ = cheerio.load('<h2 class="title">Hello world</h2>');

$('h2.title').text('Hello there!');
$('h2').addClass('welcome');

//console.log($.html());

http.get('http://www.baidu.com', function(res){
    var chunks = [],size = 0;
    res.on("data" , function(chunk){
        chunks.push(chunk);
        size += chunk.length;
    });
    res.on("end" , function(){
        //拼接buffer
        var data = Buffer.concat(chunks , size);

        var html = data.toString();
        var $ = cheerio.load(html);
        var blogs = [];
        console.log(html);
    })
}).on('error' , function(e){
    console.log("error:"+e.message);
});