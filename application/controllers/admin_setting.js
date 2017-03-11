var mongoose = require('mongoose');
var Setting = mongoose.model('Setting');

exports.index = function (req, res) {
    res.render('admin/setting/index',{
        'pagetitle' : '设置'
    });
}

exports.save = function (req, res) {
    var action = req.params.action;
    if('general' == action) {
        var options = {
                'sitename' : req.body.sitename,
                'sitedescription' : req.body.sitedescription
            };
    }

    Setting.update({},{$set:{'options' : options}}, function (err) {
        if(err){
            console.log('保存设置失败');
        }
        res.redirect('/admin/setting');
    })
}