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

//로그인 버튼 클릭시 호출됨
//id 로 db에게 사용자 정보를 얻어오고, 비밀번호를 비교해서 진행여부 판단
//없는 아이디거나 비밀번호가 다르면 콘솔에만 출력되고, 웹페이지는 다음 페이지로 넘어가지 않음
router.post('/requestLogin',function(req,res){
  console.log("Login request : ID: "+ req.body.id + " PassWord: " + req.body.password);

  //DB에게 사용자 정보를 얻어오기 위한 요청용 URL
  var dbreqAddr = '' + dbaddr + "/getUser/" + req.body.id;
  console.log("dbRequest address: " + dbreqAddr);
  
  //DB에게 사용자 정보를 얻어오기 위한 옵션
  var DBGetDataOption = {
    url: dbreqAddr,
    method: "GET",
    json: true,
    params:{
      'userName': req.body.id
    }
  };

  request(DBGetDataOption, function(error, response, body){

    //요청에 실패할 경우
    if(error){  
      console.log("DB Connection Error! afterlogin");
      return;
    }
    //ID가 없는 ID 인 경우
    if(response.body.error){
      console.log("No User ID : " + req.body.id + " message from DB "+ response.body.error);
      return;
    }
    //비밀번호를 검사하여 다를 경우
    if(req.body.password != response.body.data.password){
      console.log("Password incorrect: " + req.body.password + " (wrong password)");
      return;
    }

    //로그인 성공
    //클라이언트의 세션에 아이디를 저장시킴
    req.session.username = req.body.id;
    req.session.save(function(){});
    console.log("Login session : ID: "+ req.session.username);

    res.render(path.join(__dirname, '../views', 'afterlogin.ejs'),{
      id : req.body.id
    }); 
   });
   //console.log("user data : " + userData["password"]);

});

//회원가입 요청
//세부사항은 로그인 요청과 유사함
router.post('/requestSignUp',function(req,res){
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

   //시작페이지로 돌아감
   res.redirect("http://localhost:3000");
});

//QR코드 요청
router.get('/myQrCode',function(req,res){
  console.log("myQrCode request : ID: "+ req.session.username);
  var qrCodeFileName = 

  res.render(path.join(__dirname, '../views', 'myQR.ejs'),{
    qr_image : req.session.username + ".jpg"
  }); 
});

//회원가입 페이지
router.get('/signUp',function(req,res){
  console.log("signUp page accessed");

  res.sendFile(path.join(__dirname, '../views', 'join.html'));
});


module.exports = router;