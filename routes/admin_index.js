var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Setting = mongoose.model('Setting');
var index_controller = require('../application/controllers/admin_index');

router.use('/', function (req, res, next) {   //后台路由中间件，适合做访问控制，权限验证等。
    console.log('登录验证');
    next();
});

/* GET home page. */
router.get('/', index_controller.index);

//文件上传
router.post('/postfile', index_controller.postFile);

module.exports = router;
