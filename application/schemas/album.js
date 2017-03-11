var mongoose = require('mongoose');
var AlbumSchema = new mongoose.Schema({
    name :  String,             //相册名称
    description : String,       //相册描述
    cover : String,             //相册封面
    access : Number,            //相册访问权限
    accesspwd : String,         //访问密码
    meta: {
        createAt: {             //创建时间
            type: Date,
            default: Date.now()
        },
        updateAt: {             //修改时间
            type: Date,
            default: Date.now()
        }
    }
});

AlbumSchema.pre('save',function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    }
    else {
        this.meta.updateAt = Date.now();
    }
    next();
});


AlbumSchema.statics = {
    fetch : function (callback) {
        return this.find({}).sort({'meta.updateAt':-1}).exec(callback);
    },
    findById : function (id, callback) {
        return this.findOne({_id : id}).exec(callback);
    }
};

module.exports = AlbumSchema;