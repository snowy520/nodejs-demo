/**
 * Created by xueliming on 9/17/16.
 */
var mongoUtil = require('./mongo-util');
mongoUtil.init();
mongoUtil.document.findDocument(function(data){
    console.log(JSON.stringify(data));
});
