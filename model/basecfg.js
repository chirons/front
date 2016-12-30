var mongoose = require('./mongoose.js');

/**基础配置的元类型：type有1：通讯方式，2：报文类型*/
var BaseCfgSchema = new mongoose.Schema({
    name : String,
    type : String,
    desc : String
});

BaseCfgSchema.methods.getAll = function(callback){
    var query = {};

    this.model('basecfg').find(query, function(err, list){
        callback(err, list);
    });
};

BaseCfgSchema.methods.getByType = function(type, callback){
    var query = {type : type};

    this.model('basecfg').find(query, function(err, list){
        callback(err, list);
    });
};

var BaseCfgModel = mongoose.model('basecfg', BaseCfgSchema);

module.exports = BaseCfgModel;