/**
 * Created by Administrator on 09/28/2015.
 */

console.log('Current directory: ' + process.cwd());

console.log(process.env.JAVA_HOME);

if (process.getgid) {
    console.log('Current gid: ' + process.getgid());
}

if (process.geteuid) {
    console.log('Current uid: ' + process.geteuid());
}

console.log('Version: ' + process.version);
console.log(process.versions);

console.log('-----------------------------------------');
console.log(process.config);

console.log(process.pid);

console.log('This processor architecture is ' + process.arch);
console.log('This platform is ' + process.platform);

console.log('-----------------------------------------');
//console.log(process.env);