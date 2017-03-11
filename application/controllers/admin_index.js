var mongoose = require('mongoose');
var Photo = mongoose.model('Photo');
var Fileupload = require('../models/fileupload');

exports.index = function (req, res) {
    res.render('admin/index');
}

exports.postFile = function (req, res) {
    var fileupload = new Fileupload();
    fileupload.upload(req, res, function (err, filePath,thumbnailPath, albumid) {
        if(err){
            console.log('上传失败');
            res.send(null);
        } else if (!albumid){
            console.log('相册为空');
            res.send(null);
        } else {
            var photo = new Photo();
            photo.path = filePath;
            photo.album = albumid;
            photo.thumbnail = thumbnailPath;
            photo.save(function (err) {
                if(err) {
                    console.log('添加照片失败');
                }
                res.send(null);
            })
        }
    })
};
