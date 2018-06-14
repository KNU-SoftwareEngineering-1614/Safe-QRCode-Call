'use strict';
var express = require('express');
var router = express.Router();
var qr = require('qr-image');
var fs = require('fs');
var path = require('path');
var qrCodeShowAddr = "http://192.168.0.74:3000/qrCode/qrShow/";

/* GET home page. */
router.get('/', function (req, res) {
    //res.render('index', { title: 'Express' });
});

router.get('/qrGen/:phoneNum', function (req, res) {
    console.log("Qr code Gen : " + req.params.phoneNum);
    fs.writeFileSync("../QRData/" + req.params.phoneNum + '.png', qr.imageSync(qrCodeShowAddr + req.params.phoneNum));
    //res.render('index', { title: 'QR Code Generated!' });
})

router.get('/qrShow/:phoneNum', function (req, res) {
    console.log("QR show request : " + req.params.phoneNum);
    res.render(path.join(__dirname, '../views', 'qrShow.ejs'),{
        phoneNumber : req.params.phoneNum
    }); 
})
module.exports = router;
