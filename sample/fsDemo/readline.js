/**
 * Created by Administrator on 09/28/2015.
 */
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    completer:completer
});

rl.setPrompt('prompt > ');
rl.prompt();

//rl.question("What do you think of Node.js? ", function(answer) {
//    // TODO: Log the answer in a database
//    console.log("Thank you for your valuable feedback:", answer);
//
//    rl.close();
//});

function completer(line) {
    var completions = '.help .error .exit .quit .q'.split(' ');
    var hits = completions.filter(function(c) { return c.indexOf(line) == 0 });
    // show all completions if none found
    return [hits.length ? hits : completions, line]
}

rl.on('line', function(line) {
    console.log(line);
    switch(line.trim()) {
        case 'hello':
            console.log('world!');
            break;
        default:
            console.log('Say what? I might have heard `' + line.trim() + '`');
            break;
    }
    rl.prompt();
}).on('close', function() {
    console.log('Have a great day!');
    process.exit(0);
});

