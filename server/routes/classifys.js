var express = require('express');
var router = express.Router();

var classifys = require('../models/classify');

//  获取分类
router.get('/classifyList',function (req,res,next) {
  let page = parseInt(req.query.page);
  let pageSize = parseInt(req.query.pageSize);
  let skip = (page-1) * pageSize;
  let countAll = 0;
  classifys.find({},function (err, doc) {
    if (err) {
      res.json({
        status: 1,
        msg: err.message
      })
    }else {
      countAll = doc.length % pageSize == 0 ? doc.length / pageSize : Math.floor(doc.length / pageSize + 1);
    }
  })
  classifys.find().skip(skip).limit(pageSize).sort({"_id": -1}).exec(function (err, doc) {
    if (err) {
      res.json({
        status: 1,
        msg: err.message
      })
    }else {
      res.json({
        status: 0,
        msg: '获取成功',
        countAll: countAll,
        result: doc
      })
    }
  })
})

//  创建分类
router.get('/addClassify',function (req, res, next) {
  classifys.create({
    classify: req.query.classify,
    createDate: req.query.createDate
  },function (err, doc) {
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

//删除/修改分类

router.get('/editClassify',function (req, res, next) {
  let _id = req.query._id;
  console.log(_id);
  let classify = req.query.classify;
  let flag = '';
  //  是true修改否则删除
  if (flag) {
    classifys.update({_id:_id},{
      classify: classify
    },function (err, doc) {
      if (err) {
        res.json({
          status: 1,
          msg: err.message
        })
      }else {
        res.json({
          status: 0,
          msg: '修改成功',
        })
      }
    })
  } else {
    classifys.remove({_id:_id},function (err, doc) {
      if (err) {
        res.json({
          status: 1,
          msg: err.message
        })
      }else {
        res.json({
          status: 0,
          msg: '删除成功',
        })
      }
    })
  }
})
module.exports = router;
