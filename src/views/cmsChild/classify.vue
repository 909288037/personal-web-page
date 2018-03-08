<template>
    <div class="classify text-center">
      <div class="createLabel">
        <label for="title">创建标签:</label>
        <input type="text" placeholder="请输入标签" id="title" v-model.trim="label">
        <button type="button" class="btn btn-info" @click="createLabel">创建</button>
      </div>
      <table class="table table-hover table-bordered table-striped">
        <thead>
        <tr>
          <th>编号</th>
          <th>创建时间</th>
          <th>分类</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in classifyList">
          <td>{{index+1}}</td>
          <td>{{item.createDate}}</td>
          <td>{{item.classify}}</td>
          <td>
            <button class="btn btn-danger" @click="editClassify(item._id)">删除</button>
          </td>
        </tr>
        </tbody>
      </table>
      <nav aria-label="Page navigation">
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
        name: "classify",
      data() {
          return {
            classifyList: '',
            page: 1,
            pageSize: 10,
            label: '',
            countAll: 0
          }
      },
      mounted() {
        this.getClassify();
      },
      methods: {
          //  点击索引跳转
        getPage (index) {
          this.page = index;
          this.getClassify();
        },
          //  删除标签
        editClassify (id) {
          if (confirm("确定删除标签吗?")) {
            axios.get('/classifys/editClassify',{params: {
              _id: id
              }}).then((response) => {
              let res = response.data;
              if (res.status == 0) {
                alert(res.msg);
                this.getClassify();
              }
            })
          }
        },
          //  创建标签
          createLabel() {
            if(confirm("确定创建标签吗?")) {
              let createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
              axios.get('/classifys/addClassify',{params: {
                  classify: this.label,
                  createDate: createDate
                }}).then((response) => {
                let res = response.data;
                if (res.status == 0) {
                  alert(res.msg);
                  this.label = '';
                  this.getClassify();
                }
              })
            }

          },
          //  获取标签
          getClassify() {
            axios.get('/classifys/classifyList',{params:{
              page: this.page,pageSize: this.pageSize
              }}).then((response) => {
                let res = response.data;
                if (res.status == 0) {
                  if (res.result.length == 0) {
                    return;
                  }
                  this.classifyList = res.result;
                  this.countAll = res.countAll;
                }
            })
          }
      }
    }
</script>

<style lang="less" scoped>
  table {
    th,td {
      text-align: center !important;
    }
    td {
      vertical-align: middle !important;
    }
  }
  .createLabel {
    margin-bottom: 30px;
    label {
      color: #80d7cf;
      margin-right: 10px;
    }
    input {
      border: 1px solid #ff530a;
      height: 30px;
      padding-left: 10px;
      outline: none;
    }
  }
</style>
