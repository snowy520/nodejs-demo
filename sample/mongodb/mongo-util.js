/**
 * Created by xueliming on 9/17/16.
 */
var MongoDB = require('mongodb'),
    Promise = require('bluebird'),
    assert = require('assert');

var MongoClient = MongoDB.MongoClient;
var url = 'mongodb://localhost:27017/myproject';

function saveDocument(doc) {
    MongoClient.connect(url, {promiseLibrary:Promise}).then(function(db){
        var collection = db.collection('documents');
        collection.find({}).toArray(function(err, docs) {
            assert.equal(err, null);
            console.log(JSON.stringify(docs));
        });
        return db;
    }).then(function(db){
        db.close();
    }).catch(function(error) {
        console.error("error", error);
    });
}

function findDocument(filter, callback) {
    if(filter && typeof filter  == 'function') {
        callback = filter;
        filter = {};
    }
    _operateDb('documents', function(collection) {
        collection.find(filter).toArray(function(err, docs) {
            assert.equal(err, null);
            if(callback && typeof callback == 'function') {
                callback(docs);
            }
        });
    });
}

function _operateDb(collectionName, callback) {
    var result;
    MongoClient.connect(url, {promiseLibrary:Promise}).then(function(db){
        result = callback(db.collection(collectionName));
        return db;
    }).then(function(db){
        db.close();
    }).then(function(){
        return result;
    }).catch(function(error) {
        console.error("error", error);
    });
}

var document = {
    saveDocument : saveDocument,
    findDocument : findDocument
};

exports.document = document;
