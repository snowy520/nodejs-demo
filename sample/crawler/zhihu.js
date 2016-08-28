/**
 * Created by xueliming on 10/31/15.
 */
var cheerio = require('cheerio');
var http = require("http");
var url = require("url");
var querystring = require("querystring");
var fs = require("fs");

http.get('http://www.zhihu.com/', function(res){
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