var express = require('express');
var archive_controller = require('../application/controllers/admin_archive');
var router = express.Router();

//后台文章相关路由

router.get('/', archive_controller.archiveList);

router.get('/new', archive_controller.new);

router.get('/edit/:id', archive_controller.edit);

router.get('/trash/:id', archive_controller.trash);

router.get('/category', archive_controller.category);

router.post('/savecategory', archive_controller.saveCategory);

router.post('/savearchive', archive_controller.saveArchive);

router.get('/trashcate/:from/:id', archive_controller.trashCategory);

module.exports = router;
