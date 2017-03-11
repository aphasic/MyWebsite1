var express = require('express');
var album_controller = require('../application/controllers/admin_album');
var router = express.Router();

//后台相册相关路由

router.get('/', album_controller.albumList);

router.get('/edit/:id', album_controller.edit);

router.post('/savealbum', album_controller.saveAlbum);

router.post('/editalbum', album_controller.editAlbum);

router.post('/setcover', album_controller.setCover);

router.post('/movephotos', album_controller.movePhotos);

router.post('/deletephotos', album_controller.deletePhotos);

router.post('/deletealbum', album_controller.deleteAlbum);

module.exports = router;
