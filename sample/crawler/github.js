/**
 * Created by Richard Xue on 05/16/2015.
 */
var util = require("util");
var fs = require("fs");
var https = require('https');
var querystring = require("querystring");
var cheerio = require('cheerio');

var trendingUrl = 'https://github.com/trending';
var indexUrl = 'https://github.com';

sendHttp(trendingUrl,parseMainHtml);

function sendHttp(url,callback) {
    https.get(url, function(res){
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
    var $summary = $("li.repo-list-item h3 a");
    $summary.each(function(index,ele){
        console.log('------------------------------------>');
        var item = $(ele).text().replace(/\s+/g,"");
        console.log(item);
        //sendHttp(indexUrl+$(ele).attr("href"),parseQuestionHtml);
    });
}

function parseQuestionHtml(html) {
    var $ = cheerio.load(html);
    console.log(html);
    //var $post = $("#answers .post-text");
    //$post.each(function(index,ele){
    //    console.log('------------------------------------>');
    //    console.log($(ele).text());
    //});
}