var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var index = require('./routes/index');
var users = require('./routes/users');
var items = require('./routes/items');
var article = require('./routes/article');
var classifys = require('./routes/classifys');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser('Simon'));
app.use(express.static(path.join(__dirname, 'public')));

// 登录拦截
// app.use(function (req,res,next) {
//   //  获取cookies值
//   if(req.cookies.userId){
//     next();
//   }else{
//     console.log("url:"+req.originalUrl);
//     if(req.originalUrl=='/article/articleList' ||req.originalUrl=='/users/checkLogin' || req.originalUrl=='/users/userList' || req.originalUrl=='/users/register' || req.originalUrl=='/users/login' || req.originalUrl=='/users/logout' || req.path == '/items' || req.originalUrl=='/users/getInfoList'){
//       next();
//     }else{
//       res.json({
//         status:'10001',
//         msg:'当前未登录',
//         result:''
//       });
//     }
//   }
// });




app.use('/', index);
app.use('/users', users);
app.use('/items', items);
app.use('/article', article);
app.use('/classifys', classifys);

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

module.exports = app;
