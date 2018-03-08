<template>
    <div class="blogList text-center">
      <div class="editArticle" v-if="isEdit">
        <div>
          <div class="articleTitle col-lg-6">
            <label for="title">标题:</label>
            <input type="text" placeholder="请输入标题" id="title" v-model.trim="title">
          </div>
          <div class="classify col-lg-6">
            <label for="classify">标签:</label>
            <select v-model="selected" id="classify">
              <option disabled value="">请选择标签</option>
              <option v-for="item in classifyList">{{item.classify}}</option>
            </select>
          </div>
        </div>
        <mavon-editor :ishljs = "true" @change="$change" ref=md class="col-lg-12" v-model="code" @imgAdd="$imgAdd" @imgDel="$imgDel"></mavon-editor>
        <button type="button" class="btn btn-info" @click="amendBlog">提交</button>
        <button type="button" class="btn btn-danger" style="margin-left: 10px;" @click="cancel">取消</button>
      </div>
      <div class="articleList" v-else>
        <button type="button" class="btn btn-primary" @click="isEdit = true" style="margin-top: -10px; margin-bottom: 10px;">添加文章</button>
        <table class="table table-hover table-bordered table-striped">
          <thead>
          <tr>
            <th>编号</th>
            <th>创建时间</th>
            <th>分类</th>
            <th>标题</th>
            <th>浏览数</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in articleList">
            <td>{{index+1}}</td>
            <td>{{item.createDate}}</td>
            <td>{{item.classify}}</td>
            <td>{{item.title}}</td>
            <td>{{item.PV}}</td>
            <td>
              <button class="btn btn-primary" @click="goReadBlog(item._id)">查看</button>
              <button class="btn btn-info" @click="amendArticle(item._id)">修改</button>
              <button class="btn btn-danger" @click="rmArticle(item._id)">删除</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <nav aria-label="Page navigation" v-show="isEdit == false">
        <ul class="pagination">
          <li>
            <a href="javascript:;" aria-label="Previous" @click="getPage(1)">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li v-for="(item,index) in countAll" @click="getPage(index+1)"><a href="javascript:;">{{index+1}}</a></li>
          <li>
            <a href="javascript:;" aria-label="Next" @click="getPage(countAll)">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
</template>

<script>
  import axios from 'axios'
  import {Format} from '../../util/util'
    export default {
        name: "blog-list",
      data() {
        return {
          content: '',
          title: '',
          selected: '',
          isEdit: false,
          value: '',
          code: '',
          articleList: '',
          page: 1,
          pageSize: 10,
          countAll: 0,
          _id: '',
          classifyList : '',
          img_file: {}
        }
      },
      mounted() {
        this.getArticle();
        this.getClassify()
      },
      methods:　{
        //  跳转详细页
        goReadBlog(id) {
          this.$router.push({
            path: `/readArticle`,
            query: {_id: id}
          })
        },
        //  图片上传
        // 绑定@imgAdd event
        $imgAdd(pos, $file){
          // 缓存图片信息
          this.img_file[pos] = $file;
        },
        $imgDel(pos){
          delete this.img_file[pos];
        },
        uploadimg($e) {
          // 第一步.将图片上传到服务器.
          var formdata = new FormData();
          for (var _img in this.img_file) {
            formdata.append(_img, this.img_file[_img]);
          }
          axios({
            url: 'server url',
            method: 'post',
            data: formdata,
            headers: {'Content-Type': 'multipart/form-data'},
          }).then((res) => {
            /**
             * 例如：返回数据为 [[pos: url], [pos, url]...]
             * pos 为原图片标志（./0）
             * url 为上传后图片的url地址
             */
            // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
            for (var i in res) {
              console.log(res[i]);
              // $vm.$img2Url 详情见本页末尾
              // this.$refs.md.$img2Url(res[i].[0], res[i].[1]);
            }
          })
        },
        //  获取标签
        getClassify() {
          axios.get('/classifys/classifyList',{params:{
              page: this.page,pageSize: 100
            }}).then((response) => {
            let res = response.data;
            if (res.status == 0) {
              if (res.result.length == 0) {
                return;
              }
              this.classifyList = res.result;
            }
          })
        },
        //  删除文章
        rmArticle(id) {
          if(confirm("确定删除吗?")) {
            axios.get('/article/rmArticle',{params:{_id:id}}).then((response) => {
              let res = response.data;
              if (res.status == 0) {
                alert(res.msg);
                this.getArticle()
              }
            })
          }
        },
        //  点击索引跳转
        getPage(index) {
          this.page = index;
          console.log(this.page);
          this.getArticle();

        },
        //  修改
        amendArticle(id) {
          this._id = id;
          axios.get('/article/articleList',{params:{_id:id}}).then((response => {
            let res = response.data;
            if (res.status == 0) {
              this.isEdit = true
              this.title = res.result.title;
              this.code = res.result.value;
              this.selected = res.result.classify;
            }
          }))
        },
        //  获取博客文章
        getArticle() {
          axios.get('/article/articleList',{params:{
              page:this.page,pageSize:this.pageSize
            }}).then((response) => {
            let res = response.data;
            if (res.status == 0) {
              this.articleList = res.result;
              this.countAll = res.countAll;
            }
          })
        },
        //  获取html源码格式
        $change(value,render) {
          this.value = value;
          this.content = render;
          },
        // 提交文章
        amendBlog() {
          if (confirm("确定提交吗?")) {
            let createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
            let param = {
              title: this.title,
              content: this.content,
              classify: this.selected,
              createDate: createDate,
              value: this.value,
              _id: ''
            }
            if (this.title.length == 0 | this.selected == '请选择标签') {
              alert("标题和标签不能为空!");
              return;
            }
            axios.post('/article/editarticle',param).then((response) => {
              let res = response.data;
              if (res.status == 0) {
                this.title = '';
                this.code = '';
                this.selected = '';
                alert(res.msg);
                this.isEdit = false
              }
            })
          }
        },
      //  取消
        cancel() {
          if (this.title || this.code || this.selected) {
           if(confirm("输入区存在带保存消息,确认关闭窗口?")) {
              this.title = '';
              this.code = '';
              this.selected = '';
              this.isEdit = false
            }
          }else {
            this.title = '';
            this.code = '';
            this.selected = '';
            this.isEdit = false
          }

        }
      },
      watch : {
        isEdit() {
          this.getArticle()
        }
      }
    }
</script>

<style lang="less" scoped>
  .blogList {
    &>button {
      text-align: right !important;
    }
    .articleList {
      table {
        th,td {
          text-align: center !important;
          vertical-align: middle;
        }
      }
    }
  }
  label {
    font-size: 20px;
    margin-right: 10px;
  }
  .articleTitle {
    margin-bottom: 20px;
    input {
      height: 30px;
      border: 1px solid #ccc;
      padding-left: 10px;
    }
  }
  .classify {
    margin-bottom: 20px;
    select {
      width: 200px;
      height: 30px;
      padding-left: 10px;
    }
  }
  .v-note-wrapper {
    height: 400px;
    margin-bottom: 30px;
  }
</style>
