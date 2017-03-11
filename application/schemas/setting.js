var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SettingSchema = new Schema({
    options : Schema.Types.Mixed    //保存网站相关配置项
    //options : Array
});

SettingSchema.statics = {
    getOptions : function (name, callback) {
        this.findOne({}, function (err, docs) {
            if(err){
                return callback(err);
            }else{
                return callback(null,docs.options[name]);
            }
        })
    },
    fetch : function (callback) {
        this.findOne({} ,function (err, docs) {
            if(err){
                return callback(err);
            }else{
                return callback(null, docs.options);
            }
        })
    }
};

module.exports = SettingSchema;