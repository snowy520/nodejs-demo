/**
 * Created by Richard Xue on 05/16/2015.
 */
var fs = require("fs");
var mailer = require("nodemailer");
var tranport = require('nodemailer-smtp-transport');
var opts = {
    service: "QQ",
    auth: {
        user: "297857539@qq.com",
        pass: "Snow1988"
    }
};
var transporter = mailer.createTransport(tranport(opts));
var mail = {
    from: "xxx@qq.com",
    to: "xxx@qq.com",
    cc:"xxx@gmail.com",
    subject: "Send Email Using Node.js",
    text: "Node.js New world for me",
    html: "<b>Node.js New world for me</b>",
    attachments:[
        {
            filename:"test.txt",
            //path:"D:\\工作表.xls",
            //content: fs.createReadStream('D:\\java技术.txt'),
            content: 'hello world!',
            contentType: 'text/plain'
        }]
};
transporter.sendMail(mail, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log(JSON.stringify(info));
        console.log("Message sent: " + info.response);
    }
    transporter.close();
});
