var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var log4js = require('log4js');

var logger = log4js.getLogger();

var url = 'mongodb://localhost:27017/test';
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    logger.info("Connected correctly to server.");
    db.close();
});
