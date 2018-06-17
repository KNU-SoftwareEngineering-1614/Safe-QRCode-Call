var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

// it is rough code, so we will fix it
router.get('/*.(css|js|jpg|svg|png)', function(req, res, next) {
  //console.log("get : '/*.(css|js|jpg|svg|png) : ", req.originalUrl);
  let splitUrl = req.originalUrl.split("/");
  //console.log(splitUrl);
  if (splitUrl[1] == "login") {
    res.sendFile(path.join(__dirname, '../views', splitUrl[2]));
  }
  else {
    res.sendFile(path.join(__dirname, '../views', req.originalUrl));
  }
});

router.get('/*.html', function(req, res, next) {
  //console.log("  get: '/*.html' router : ", req.originalUrl);
  let splitUrl = req.originalUrl.split("/");
  console.log(splitUrl[splitUrl.length - 1]);
  res.sendFile(path.join(__dirname, '../views', splitUrl[splitUrl.length - 1]));
});

router.get('/vendor/*', function(req, res, next) {
  //console.log("get: '/vendor/*' router");
  let splitUrl = req.originalUrl.split("?");
  //console.log(splitUrl);
  res.sendFile(path.join(__dirname, '../views', splitUrl[0]));
});

module.exports = router;
