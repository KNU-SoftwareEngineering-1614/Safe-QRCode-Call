'use strict';
var express = require('express');
var router = express.Router();
var qr = require('qr-image');
var fs = require('fs');
var path = require('path');

//qr 코드를 찍으면 qrCodeShowAddr + "/" + fakenum 으로 연결됩니다.
//qr 코드 생성시에도 이 변수를 사용합니다.
//테스트 해보려면 이 주소를 테스트하는 PC의 주소로 써서 생성해야합니다.
var qrCodeShowAddr = "http://192.168.0.74:3000/qrCode/qrShow/";

/* GET home page. */
router.get('/', function (req, res) {
    //res.render('index', { title: 'Express' });
});

//fakeNum 을 정보로 qr코드를 생성
router.get('/qrGen/:fakeNum', function (req, res) {
    console.log("Qr code Gen : " + req.params.fakeNum);
    
    //데이터 보관소에 보관 (myQR 페이지에서 이 디렉토리에 있는 파일은 정적 파일 전송 문제로 전송이 불가능함. 그래서 주석처리하였습니다.)
    //fs.writeFileSync("../QRData/" + req.params.fakeNum + '.png', qr.imageSync(qrCodeShowAddr + req.params.fakeNum));
    
    //view폴더 안에 qr코드 이미지 파일을 넣습니다.
    fs.writeFileSync("views/" + req.params.fakeNum + '.png', qr.imageSync(qrCodeShowAddr + req.params.fakeNum));
    //res.render('index', { title: 'QR Code fakeNum!' });
})

//QR코드를 찍으면 해당 QR코드안에 들어있는 정보를 페이지에 띄워줌
router.get('/qrShow/:fakeNum', function (req, res) {
    console.log("QR show request : " + req.params.fakeNum);
    res.render(path.join(__dirname, '../views', 'qrShow.ejs'),{
        fakeNum : req.params.fakeNum
    }); 
})
module.exports = router;
