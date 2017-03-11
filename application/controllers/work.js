var mongoose = require('mongoose');
var Work = mongoose.model('Work');
var Category = mongoose.model('Category');

exports.works = function (req, res) {
    var condition = {};
    var cat = req.query.cat;
    if(typeof cat != 'undefined') {
        condition.catid = cat;
    }
    Work.find(condition).sort({'meta.updatAt':-1}).exec(function (err, worklist) {
        if(err) {
            console.log('获取作品列表失败');
        }
        Category.fetchByType(2, function (err, categorylist) {
            res.render('home/works/works',{
                'worklist' : worklist,
                'categorylist' : categorylist,
                'pagetitle' : '作品展'
            });
        })
    })
};

exports.work = function (req, res) {
    var id = req.params.id;
    Work.findById(id, function (err, docs) {
        if(err) {
            console.log('获取作品失败');
        }
        res.render('home/works/workpage', {
            'work' : docs,
            'pagetitle' : docs.name
        });
    })
};