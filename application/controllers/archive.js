var mongoose = require('mongoose');
var Archive = mongoose.model('Archive');
var Category = mongoose.model('Category');

exports.archives = function (req, res) {
    var page = typeof req.query.p == 'undefined' ? 1 : req.query.p;
    var condition = {};
    var cat = req.query.cat;
    if(typeof cat != 'undefined') {
        condition.catid = cat;
    }
    if(isNaN(page) || page < 1) page = 1;
    var pageArchivesCount = 3; //每页显示条数
    Archive.count(condition,function (err, count) {
        var pageCount = Math.ceil(count / pageArchivesCount);
        Archive.find(condition,{'title':1,'meta':1,'abstract':1,'catid':1})
            .sort({'meta.updateAt':-1})
            .populate('catid','name')
            .skip((page-1) * pageArchivesCount)
            .limit(pageArchivesCount)
            .exec(function (err, archives) {
                if(err) {
                    console.log('获取文章列表失败');
                }
                Category.fetchByType(1, function (err, categorylist) {
                    res.render('home/archives/archives',{
                        'archives' : archives,
                        'categorylist' : categorylist,
                        'pagetitle' : '学习笔记',
                        'pagecount' : pageCount,
                        'cat' : cat
                    });
                })
            })
    });
};

exports.archive = function (req, res) {
    var id = req.params.id;
    Archive.update({_id: id}, {$inc: {pv: 1}}, function(err) {
        if (err) {
            console.log(err)
        }
    });
    Archive.find({'_id':id})
        .populate('catid','name')
        .exec(function (err, docs) {
            if(err) {
                console.log('获取文章失败');
                res.redirect('/archives');
            } else {
                res.render('home/archives/archivepage',{
                    'archive' : docs[0],
                    'pagetitle' : docs[0].title
                });
            }
    })
};

exports.getList = function (req, res) {
    var id = req.body.id;
    var action = req.body.action;
    if('adjoin' == action) {    //获取当前文章上一篇和下一篇
        Archive.findById(id,function (err, docs) {
            Archive.find({'meta.updateAt' :{ $gt :docs.meta.updateAt}},{'title':1})
                .limit(1).sort({'meta.updateAt': 1})
                .exec(function (err,last) {
                    Archive.find({'meta.updateAt' :{ $lt :docs.meta.updateAt}},{'title':1})
                        .limit(1).sort({'meta.updateAt':-1})
                        .exec(function (err,next) {
                            var msg = {};
                            msg.err = err;
                            if(err) {
                                res.send(msg);
                            } else {
                                msg.last = last[0];
                                msg.next = next[0];
                                res.send(msg);
                            }
                        })
                })
        })

    }
};
