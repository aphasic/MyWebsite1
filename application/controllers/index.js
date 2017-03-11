var mongoose = require('mongoose');
var Work = mongoose.model('Work');

exports.index = function (req, res) {
    res.render('home/index/index');
};




