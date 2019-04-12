const express = require('express')
const path = require('path')
const nodemailer = require('nodemailer');
var bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000



express()
  .use(express.static(path.join(__dirname, '/')))
  .use( bodyParser.json() )
  .use(bodyParser.urlencoded({     // to support URL-encoded bodies
      extended: true
  }))
  .get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
   })
  .post('/mail', handleEmail)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))




function handleEmail(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var message = req.body.message;
     
    // Not the movie transporter!
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'me@joma.io', // Your email id
            pass: process.env.PASSWORD // Your password
        }
    });
    var mailOptions = {
        from: email, // sender address
        to: 'me@joma.io', // list of receivers
        subject: name + " sent you a Message", // Subject line
        text: message + "\n\n" + email,
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.json({err: 'error'});
        }else{
            console.log('Message sent: ' + info.response);
            res.json({result: "sucess"});
        };
    });
}
