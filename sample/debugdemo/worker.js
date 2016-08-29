/**
 * Created by xueliming on 8/29/16.
 */
var debug = require('debug')('worker');

setInterval(function(){
    debug('doing some work');
}, 1000);