var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Setting = mongoose.model('Setting');

//引入控制器
var index = require('../application/controllers/index');
var work = require('../application/controllers/work');
var album = require('../application/controllers/album');
var archive = require('../application/controllers/archive');

router.use(function (req, res, next) {
    Setting.fetch(function (err, docs) {    //获取网站配置项
        res.locals.sitename = docs.sitename;
        res.locals.sitedescription = docs.sitedescription;
        next();
    });
});

/* Home Page. */
router.get('/', index.index);
router.get('/index', index.index);


/* Works Page 作品展示页面路由 */
router.get('/works',work.works);
router.get('/work/:id',work.work);

/* Archives Page 文章展示页面路由*/
router.get('/archives',archive.archives);
router.get('/archive/:id',archive.archive);
router.post('/archives/getlist', archive.getList);

/* Albums Page 相册页面路由 */
router.get('/albums', album.albums);

module.exports = router;
