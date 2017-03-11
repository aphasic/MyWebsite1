var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var ueditor = require('ueditor');

//连接mongodb和引入mongoose数据模型
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/hhh1');
require('./application/models/album');
require('./application/models/archive');
require('./application/models/category');
require('./application/models/photo');
require('./application/models/setting');
require('./application/models/work');

//引入前台的路由文件
var index = require('./routes/index');

//引入后台的路由文件
var admin_index = require('./routes/admin_index');
var admin_category = require('./routes/admin_category');
var admin_archive = require('./routes/admin_archive');
var admin_album = require('./routes/admin_album');
var admin_work = require('./routes/admin_work');
var admin_setting = require('./routes/admin_setting');
var admin_user = require('./routes/admin_user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'application/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

//使用路由中间件
app.use('/', index);

app.use('/admin', admin_index);
app.use('/admin/category', admin_category);
app.use('/admin/archive', admin_archive);
app.use('/admin/album', admin_album);
app.use('/admin/work', admin_work);
app.use('/admin/setting', admin_setting);
app.use('/admin/user', admin_user);

//使用百度ueditor
app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function (req, res, next) {
  if (req.query.action === 'uploadimage') {
    var img_url = '/images/ueditor/';
    res.ue_up(img_url);
    res.setHeader('Content-Type', 'text/html');
  }
  //  客户端发起图片列表请求
  else if (req.query.action === 'listimage') {
    var dir_url = '/images/ueditor/';
    res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
  }
  else {
    res.setHeader('Content-Type', 'application/json');
    res.redirect('/ueditor/nodejs/config.json');
  }
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.locals.moment = require('moment');

module.exports = app;
