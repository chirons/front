var express = require('express');
var router = express.Router();
var log4js = require('log4js');
var fs = require('fs');
var path = require('path');
var propertiesparser = require('properties-parser');
var BaseCfgModel = require('../model/basecfg');


log4js.configure("./log4js.json");
var logger = log4js.getLogger('logFile');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: '统一前置' });
});

/**数据库设置*/
router.get('/dbset', function(req, res, next){
    res.render('dbset', { title: '数据库连接' });
});

/**数据库设置*/
router.post('/dbset', function(req, res, next){

    //获取原来文件中的properties键值对
    var editor = propertiesparser.createEditor(path.join(__dirname, '..', 'settings.properties'));

    editor.set("dbset.dbtype", req.body.dbtype);
    if(req.body.isencrypt == "1")
    {
        editor.set("cookie.cryptstr", req.body.encryptstr);
    }
    editor.set("dbset.dburl", req.body.dburl);
    editor.set("dbset.dbuser", req.body.dbuser);
    editor.set("dbset.dbpwd", req.body.dbpwd);

    //将修改的信息重新保存到文件中
    fs.writeFileSync(path.join(__dirname, '..', 'settings.properties'), editor.toString(), {encoding : 'UTF-8'});

    //TODO 重启服务器.方法：采用观察者模式，发送消息给观察者，让观察者重启服务器
    return res.render('dbset', {'success': '保存成功!!'});
});

router.get('/tranway', function(req, res, next){

    BaseCfgModel.find({type: 1}, function(err, list) {
        return res.render('tranway', {ways: list});
    })
});

router.post('/tranway/add', function(req, res, next){

    var BaseCfg = new BaseCfgModel({
        name : req.body.wayname,
        type : 1,
        desc : req.body.waydesc
    });

    BaseCfg.save(function(err, result){
        if(err)
        {
            res.send({error : '添加通讯方式失败: [' + err + ']'});
        }
        else
        {
            res.send({success : '添加通讯方式成功.'});
        }
    });
});

router.post('/tranway/del', function(req, res, next){

    console.log("要删除通讯方式:" + req.body.wayname);

    var conditions = {
        name : req.body.wayname,
        type : 1
    };

    BaseCfgModel.remove(conditions, function(err, result){
        if(err)
        {
            res.send({error : '通讯方式[' + req.body.name + '].删除失败: [' + err + ']'});
        }
        else
        {
            res.send({success : '通讯方式删除成功!'});
        }
    });
});


router.get('/msgfmt', function(req, res, next){

    BaseCfgModel.find({type: 2}, function(err, list) {
        return res.render('msgfmt', {msgfmts: list});
    })
});

router.post('/msgfmt/add', function(req, res, next){
    var BaseCfg = new BaseCfgModel({
        name : req.body.fmtname,
        type : 2,
        desc : req.body.fmtdesc
    });

    BaseCfg.save(function(err, result){
        if(err)
        {
            res.send({error : '添加报文格式失败: [' + err + ']'});
        }
        else
        {
            res.send({success : '添加报文格式成功!'});
        }
    });
});

router.post('/msgfmt/del', function(req, res, next){

    console.log("删除报文格式.: ["+req.body.fmtname+"]");

    var conditions = {
        name : req.body.fmtname,
        type : 2
    };

    BaseCfgModel.remove(conditions, function(err, result){
        if(err)
        {
            res.send({error : '报文格式[' + req.body.name + '].删除失败: [' + err + ']'});
        }
        else
        {
            res.send({success : '报文格式删除成功!'});
        }
    });
});
router.get('/logcfg', function(req, res, next){
    var logcfg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'log4js.json')));

    return res.render('logcfg', {title: '日志配置'});
});

module.exports = router;