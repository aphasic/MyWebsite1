var mongoose = require('mongoose');
var Album = mongoose.model('Album');
var Photo = mongoose.model('Photo');

exports.albumList = function (req, res) {
    Album.fetch(function (err, albumlist) {
        if(err) {
            console.log('获取相册失败');
        }
        //统计每个相册的图片数量
        Photo.aggregate([{$match:{}},{$group:{'_id':"$album",'count':{$sum:1}}}],function (err, docs) {
            for(var i = 0, j = albumlist.length; i < j; i++){
                albumlist[i].count = 0;

                for(var m = 0, n = docs.length; m < n; m++) {
                    if(albumlist[i]._id.toString() == docs[m]._id.toString()) {
                        albumlist[i].count = docs[m].count;
                    }
                }
            }
            res.render('admin/album/album',{
                'albumlist' : albumlist,
                'pagetitle' : '相册'
            });
        })
    })
};

exports.edit = function (req, res) {
    var id = req.params.id;
    Photo.fetchByAblum(id, function (err, photolist) {
        Album.fetch(function (err, albumlist) {
            var albumInfo = [];
            for(var i = 0, j = albumlist.length; i < j; i++) {
                if(albumlist[i]._id == id){
                    albumInfo = albumlist[i];
                    break;
                }
            }
            res.render('admin/album/editphotos',{
                'albuminfo' : albumInfo,
                'photolist' : photolist,
                'albumlist' : albumlist,
                'pagetitle' : albumInfo.name
            });
        })
    })

};

exports.saveAlbum = function (req, res) {
    var album = new Album();
    album.name = req.body.albumname;
    album.description = req.body.description;
    album.access = req.body.access;
    var accesspwd = req.body.accesspwd;
    if(accesspwd) {
        album.accesspwd = accesspwd;
    }
    album.save(function (err) {
        if(err) {
            console.log('添加相册失败');
        } else {
            res.redirect('/admin/album');
        }
    })
};

exports.editAlbum = function (req, res) {
    var id = req.body.albumid;
    Album.findById(id, function (err, docs) {
        if(err) {
            console.log('获取相册信息失败');
            res.redirect('/admin/album');
        } else {
            docs.name = req.body.name;
            docs.description = req.body.description;
            var access = req.body.access;
            docs.access = access;
            if(3 == access) {
                docs.accesspwd = req.body.accesspwd;
            }
            docs.save(function (err) {
                if(err) {
                    console.log('修改相册信息失败');
                }
                res.redirect('/admin/album');
            })
        }
    })
};

exports.setCover = function (req, res) {    //设置相册封面
    var filePath = req.body.filepath;
    var albumid = req.body.albumid;
    Album.update({_id:albumid}, {$set:{cover: filePath}}, function (err) {
        res.send(err);
    })
};

exports.movePhotos = function (req, res) {
    var albumid = req.body.albumid;
    var photos = JSON.parse(req.body.photos);
    Photo.update({_id:{$in:photos}},{$set:{'album':albumid}},{multi:true}, function (err) {
        if(err){
            res.send(err);
        } else {
            res.send(null);
        }
    })
};

exports.deletePhotos = function (req, res) {
    var photos = JSON.parse(req.body.photos);
    Photo.remove({_id : {$in:photos}}, function (err) {
        if(err){
            res.send(err);
        } else {
            res.send(null);
        }
    })
};

exports.deleteAlbum = function (req, res) {
    var albumid = req.body.albumid;
    Album.remove({'_id' : albumid}, function (err) {
        if(err){
            console.log('删除相册失败');
            res.redirect('/admin/album');
        } else {
            Photo.remove({'album' : albumid}, function (err) {
                if(err){
                    console.log('删除相册失败');
                }
                res.redirect('/admin/album');
            })
        }
    })
}
