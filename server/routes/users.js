var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Info = require('../models/infoList');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
//  注册
router.post('/register', function (req, res, next) {
  var param = {
    "userId": req.body.userId,
    "userName": req.body.userName,
    "userPwd": req.body.userPwd,
    "userInfo": '',
    "userImg": req.body.userImg,
    "regTime": req.body.regTime,
    "checked": 0
  };
  User.create(param, function (err, docs) {
    if (err) {
      res.json({
        status: 1,
        msg: err.message
      });
    } else {
      res.json({
        status: 0,
        msg: "注册成功",
        result: ''
      })
    }
  })
});
// 查询名称是否可以使用
router.get("/name", function (req, res, next) {
  let userName = req.query.userName;
  let userId = req.query.userId;
  User.findOne({"$or": [{userName: userName}, {userId: userId}]}, function (err, doc) {
    if (err) {
      res.json({
        status: 1,
        msg: err.message
      })
    } else {
      if (doc) {
        res.json({
          status: 0,
          msg: '已注册'
        });
      } else {
        res.json({
          status: 10001,
          msg: '可以注册'
        })
      }
    }
  })
})
//  登录
router.post('/login', function (req, res, next) {
  let param = {
    userId: req.body.userId,
    userPwd: req.body.userPwd
  }
  User.findOne(param, function (err, doc) {
    if (err) {
      res.json({
        status: 1,
        msg: err.message
      })
    } else {
      if (doc) {
        res.cookie("userId", doc.userId, {
          path: "/",
          maxAge: 1000 * 60 * 60 * 24
        });
        res.cookie("userName", doc.userName, {
          path: "/",
          maxAge: 1000 * 60 * 60 * 24
        });
        res.cookie("userPwd", doc.userPwd, {
          path: "/",
          maxAge: 1000 * 60 * 60 * 24,
          //  加密
          signed: true
        });
        if (doc.userName == '管理员') {
          res.json({
            status: 0,
            msg: "登录成功",
            result: {
              userName: doc.userName,
              userImg: doc.userImg,
              isAdmin: true
            }
          })
        } else {
          res.json({
            status: 0,
            msg: "登录成功",
            result: {
              userName: doc.userName,
              userImg: doc.userImg,
            }
          })
        }
      } else {
        res.json({
          status: 1,
          msg: "登录失败",
        })
      }
    }
  })
});
//  登出
router.post('/logout', function (req, res, next) {
//  清除cookie
  res.clearCookie('userId', {path: '/'});
  res.clearCookie('userPwd', {path: '/'});
  res.clearCookie('userName', {path: '/'});
  res.json({
    status: "0",
    msg: '退出成功',
    result: ''
  })
});
//  检测刷新不退出登录
router.get("/checkLogin", function (req, res, next) {
  //  获取cookieid和解签密码
  if (req.cookies.userId && req.signedCookies.userPwd) {
    console.log(req.signedCookies.userPwd);
    User.findOne({userId: req.cookies.userId, userPwd: req.signedCookies.userPwd}, function (err, doc) {
      if (doc) {
        res.json({
          status: '0',
          msg: '登录成功',
          result: {
            userName: doc.userName,
            userImg: doc.userImg
          }
        })
      }

    })

  } else {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
  }
});
//  留言板发言
router.post("/info", function (req, res, next) {
  let userId = req.cookies.userId;
  let sendData = req.body.sendData;
  let userInfo = req.body.userInfo;
  User.findOne({userId: userId}, function (err, Userdoc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      let userName = Userdoc.userName,
        userImg = Userdoc.userImg;

      Userdoc.userInfo.push({
        userInfo: userInfo,
        sendData: sendData
      });
      Userdoc.save(function (err, doc1) {
        if (err) {
          res.json({
            status: '1',
            msg: err.message,
          })
        } else {
          // res.json({
          //   status: '0',
          //   msg: '保存成功',
          // })
        }
      });
      let temp = {
        userName: userName,
        userInfo: userInfo,
        userImg: userImg,
        sendData: sendData
      };
      Info.create(temp, function (err, doc2) {
        if (err) {
          res.json({
            status: 1,
            msg: err.message
          });
        } else {
          // console.log(doc2);
          res.json({
            status: 0,
            msg: "创建成功",
            result: ''
          })
        }
      })
    }
  })
})

//  获取聊天信息
router.post("/getInfoList", function (req, res, next) {
  Info.find({}, function (err, doc) {
    if (err) {
      res.json({
        status: 1,
        msg: '获取失败...',
      })
    } else {
      res.json({
        status: 0,
        msg: '获取成功',
        result: doc
      })
    }
  })
})
//  获取会员列表
router.post('/userList', function (req, res, next) {
  let page = parseInt(req.body.page);
  let pageSize = parseInt(req.body.pageSize);
  let skip = (page - 1) * pageSize;
  let countAll = 0
  User.find({}, function (err, doc) {
    if (err) {
      res.json({
        status: 1,
        msg: '获取失败...',
      })
    } else {
      countAll = doc.length % pageSize == 0 ? doc.length / pageSize : Math.floor(doc.length / pageSize + 1);
    }
  })
  User.find({}).skip(skip).limit(pageSize).sort({'regTime': -1}).exec(function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '获取成功',
        result: doc,
        countAll: countAll
      })
    }
  })
})

//  查找会员
router.post('/search', function (req, res, next) {
  let userName = req.body.userName
  let userId = req.body.userId
  User.findOne({"$or": [{userName: userName}, {userId: userId}]}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if (doc) {
        res.json({
          status: '0',
          msg: '获取成功',
          result: doc,
        })
      } else {
        res.json({
          status: '1',
          msg: '获取失败'
        })
      }
    }
  })
})
//  修改会员
router.post('/amend', function (req, res, next) {
  let userName = req.body.userName;
  let oldName = req.body.oldName;
  let userId = req.body.userId;
  let userImg = req.body.userImg;
  let userPwd = req.body.userPwd;
  console.log(userName);
  User.update({userName: oldName}, {
    userName: userName,
    userId: userId,
    userImg: userImg,
    userPwd: userPwd
  }, {multi: true}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        res.json({
          status: '0',
          msg: '修改成功',
          result: doc
        })
      }
    }
  })


})

//  全选
router.post("/editCheckAll", function (req, res, next) {
  let checkAll = req.body.checkAll;
  let checked = req.body.checked;
  let userName = req.body.userName;
  console.log(checked);
  if (checkAll == 0 || checkAll == 1) {
    User.update({}, {$set: {checked: checkAll}}, {multi: true}, function (err, doc) {
      if (err) {
        res.json({
          status: '1',
          msg: err.message,
          result: ''
        })
      } else {
          res.json({
            status: '0',
            msg: '',
            result: checkAll
          })
      }
    })
  }else {
    User.update({userName:userName},{$set: {checked: checked}}, {multi: true}, function (err, doc) {
      if (err) {
        res.json({
          status: '1',
          msg: err.message,
          result: ''
        })
      } else {
        res.json({
          status: '0',
          msg: '',
          result: doc
        })
      }
    })
  }
});
//  删除会员
router.post("/removeUser", function (req, res, next) {
  let userName = req.body.userName;
  let rmSelect = req.body.rmSelect;
if (rmSelect) {
  User.remove({checked:1},function (err, doc) {
    if (err) {
      res.json({
        status: 1,
        msg: err.message
      })
    }else {
      res.json({
        status: 0,
        msg: '删除成功'
      })
    }
  });
} else {
  User.remove({userName:userName},function (err, doc) {
    if (err) {
      res.json({
        status: 1,
        msg: err.message
      })
    }else {
      res.json({
        status: 0,
        msg: '删除成功'
      })
    }
  })
}

})
module.exports = router;
