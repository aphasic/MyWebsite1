var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var WorkSchema = new Schema({
    name : String,              //作品名称
    savepath :  String,         //作品压缩包保存路径
    accesspath : String,        //作品解压后访问路径
    tags : [                    //作品标签
        String
    ],
    catid : {                   //栏目ID
        type : [Schema.Types.ObjectId],
        default : []
    },
    description : String,       //作品描述
    meta: {                     //上传时间
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {             //修改时间
            type: Date,
            default: Date.now()
        }
    }
});

WorkSchema.pre('save',function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    }
    else {
        this.meta.updateAt = Date.now();
    }
    next();
});


WorkSchema.statics = {
    fetch : function (callback) {
        return this.find({}).sort({'meta.updateAt':-1}).exec(callback);
    },
    findById : function (id, callback) {
        return this.findOne({_id : id}).exec(callback);
    }
};

module.exports = WorkSchema;