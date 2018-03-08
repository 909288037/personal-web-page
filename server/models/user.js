var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var produtSchema = new Schema({
  "userId":  String,
  "userName": String,
  "userPwd": String,
  "userInfo": Array,
  "userImg" : String,
  "userUrl": String,
  "regTime": String,
  "checked": Number
});
module.exports = mongoose.model('users',produtSchema);
