var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ArchiveSchema = new Schema({
    title :  String,            //文章标题
    abstract : String,          //摘要
    content : String,           //内容
    catid : [{                  //栏目ID
        type : Schema.Types.ObjectId,
        ref : 'Category'
    }],
    pv : {                      //浏览量
        type : Number,
        default : 0
    },
    access : Number,            //访问权限
    accesspwd : {               //访问密码
        type : String,
        default : ''
    },
    meta: {
        createAt: {             //发布时间
            type: Date,
            default: Date.now()
        },
        updateAt: {             //修改时间
            type: Date,
            default: Date.now()
        }
    }
});

ArchiveSchema.pre('save',function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    }
    else {
        this.meta.updateAt = Date.now();
    }
    next();
});


ArchiveSchema.statics = {
    fetch : function (callback) {
        return this.find({}, ['_id', 'title','abstract', 'meta']).sort({'meta.updateAt':-1}).exec(callback);
    },
    findById : function (id, callback) {
        return this.findOne({_id : id}).exec(callback);
    }
};

module.exports = ArchiveSchema;