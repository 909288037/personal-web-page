var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var produtSchema = new Schema({
  "id": Number,
  "itemName": String,
  "itemInfo": String,
  "itemUrl": String,
  "itemImg": String,
  "itemPosition" : String
});
//  参数一: 数据库集合里对应名称
module.exports = mongoose.model('items',produtSchema);
