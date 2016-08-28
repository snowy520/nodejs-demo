/**
 * Created by Administrator on 06/04/2015.
 */
var redis = require('redis');
var client = redis.createClient("6379", "localhost");
client.auth("1qaz@WSX", function(){
    console.log('auth >>> ');
});
//client.on('connect', function() {
//    console.log('connected');
//});

client.set('framework', 'AngularJS');
// client.set(['framework', 'AngularJS']);

client.set('framework', 'AngularJS', function(err, reply) {
    console.log(err+"||"+reply);
});

client.get('framework', function(err, reply) {
    console.log(err+"||"+reply);
});

//client.hmset('frameworks', 'javascript', 'AngularJS', 'css', 'Bootstrap', 'node', 'Express');
//
//client.hmget('frameworks', function(err, object) {
//    console.log(object);
//});

client.hmset('frameworks', {
    'javascript': 'AngularJS',
    'css': 'Bootstrap',
    'node': 'Express'
});

//client.rpush(['frameworks', 'angularjs', 'backbone'], function(err, reply) {
//    console.log(reply); //prints 2
//});
//
//client.lrange('frameworks', 0, -1, function(err, reply) {
//    console.log(reply); // ['angularjs', 'backbone']
//});
//
//client.sadd(['tags', 'angularjs', 'backbonejs', 'emberjs'], function(err, reply) {
//    console.log(reply); // 3
//});
//
//client.smembers('tags', function(err, reply) {
//    console.log(reply);
//});
//
//client.exists('key', function(err, reply) {
//    if (reply === 1) {
//        console.log('exists');
//    } else {
//        console.log('doesn\'t exist');
//    }
//});

//client.end();