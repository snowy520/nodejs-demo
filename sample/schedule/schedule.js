/**
 * Created by Administrator on 05/16/2015.
 */
var schedule = require("node-schedule");
var util = require('util');
var moment = require('moment');
var dateUtils = require('date-utils');
var date = new Date(2015,5,16,15,29,0);

console.log(">>>>>>");

var j = schedule.scheduleJob(date, function(){
    console.log("execute j");
});
 // cancel
//j.cancel();

var rule = new schedule.RecurrenceRule();
//rule.dayOfWeek = [0, new schedule.Range(1, 6)];
//rule.hour = 10;
//rule.minute = 40;
var times = [];
for(var i=1; i<60; i++){
    times.push(i);
}
rule.second = times;
var jj = schedule.scheduleJob(rule, function(){
    console.log("execute jj");
    new Date().toFormat("YYYY");
});
//jj.cancel();


