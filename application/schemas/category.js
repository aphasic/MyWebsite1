var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CagegorySchema = new Schema({
    name :  String,         //栏目名称
    description : String,   //栏目描述
    parentid : {            //父栏目ID
        type: String
    },
    type : Number,          //栏目类型
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

CagegorySchema.pre('save',function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    }
    else {
        this.meta.updateAt = Date.now();
    }
    next();
});

CagegorySchema.statics = {
    fetchByType : function (type, callback) {
        var newCategory = [];
        function catTree(category, parentid, level) { //无限分类查询
            category.forEach(function (item) {
                if(item.parentid == parentid) {
                    item.level = level;
                    newCategory.push(item);
                    catTree(category, item._id, level + 1);
                }
            });
            return newCategory;
        }
        this.find({'type' : type},function (err, categorylist) {
            if(err) {
                return callback(err);
            } else {
                return callback(null, catTree(categorylist, '0', 0));
            }
        });
        
    },
    findById : function (id, callback) {
        return this.findOne({_id : id}).exec(callback);
    }
};

module.exports = CagegorySchema;