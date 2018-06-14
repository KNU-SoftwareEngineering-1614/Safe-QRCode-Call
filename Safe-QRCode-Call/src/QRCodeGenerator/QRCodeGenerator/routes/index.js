'use strict';
var express = require('express');
var router = express.Router();
var qr = require('qr-image');
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/qrGen/:phoneNum', function (req, res) {
    fs.writeFileSync("../../../../QRData/" + req.params.phoneNum + '.png', qr.imageSync("http://127.0.0.1:9531/qrShow/" + req.params.phoneNum));
    res.render('index', { title: 'QR Code Generated!' });
})

router.get('/qrShow/:phoneNum', function (req, res) {
    res.render('index', { title: 'QR Code Show : ' + req.params.phoneNum });
})
module.exports = router;
