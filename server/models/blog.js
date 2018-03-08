var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  "title": String,
  "content": String,
  "classify": String,
  "createDate": String,
  "value": String,
  "PV": 0
})
module.exports = mongoose.model('blogs',blogSchema);
