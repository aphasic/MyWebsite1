var multiparty = require('multiparty');
var fs = require('fs');
var moment = require('moment');
var path = require('path');
var unzip = require('unzip');
var images = require('images');

var FileUpload = function () {
    this.baseDir = '../uploads/';
    this.albumDir = '../uploads/album/';
    this.workDir = '../uploads/work/';
    this.baseDirLength = this.baseDir.length;
};

FileUpload.prototype.upload = function (req, res, callback) {
    var _this = this;
    var form = new multiparty.Form({uploadDir : _this.baseDir});
    form.on('error', function (err) {
        return callback(err);
    })

    form.parse(req, function (err, fields, files){
        if (err){
            return callback(err);
        }else {
            var action = fields.action[0];
            var fileNameArr = Object.keys(files);
            var firstFilename = fileNameArr[0];
            var fileDataArr = files[firstFilename];
            var fileData = fileDataArr[0];
            var uploadedPath = fileData.path;
            var curDate = moment().format("YYYYMMDD");

            if('album' == action) {
                var uploadPath = _this.albumDir + curDate + '/';
                var thumbnailPath = uploadPath + 'thumbnail/';
                if(!fs.existsSync(uploadPath)) { //创建相册文件夹
                    fs.mkdirSync(uploadPath);
                }
                if(!fs.existsSync(thumbnailPath)) { //创建缩略图文件夹
                    fs.mkdirSync(thumbnailPath);
                }

                var savePath = uploadPath + fileData.originalFilename;//原图保存位置
                if(!fs.renameSync(uploadedPath, savePath)){
                    var albumid = fields.albumid[0];
                    var fileRealPath = path.resolve(savePath); //原图绝对路径
                    var thumbnailSavePath = thumbnailPath + fileData.originalFilename;
                    images(fileRealPath).size(400).save(thumbnailSavePath,{quality : 30});
                    return callback(null, savePath.substring(_this.baseDirLength),thumbnailSavePath.substring(_this.baseDirLength), albumid);
                }else{
                    return callback(true);
                }
            } else if('work' == action) {
                var filename = fileData.originalFilename;
                var extname = path.extname(filename);
                console.log(extname);
                if(extname != '.zip'){
                    return callback(true);
                }
                var workUploadPath = _this.workDir + curDate + '/';
                if(!fs.existsSync(workUploadPath)) {
                    fs.mkdirSync(workUploadPath);
                }
                var workSavePath = workUploadPath + fileData.originalFilename;
                if(!fs.renameSync(uploadedPath, workSavePath)){
                    var realPath = path.resolve(workSavePath);
                    var unzipPath = path.resolve(_this.workDir);
                    fs.createReadStream(realPath).pipe(unzip.Extract({path:unzipPath}));
                    var accessPath = _this.workDir.substring(_this.baseDirLength) + filename.substring(0,filename.length-extname.length);
                    return callback(null, workSavePath.substring(_this.baseDirLength), accessPath);
                }else{
                    return callback(true);
                }
            }
        }
    });
};

module.exports = FileUpload;