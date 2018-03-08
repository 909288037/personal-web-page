var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var infoList = new Schema({
  userName: String,
  userInfo: String,
  userImg: String,
  sendData: String,
  userUrl: String
});

//  参数一: 数据库集合里对应名称
module.exports = mongoose.model('infolists',infoList);
