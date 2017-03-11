exports.index = function (req, res) {
    res.render('admin/user/index',{
        'pagetitle' : '用户'
    })
}