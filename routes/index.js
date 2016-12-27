var express = require('express');
var router = express.Router();
var log4js = require('log4js');

log4js.configure("./log4js.json");
var logger = log4js.getLogger('logFile');
/* GET home page. */
router.get('/', function(req, res, next) {
  logger.info('====访问时间:' + new Date());

  res.render('index', { title: '统一前置' });


});

module.exports = router;
