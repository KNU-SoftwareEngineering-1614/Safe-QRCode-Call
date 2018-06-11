var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
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

module.exports = router;
