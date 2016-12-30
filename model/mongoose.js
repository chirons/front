var mongoose = require('mongoose');
var propertiesparser = require('properties-parser');
var path = require('path');

var editor = propertiesparser.createEditor(path.join(__dirname, '..', 'settings.properties'));

var uri = editor.get('dbset.dburl');

mongoose.connect(uri, function(err){
    if (err)
    {
        console.log("数据库 ["+ uri + "] 连接异常:" + err);
        throw err;
    }
    console.log("数据库 ["+ uri + "] 连接成功!!!");
});

module.exports = mongoose;