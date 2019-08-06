/**
 * Created by xueliming on 9/17/16.
 */
var mongoUtil = require('./mongo-util');
var log4js = require('log4js');
var logger = log4js.getLogger();

mongoUtil.init();
mongoUtil.document.findDocument(function(data){
    logger.info(JSON.stringify(data));
});
