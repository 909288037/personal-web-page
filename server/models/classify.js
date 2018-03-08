var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var classifySchema = new Schema({
  classify: String,
  createDate: String,
})
module.exports = mongoose.model('classifys',classifySchema);
