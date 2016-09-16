/**
 * Created by xueliming on 9/16/16.
 */
var mongodb = require('mongodb'),
    Promise = require('bluebird'),
    assert = require('assert');

// var MongoDB = Promise.promisifyAll(require("mongodb"));
Promise.promisifyAll(mongodb);
// var Connection = Promise.promisifyAll(mongodb.Collection);
var MongoClient = Promise.promisifyAll(mongodb.MongoClient);

var url = 'mongodb://localhost:27017/myproject';
MongoClient.connectAsync(url).then(function(db){
    var collection = db.collection('documents');
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log(JSON.stringify(docs));
    });
    return db;
}).then(function(db){
    db.close();
});

// MongoClient.connect(url, {promiseLibrary:Promise}).then(function(db){
//     var collection = db.collection('documents');
//     collection.find({}).toArray(function(err, docs) {
//         assert.equal(err, null);
//         console.log(JSON.stringify(docs));
//     });
//     return db;
// }).then(function(db){
//     db.close();
// }).catch(function(error) {
//     console.error("error", error);
// });