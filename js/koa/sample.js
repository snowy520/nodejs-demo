var koa = require('koa');
var app = new koa();

// logger

app.use(function *(next){
    var start = new Date;
    //noinspection JSAnnotator
    yield next;
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});

// response

app.use(function *(){
    this.body = 'Hello World';
});

app.listen(3000);
