var express = require('express');
var router = express.Router();
var Blog = require('../models/blog');

//  获取详情文章
router.get('/readArticle',function (req, res, next) {
  Blog.findOne({_id:req.query._id},function (err, doc) {
    if (err) {
      res.json({
        status: 1,
        msg: err.message
      })
    }else {
      doc.PV++;
      doc.save(function (err, docs) {
        if(err) console.log(err);
        console.log("保存成功");
      });
      res.json({
        status: 0,
        msg: '获取成功',
        result: doc
      })
    }
  })
})


//  创建或修改文章
router.post('/editarticle',function (req, res, next) {
  let title = req.body.title;
  let content = req.body.content;
  let classify = req.body.classify;
  let createDate = req.body.createDate;
  let value = req.body.value;
  let _id = req.body._id;

  if (_id) {
    Blog.update({_id:_id},{
      title: title,
      content: content,
      classify:classify,
      value:value
    },{multi: true},function (err, doc) {
      if (err) {
        res.json({
          status: 1,
          msg: err.message
        })
      }else {
        res.json({
          status: 0,
          msg: "更新成功"
        })
      }
    })
    return;
  }
  Blog.create({
      title: title,
      content: content,
      classify:classify,
      createDate:createDate,
      value:value,
      PV: 0
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


// 获取文章
router.get('/articleList',function (req, res, next) {
  let page = parseInt(req.query.page);
  let pageSize = parseInt(req.query.pageSize);
  let _id = req.query._id;
  let skip = (page - 1) * pageSize;
  let countAll = 0;
  let count = 0;
  if (_id) {
    Blog.findOne({_id:_id},function (err, doc) {
      if (err) {
        res.json({
          status: 1,
          msg: err.message
        })
      }else {
        res.json({
          status: 0,
          msg: '成功',
          result: doc
        })
      }
    });
    return;
  }
  Blog.find({}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      });
    } else {
      count = doc.length;
      countAll = doc.length % pageSize == 0 ? doc.length / pageSize : Math.floor(doc.length / pageSize + 1);
    }
  });
  Blog.find({}).skip(skip).limit(pageSize).sort({"_id": -1}).exec(function (err, doc) {
    if (err) {
      res.json({
        status: 1,
        msg: err.message
      })
    }else {
      res.json({
        status: 0,
        msg: '获取成功',
        count: count,
        countAll: countAll,
        result: doc
      })
    }
  })
})

//  删除文章
router.get('/rmArticle',function (req, res, next) {
  let _id = req.query._id;
  Blog.remove({_id:_id},function (err, doc) {
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
})
module.exports = router;
