var mongoose = require('mongoose');
var Work = mongoose.model('Work');
var Category = mongoose.model('Category');
var Fileupload = require('../models/fileupload');

exports.workList = function (req, res) {
    Work.fetch(function (err, worklist) {
        res.render('admin/work/worklist', {
            'worklist' : worklist,
            'pagetitle' : '作品'
        });
    });
};

exports.new = function (req, res) {
    Category.fetchByType(2, function (err, categorylist) {
        res.render('admin/work/new',{
            'categorylist' : categorylist,
            'pagetitle' : '新建作品'
        });
    })
};

exports.uploadWork = function (req, res) {
    var fileupload = new Fileupload();
    fileupload.upload(req, res, function (err, savePath, accessPath) {
        if(err) {
            res.send(null);
        } else {
            var work = new Work();
            work.savepath = savePath;
            work.accesspath = accessPath;
            work.save(function (err, docs) {
                res.send(docs._id.toString());
            })
        }
    })
};

exports.saveWork = function (req, res) {
    var id = req.body.workid;
    var workInfo = {
        name : req.body.name,
        description : req.body.description,
        access : req.body.access,
        accesspwd : req.body.accesspwd,
        tags : JSON.parse(req.body.tags),
        catid : req.body.catid
    };
    Work.update({'_id' : id},{$set:workInfo}, function (err) {
        if(err){
            console.log('保存作品失败');
        }
        res.redirect('/admin/work');
    })
};

//works 的栏目管理和 archives 的栏目共用一个页面
exports.category = function (req, res) {
    Category.fetchByType(2, function (err, categorylist) {
        if(err) {
            console.log('获取栏目列表失败');
        }
        res.render('admin/archive/category', {
            'categorylist' : categorylist,
            'formaction' : '/admin/work/savecategory',
            'from' : 'work',
            'pagetitle' : '栏目管理'
        });
    })
};

exports.saveCategory = function (req, res) {
    var category = new Category();
    category.name = req.body.name;
    category.parentid = req.body.parentid;
    category.description = req.body.description;
    category.type = 2;

    category.save(function (err) {
        if(err) {
            console.log('添加栏目失败');
        }
        res.redirect('category');
    })
}