/**
 * Created by Richard Xue on 05/16/2015.
 */
var util = require("util");
var fs = require("fs");
var http = require("http");
var querystring = require("querystring");
var cheerio = require('cheerio');
var redis = require('redis');
var client = redis.createClient("6379", "99.48.18.54");
client.auth("1qaz@WSX", function(){
    console.log('auth >>> ');
});

var indexUrl = 'http://stackoverflow.com';

sendHttp(indexUrl,parseMainHtml);

function sendHttp(url,callback) {
    http.get(url, function(res){
        var chunks = [],size = 0;
        res.on("data" , function(chunk){
            chunks.push(chunk);
            size += chunk.length;
        });
        res.on("end" , function(){
            //拼接buffer
            var data = Buffer.concat(chunks , size);
            var html = data.toString();
            callback(html);
        })
    }).on('error' , function(e){
        console.log("error:"+e.message);
    }).on("success",function(e){
        console.log("success:"+e.message);
    });
}

function parseMainHtml(html) {
    var $ = cheerio.load(html);
    var $summary = $(".question-summary h3 a");
    $summary.each(function(index,ele){
        console.log('------------------------------------>');
        console.log($(ele).text());
        client.set('summary'+index,$(ele).text());
        sendHttp(indexUrl+$(ele).attr("href"),parseQuestionHtml);
    });
}

function parseQuestionHtml(html) {
    var $ = cheerio.load(html);
    var $post = $("#answers .post-text");
    var obj = {};
    var hash = 'detail'+Math.random();
    $post.each(function(index,ele){
        console.log('------------------------------------>');
        console.log($(ele).text());
        //client.set('detail'+index+"_"+Math.random(),$(ele).text());
        //obj['detail'+index] = $(ele).text();
        client.hmset(hash,'detail'+index,$(ele).text());
    });
}