var express = require('express');
var router = express.Router();
var user_controller = require('../application/controllers/admin_user');

router.get('/', user_controller.index);

module.exports = router;