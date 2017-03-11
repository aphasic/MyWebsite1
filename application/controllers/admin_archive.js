var mongoose = require('mongoose');
var Archive = mongoose.model('Archive');
var Category = mongoose.model('Category');

exports.archiveList = function (req, res) {
    var cat = req.query.cat;
    var condition = {};
    if(typeof cat != 'undefined' && cat != 'all') {
        condition.catid = cat;
    }
    Archive.find(condition,{'title':1,'catid':1,'pv':1})
        .sort({'meta.updataAt':-1})
        .populate('catid', 'name')
        .exec(function (err, archives) {
            if(err) {
                console.log('获取文章列表失败');
            }
            Category.fetchByType(1, function (err, categorylist) {
                res.render('admin/archive/archivelist',{
                    'archivelist' : archives,
                    'categorylist' : categorylist,
                    'pagetitle' : '文章'
                });
            })
        })
};

exports.edit = function (req, res) {
    var id = req.params.id;
    Archive.findById(id, function (err, arc) {
        if(err) {
            console.log('获取文章内容失败');
        }
        Category.fetchByType(1, function (err, categorylist) {
            var catCount = arc.catid.length;
            if(catCount > 0){
                for(var item in categorylist){
                    var index = arc.catid.indexOf(categorylist[item]._id.toString());
                    if(index != -1) {
                        categorylist[item].checked = 1;
                        arc.catid.splice(index, 1);
                        if(arc.catid.length == 0) {
                            break;
                        }
                    }
                }
            }
            res.render('admin/archive/editarchive', {
                'categorylist' : categorylist,
                'archive' : arc,
                'pagetitle' : arc.title
            })
        })
    })
}

exports.new = function (req, res) {
    Category.fetchByType(1, function (err, categorylist) {
        if(err) {
            console.log('获取栏目列表失败');
        }
        res.render('admin/archive/new', {
            'categorylist' : categorylist,
            'pagetitle' : '写文章'
        })
    })
}

exports.saveArchive = function (req, res) {
    var archive = new Archive();
    var action = req.body.action;

    archive.title = req.body.title;
    archive.abstract = req.body.abstract;
    archive.content = req.body.content;
    archive.access = req.body.access;
    archive.catid = req.body.catid;
    var accesspwd = req.body.accesspwd;
    if(accesspwd) {
        archive.accesspwd = accesspwd;
    }

    if("new" == action) {
        archive.save(function (err) {
            if(err){
                console.log('添加文章失败');
            }
            res.redirect('/admin/archive');
        })
    } else if("update" == action) {
        var id = req.body.id;
        Archive.findById(id, function (err, docs) {
            if(err) {
                console.log('修改文章失败');
            }
            docs.title = req.body.title;
            docs.abstract = req.body.abstract;
            docs.content = req.body.content;
            docs.access = req.body.access;
            docs.catid = req.body.catid;
            if(accesspwd) {
                docs.accesspwd = accesspwd;
            }
            docs.save(function (err) {
                if(err) {
                    console.log('修改文章失败1');
                }
                res.redirect('/admin/archive');
            })
        })
    } else {
        res.send('错误');
    }
};

exports.trash = function (req, res) {
    var id = req.params.id;
    Archive.remove({'_id':id}, function (err) {
        if(err) {
            console.log('删除文章失败');
        }
        res.redirect('/admin/archive');
    })
}

exports.category = function (req, res) {
    Category.fetchByType(1,function (err, categorylist) {
        if(err) {
            console.log('获取栏目列表失败');
        }
        res.render('admin/archive/category', {
            'categorylist' : categorylist,
            'formaction' : '/admin/archive/savecategory',
            'from' : 'archive',
            'pagetitle' : '栏目管理'
        });
    })
};

exports.saveCategory = function (req, res) {
    var category = new Category();
    category.name = req.body.name;
    category.parentid = req.body.parentid;
    category.description = req.body.description;
    category.type = 1;

    category.save(function (err) {
        if(err) {
            console.log('添加栏目失败');
        }
        res.redirect('category');
    })
};

exports.trashCategory = function (req, res) {
    var id = req.params.id;
    var from = req.params.from;
    Category.remove({'_id':id}, function (err) {
        if(err){
            console.log('删除栏目失败');
        }
        if('archive' == from) {
            res.redirect('/admin/archive/category');
        }else if('work' == from) {
            res.redirect('/admin/work/category');
        } else {
            res.redirect('/admin');
        }
    })
}