/**
 * Created by xueliming on 9/16/16.
 */
const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// rl.question('What do you think of Node.js? ', (answer) => {
//     // TODO: Log the answer in a database
//     console.log('Thank you for your valuable feedback:', answer);
//     rl.close();
// });

const fs = require('fs');
fs.stat('./test.txt', (err, stats) => {
    if (err) throw err;
    // console.log(`stats: ${JSON.stringify(stats)}`);
    // console.log("done >>>>> ");
});

const os = require('os');
// console.log(os.cpus());
console.log(os.platform());