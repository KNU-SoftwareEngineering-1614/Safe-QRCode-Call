var express = require('express');
var router = express.Router();
var path = require('path');
var session = require('express-session');
var dbaddr = "http://localhost:8081/database";
var qrCodeAddr = "http://localhost:3000/qrCode";
var request = require('request');

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
  console.log("get : 'login/*.(css|js|jpg|svg|png) : ", req.originalUrl);
  res.sendFile(path.join(__dirname, '../views', req.originalUrl));
});

router.get('/vendor/*', function(req, res, next) {
  //console.log("get: '/vendor/*' router");
  let splitUrl = req.originalUrl.split("?");
  //console.log(splitUrl);
  res.sendFile(path.join(__dirname, '../views', splitUrl[0]));
});

router.post('/requestLogin',function(req,res){
  console.log("Login request : ID: "+ req.body.id + " PassWord: " + req.body.password);
  var dbreqAddr = '' + dbaddr + "/getUser/" + req.body.id;
  console.log("dbRequest address: " + dbreqAddr);
  
  var registerToDBOptions = {
    url: dbreqAddr,
    method: "GET",
    json: true,
    params:{
      'userName': req.body.id
    }
  };

  var userData;
  request(registerToDBOptions, function(error, response, body){
    if(error){
      console.log("DB Error! afterlogin");
      return;
    }
    if(response.body.error){
      console.log("No User ID : " + req.body.id + " message from DB "+ response.body.error);
      return;
    }
    if(req.body.password != response.body.data.password){
      console.log("Password incorrect: " + req.body.password + " (wrong password)");
      return;
    }    
    req.session.username = req.body.id;
    req.session.save(function(){});
    console.log("Login session : ID: "+ req.session.username);
    res.render(path.join(__dirname, '../views', 'afterlogin.ejs'),{
      id : req.body.id
    }); 
   });
   //console.log("user data : " + userData["password"]);

});

router.post('/requestSignIn',function(req,res){
  console.log("ID: " + req.body.id + " Password: " + req.body.password + " PhoneNumber: " + req.body.phoneNumber);
  var DBreqUrl =  dbaddr + "/postUser/" + req.body.id;

  console.log("requet URL:" + DBreqUrl);

  var registerToDBOptions = {
    url: DBreqUrl,
    method: "POST",
    json: true,
    headers: {},
    body:
    {
      json: true,
      'username': req.body.id,
      'password': req.body.password,
      'number': req.body.phoneNumber,
      'qr_code': req.body.phoneNumber + ".png",
      'fake_num': req.body.phoneNumber
    },
  };

  request(registerToDBOptions, function(error, response, body){
    if(error){
      console.log("DB Error! requestSignIn");
    }
   });

   var qrGenReqUrl =  qrCodeAddr + "/qrGen/" + req.body.phoneNumber;
   console.log("requet URL:" + qrGenReqUrl);

   var qrgenOptions = {
    url: qrGenReqUrl,
    method: "GET",
    json: true,
    params:{
      'phoneNum': req.body.phoneNumber
    }
  };

  request(qrgenOptions, function(error, response, body){
    if(error){
      console.log("DB Error! qrgen");
    }
   });

   res.redirect("http://localhost:3000");


});


router.get('/myQrCode',function(req,res){
  console.log("myQrCode request : ID: "+ req.session.username);

  res.render(path.join(__dirname, '../views', 'myQR.ejs'),{
    qr_image : req.session.username + "qr-img.jpg"
  }); 
});

router.get('/signUp',function(req,res){
  console.log("signUp page accessed");

  res.sendFile(path.join(__dirname, '../views', 'join.html'));
});


module.exports = router;