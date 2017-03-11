var mongoose = require('mongoose');
var ArchiveSchema = require('../schemas/archive');

var Archive = mongoose.model('Archive', ArchiveSchema);

module.exports = Archive;