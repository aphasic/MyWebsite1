var express = require('express');
var router = express.Router();
var work_controller = require('../application/controllers/admin_work');

//后台作品相关路由

router.get('/', work_controller.workList);

router.get('/new', work_controller.new);

router.post('/uploadwork', work_controller.uploadWork);

router.post('/savework', work_controller.saveWork);

router.get('/category', work_controller.category);

router.post('/savecategory', work_controller.saveCategory);

module.exports = router;