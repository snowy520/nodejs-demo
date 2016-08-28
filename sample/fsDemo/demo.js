/**
 * Created by Administrator on 09/28/2015.
 */

var fs = require('fs');
//fs.rename('D:\\demo\\test.txt', 'D:\\demo\\demo.txt', function (err) {
//    if (err) throw err;
//    console.log('renamed complete');
//});

fs.stat('D:\\demo\\demo.txt', function (err, stats) {
    if (err) throw err;
    console.log(stats.isFile()+'||'+stats.isDirectory());
    console.log('stats: ' + JSON.stringify(stats));
});

