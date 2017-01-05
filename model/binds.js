var mongoose = require('./mongoose.js');

/**基础配置的元类型：type有1：通讯方式，2：报文类型*/
var BindsSchema = new mongoose.Schema({
    lisport : String,
    servername : String,
    serverip : String,
    serverport: String,
    tranway : String,
    msgfmt : String
});

BindsSchema.methods.getByPort = function(port, callback){
    var query = {lisport : port};

    this.model('binds').find(query, function(err, list){
        callback(err, list);
    });
};

var BindsModel = mongoose.model('binds', BindsSchema);

module.exports = BindsModel;