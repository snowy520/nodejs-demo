/**
 * Created by Administrator on 08/06/2015.
 */

var http = require("http");
var url = require("url");
var querystring = require("querystring");
var fs = require("fs");

var openApi = "http://api.map.baidu.com/location/ip?ak=2d4f52910b0a8ea5f76de16c8d131468&ip=202.198.16.3&coor=bd09ll";

http.get(openApi, function(res){
    var chunks = [],size = 0;
    res.on("data" , function(chunk){
        chunks.push(chunk);
        size += chunk.length;
    });
    res.on("end" , function(){
        var data = Buffer.concat(chunks , size);
        console.log(JSON.parse(data));
        //var html = data.toString();
        //console.log(html);
    })
}).on('error' , function(e){
    console.log("error:"+e.message);
});