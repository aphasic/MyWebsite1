var express = require('express');
var router = express.Router();
var setting_controller = require('../application/controllers/admin_setting');

//后台设置相关路由

router.get('/', setting_controller.index);

router.post('/save/:action', setting_controller.save);


module.exports = router;