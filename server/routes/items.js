var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var items = require('../models/items');
mongoose.connect('mongodb://127.0.0.1:27017/myWeb', {useMongoClient: true});
mongoose.connection.on("connected", function () {
  console.log("连接成功");
});
mongoose.connection.on("error", function () {
  console.log("连接失败");
});
mongoose.connection.on("disconnected", function () {
  console.log("连接中断");
})
//  获取项目列表
router.get('/', function (req, res, next) {
  let page = parseInt(req.query.page);
  let pageSize = parseInt(req.query.pageSize);
  let itemName = req.query.itemName;
  let countAll = 0;
  // console.log(page);
  // console.log(pageSize);
  //  分页公式
  let skip = (page - 1) * pageSize;
  if (itemName) {
    items.findOne({itemName: itemName}, function (err, doc) {
      if (err) {
        res.json({
          status: 1,
          msg: err.message
        })
      } else {
        res.json({
          status: 0,
          msg: '获取成功',
          result: doc
        })
      }
    })
  } else {
    items.find({}, function (err, doc) {
      if (err) {
        res.json({
          status: '1',
          msg: err.message
        });
      } else {
        countAll = doc.length;
      }
    })
    // find条件查询 skip 跳过数据  limit 获取数据
    let itemsModel = items.find().skip(skip).limit(pageSize).sort({'_id': -1});
    itemsModel.exec(function (err, doc) {
      if (err) {
        res.json({
          status: '1',
          msg: err.message
        });
      } else {
        res.json({
          status: '0',
          msg: '成功',
          result: {
            countAll: countAll,
            count: countAll % pageSize == 0 ? countAll / pageSize : Math.floor(countAll / pageSize + 1),
            list: doc
          }
        })
      }
    })
  }
});

//  修改项目
router.post('/amend', function (req, res, next) {
  let itemName = req.body.itemName;
  let oldName = req.body.oldName;
  let itemInfo = req.body.itemInfo;
  let itemUrl = req.body.itemUrl;
  let itemPosition = req.body.itemPosition;
  let itemImg = req.body.itemImg;
  items.update({itemName: oldName}, {
    itemName: itemName,
    itemInfo: itemInfo,
    itemUrl: itemUrl,
    itemPosition: itemPosition,
    itemImg: itemImg,
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
//  添加项目
router.post('/addItem', function (req, res, next) {
  let doc = {
    itemName: req.body.itemName,
    itemInfo: req.body.itemInfo,
    itemUrl: req.body.itemUrl,
    itemPosition: req.body.itemPosition,
    itemImg: req.body.itemImg,
  }
  items.create(doc,function (err, docs) {
    if (err) {
      res.json({
        status: 1,
        msg: err.message
      })
    }else {
      res.json({
        status: 0,
        msg: '添加成功',
      })
    }
  })
})

module.exports = router;
