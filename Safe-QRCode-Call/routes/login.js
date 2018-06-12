var express = require('express');
var router = express.Router();
var path = require('path');
var session = require('express-session');

router.use(session({
  secret: '!@$#%!@#!@#',
  resave: false,
  saveUninitialized: true
}));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'login.html'));
});

router.get('/*.(css|js|jpg|svg|png)', function(req, res, next) {
  //console.log(req.originalUrl);
  res.sendFile(path.join(__dirname, '../views', req.originalUrl));
});

router.get('/vendor/*', function(req, res, next) {
  //console.log("get: '/vendor/*' router");
  let splitUrl = req.originalUrl.split("?");
  //console.log(splitUrl);
  res.sendFile(path.join(__dirname, '../views', splitUrl[0]));
});

router.post('/afterlogin',function(req,res){
  console.log("Login request : ID: "+ req.body.id + " PassWord: " + req.body.password);
  req.session.username = req.body.id;
  req.session.save(function(){});
  console.log("Login session : ID: "+ req.session.username);
  res.render(path.join(__dirname, '../views', 'afterlogin.ejs'),{
    id : req.session.username
  }); 
});

router.get('/myQrCode',function(req,res){
  console.log("myQrCode request : ID: "+ req.session.username);

  res.render(path.join(__dirname, '../views', 'myQR.ejs'),{
    qr_image : req.session.username + "qr-img.jpg"
  }); 
});

module.exports = router;