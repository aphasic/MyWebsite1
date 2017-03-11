var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PhotoSchema = new Schema({
    path :  String,                 //图片原图保存路径
    thumbnail: String,              //图片缩略图路径
    name : String,                  //图片名称
    album : {                       //相册ID
        type : Schema.Types.ObjectId,
        ref : 'Album'
    },
    description : String,           //图片描述
    meta: {
        createAt: {                 //上传时间
            type: Date,
            default: Date.now()
        },
        updateAt: {                 //修改时间
            type: Date,
            default: Date.now()
        }
    }
});

PhotoSchema.pre('save',function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    }
    else {
        this.meta.updateAt = Date.now();
    }
    next();
});


PhotoSchema.statics = {
    fetchByAblum : function (album, callback) {
        return this.find({'album' : album}).sort({'meta.updateAt':-1}).exec(callback);
    }
};

module.exports = PhotoSchema;