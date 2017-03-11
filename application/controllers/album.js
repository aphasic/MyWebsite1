var mongoose = require('mongoose');
var Album = mongoose.model('Album');
var Photo = mongoose.model('Photo');

exports.albums = function (req, res) {
    Album.fetch(function (err, albumlist) {
        if(err) {
            console.log('获取相册失败');
        }
        Photo.aggregate([{$match:{}},{$group:{'_id':"$album",'count':{$sum:1}}}],function (err, docs) {
            for(var i = 0, j = albumlist.length; i < j; i++){
                albumlist[i].count = 0;

                for(var m = 0, n = docs.length; m < n; m++) {
                    if(albumlist[i]._id.toString() == docs[m]._id.toString()) {
                        albumlist[i].count = docs[m].count;
                    }
                }
            }
            res.render('home/albums/albumlist',{
                'albumlist' : albumlist,
                'pagetitle' : '相册'
            });
        })
    })
};