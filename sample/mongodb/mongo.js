/**
 * Created by xueliming on 6/4/16.
 */
var cheerio = require('cheerio');
var http = require("http");
var https = require("https");
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var util = require('util');
var uuid = require('node-uuid');

var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

function generateMixed(n) {
    var res = "";
    for(var i = 0; i < n ; i ++) {
        var id = Math.ceil(Math.random()*35);
        res += chars[id];
    }
    return res;
}

var zhihuUrl = "https://www.zhihu.com";
var peopleUrl = zhihuUrl + "/people";

var scanStart = function() {
    var url = 'mongodb://localhost:27017/zhihu';
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("scan from zhihu_urls >>>>>>>>>>>>>>>> ");
        db.collection("zhihu_urls").findOne({},function(err, docs) {
            assert.equal(err, null);
            if(docs) {
                console.log(JSON.stringify(docs));
                db.close();
                deletePerson(docs.name);
                console.log("-----------------------------------");
                scanPerson(docs.url);
            } else {
                db.close();
            }
        });
    });
};

var deletePerson = function(name) {
    var url = 'mongodb://localhost:27017/zhihu';
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("delete from zhihu_urls >>>>>>>>>>>>>>>> "+name);
        db.collection("zhihu_urls").deleteOne({name:name},function(err) {
            assert.equal(err, null);
            db.close();
        });
    });
};


var insertTest = function () {
    var url = 'mongodb://localhost:27017/zhihu';
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("find from zhihu_urls >>>>>>>>>>>>>>>> ");
        var personArray = [];
        personArray.push({name:"jennywang-94",url:"https://www.zhihu.com/people/jennywang-94"});
        personArray.push({name:"shang-shang-37-50",url:"https://www.zhihu.com/people/shang-shang-37-50"});
        db.collection("zhihu_urls").insertMany(personArray,function(err, docs) {
            assert.equal(err, null);
            console.log(JSON.stringify(docs.ops));
            db.close();
        });
    });
};




var scanPerson = function(personUrl) {
    console.log("scanPerson >>>>>>>>>>>>>");

    // var options = {
    //     host: 'www.zhihu.com',
    //     path: personUrl.replace(zhihuUrl,""),
    //     method: 'GET',
    //     headers:{
    //         'Content-Type' : 'application/x-www-form-urlencoded',
    //         'Cookie':'_za=2c0f566d-2872-40bb-8991-76e895694466; _xsrf=a1d3bc8b7f9941c863ba8c3414af908d; udid="AGCArzz8lgmPTq9LRqk9D_eFlgmyRNQq0mQ=|1457531274"; d_c0="AECAZz-gogmPTiveYnseNrEZIOOe1jQKdGE=|1461075894"; _zap=cf2bc064-3157-4192-98e7-be42128bbf1a; _ga=GA1.2.2042860380.1425218689; __utmt=1; q_c1=42cd910acda84d59b4cf4e32c170aa66|1465038419000|1465038419000; l_cap_id="NWNiYmNhZmQ5ZTdkNDI5ODg2MjI5OWQ2NTUyN2QwMjE=|1465038419|513d94e1601414f7d90599d074b81e355b566a96"; cap_id="OTBlYThhMjE0M2Q2NDhjYzk1MTRjMTUyOWFkNWNiYjk=|1465038419|a4c865c2e37d2d8e1eb9a00cdfda1b1ee124d1ac"; login="MGYzM2U2NGE5NTQ1NGNhZDg2ZWNmZTMyYWQxN2MwNjQ=|1465038440|609d78d5fa0723a02b58fae502a87dab7320a5a6"; n_c=1; a_t="2.0AAAAQMIhAAAXAAAAaUN6VwAAAEDCIQAAAECAZz-gogkXAAAAYQJVTWhDelcApH2gztw0MWPtZuFsrkyrE677_RAxSWvMOifUyYD0BidJdLVUIjmRsw=="; __utma=51854390.2042860380.1425218689.1465036874.1465036874.1; __utmb=51854390.14.10.1465036874; __utmc=51854390; __utmz=51854390.1465036874.1.1.utmcsr=zhihu.com|utmccn=(referral)|utmcmd=referral|utmcct=/people/jennywang-94; __utmv=51854390.100-1|2=registration_date=20131203=1^3=entry_date=20131203=1'
    //     }
    // };

    https.get(personUrl, function(res){
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
            // console.log(html);

            var $headerMain = $(".zm-profile-header-main");
            var name = $headerMain.find(".name").text();
            var bio = $headerMain.find(".bio").text();
            var location = $headerMain.find(".location").attr("title");
            var business = $headerMain.find(".business").attr("title");
            var $genderLb = $headerMain.find(".gender").find("i");
            var gender = "未知";
            if($genderLb.hasClass("icon-profile-female")) {
                gender = "女";
            } else if($genderLb.hasClass("icon-profile-male")) {
                gender = "男";
            }
            var employment = $headerMain.find(".employment").attr("title");
            var position = $headerMain.find(".position").attr("title");
            var education = $headerMain.find(".education").attr("title");

            var $profileFollowing = $(".zm-profile-side-following");
            var followees = 0,followers = 0,followeesUrl ="",followersUrl="";
            $profileFollowing.find("a").each(function(i,ele){
                if(i == 0) {
                    followeesUrl = $(ele).attr("href");
                    followees = $(ele).find("strong").text();
                } else if(i == 1) {
                    followersUrl = $(ele).attr("href");
                    followers = $(ele).find("strong").text();
                }
            });

            var urlJson = {
                name:personUrl.replace(peopleUrl+"/",""),
                url:personUrl
            };
            console.log(JSON.stringify(urlJson));
            saveMongo("zhihu_done_urls",urlJson);

            var person = {
                name:name,
                bio:bio,
                location:location,
                business:business,
                gender:gender,
                employment:employment,
                position:position,
                education:education,
                followees:followees,
                followers:followers,
                no:uuid.v1()
            };
            console.log(JSON.stringify(person));
            saveMongo("zhihu_persons",person);

            // scanFollowees(followeesUrl);
            // scanFollowers(followersUrl);

            var answers = [],asks = [];
            // 问题
            var $asks = $("#zh-profile-ask-inner-list");
            $asks.find("a.question_link").each(function(i,ele){
                var askJson = {
                    person_no:person.no,
                    question:$(ele).text(),
                    url:zhihuUrl+$(ele).attr("href")
                };
                asks.push(askJson);
                // saveMongo("zhihu_questions",askJson);
            });
            if(asks.length > 0) {
                saveMongoArray("zhihu_asks",asks);
            }
            // 回答
            var $answers = $("#zh-profile-answers-inner-list");
            $answers.find("a.question_link").each(function(i,ele){
                var answerJson = {
                    person_no:person.no,
                    question:$(ele).text(),
                    url:zhihuUrl+$(ele).attr("href")
                };
                answers.push(answerJson);
                // saveMongo("zhihu_answers",answerJson);
            });
            if(answers.length > 0) {
                saveMongoArray("zhihu_answers",answers);
                for(var i=0;i<answers.length;i++) {
                    scanAnswer(answers[i].url);
                }
            }

        })
    }).on('error' , function(e){
        console.log("error:"+e.message);
    });
};

var scanAnswer = function(answerUrl) {
    console.log("scanAnswer >>>>>>>>>>>>>"+answerUrl);
    https.get(answerUrl, function(res){
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
            // console.log(html);

            var name = $("a.zg-anchor-hidden").attr("name");
            if(!name) {
                return;
            }
            var answerId = name.replace("answer-","");
            var commentUrl = zhihuUrl+"/r/answers/"+answerId+"/comments";
            console.log(commentUrl);

            https.get(commentUrl, function(res){
                var chunks = [],size = 0;
                res.on("data" , function(chunk){
                    chunks.push(chunk);
                    size += chunk.length;
                });
                res.on("end" , function(){
                    //拼接buffer
                    var data = Buffer.concat(chunks , size);
                    var contentJsonStr = data.toString();
                    // console.log(contentJsonStr);
                    if(contentJsonStr) {
                        var contentJson = JSON.parse(data.toString());

                        for(var i=0;i<contentJson.data.length;i++) {
                            var item = contentJson.data[i];
                            // console.log(JSON.stringify(item.author));
                            var href = item.author.url;
                            if(!href) {
                                continue;
                            }
                            var name = href.substring(href.lastIndexOf("/")+1);
                            var urlJson = {
                                name:name,
                                url:peopleUrl+"/"+name
                            };
                            saveMongo("zhihu_urls", urlJson);
                        }

                        contentJson.answer_id = answerId;
                        saveMongo("zhihu_comments",contentJson);
                    }
                })
            }).on('error' , function(e){
                console.log("error:"+e.message);
            });
        })
    }).on('error' , function(e){
        console.log("error:"+e.message);
    });
};

var scanFollowees = function(followeesUrl) {
    console.log("scanFollowees >>>>>>>>>>>>>");
    https.get(followeesUrl, function(res){
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
            // console.log(html);

            var urlArray = [];
            var $followList = $("#zh-profile-follows-list");
            $followList.find("").each(function(i,ele){
               var url = $(ele).find("h2 a").attr("href");
                console.log(url);
                var urlJson = {
                    name:url.replace(peopleUrl+"/",""),
                    url:url
                };
                urlArray.push(urlJson);
                console.log(JSON.stringify(urlJson));
            });


            // for (var i=0;i<urlArray.length;i++) {
            //     saveMongo("zhihu_urls",urlArray[i]);
            // }

        })
    }).on('error' , function(e){
        console.log("error:"+e.message);
    });
};

var scanFollowers = function(followersUrl) {
    console.log("scanFollowers >>>>>>>>>>>>>");
    https.get(followersUrl, function(res){
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
            // console.log(html);

            var urlArray = [];
            var $followList = $("#zh-profile-follows-list");
            $followList.each(function(i,ele){
                var url = $(ele).find("h2 a").attr("href");
                console.log(url);
                var urlJson = {
                    name:url.replace(zhihuUrl,""),
                    url:url
                };
                urlArray.push(urlJson);
            });

            // console.log(JSON.stringify(urlJson));
            for (var i=0;i<urlArray.length;i++) {
                saveMongo("zhihu_urls",urlArray[i]);
                scanPerson(urlArray[i].url);
            }

        })
    }).on('error' , function(e){
        console.log("error:"+e.message);
    });
};

// var scanFolloweesUrl = zhihuUrl+"/people/jennywang-94/followees";
// scanFollowees(scanFolloweesUrl);

var saveMongo = function(collection,jsonData) {
    var url = 'mongodb://localhost:27017/zhihu';
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        insertDocument(db,collection,jsonData,function(){
            db.close();
        });

    });
};

var saveMongoArray = function(collection,jsonArray) {
    var url = 'mongodb://localhost:27017/zhihu';
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        db.collection(collection).insertMany(jsonArray,function(err, result) {
            assert.equal(err, null);
            console.log("Inserted a document into the '"+collection+"'' collection.");
            db.close();
        });

    });
};

var insertDocument = function(db,collection,dataJson,callback) {
    console.log(JSON.stringify(dataJson));
    if(collection == "zhihu_urls") {
        db.collection("zhihu_done_urls").findOne({name:dataJson.name},function(err, result){
            if(result) {
                console.log(JSON.stringify(result));
                callback(result);
            } else {
                db.collection(collection).insertOne(dataJson,function(err, result) {
                    assert.equal(err, null);
                    console.log("Inserted a document into the '"+collection+"'' collection.");
                    callback(result);
                });
            }
        });
    } else {
        db.collection(collection).insertOne(dataJson,function(err, result) {
            assert.equal(err, null);
            console.log("Inserted a document into the '"+collection+"'' collection.");
            callback(result);
        });
    }
};

// insertTest();
// scanAnswer("https://www.zhihu.com/question/35414364/answer/99174079?from=profile_answer_card");
setInterval(scanStart,200);

