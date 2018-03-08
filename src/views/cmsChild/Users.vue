<template>
  <div class="userItem">
    <div class="container-fluid search">
      <div class="text-center">
        <label for="userSearch">会员查找:</label>
        <input type="text" id="userSearch" placeholder="请输入账号或昵称" v-model="info">
        <button type="button" class="btn btn-danger" @click="getUserInfo(info)">搜索</button>
      </div>
    </div>
    <div class="amend" v-if="isAmend">
      <div class="container-fluid">
        <div class="row">
          <div>
            <label for="userName">昵称:</label>
            <input type="text" v-model="userName" id="userName" value="userName">
          </div>
          <div>
            <label for="account">账号:</label>
            <input type="text" v-model="userId" id="account" value="userId">
          </div>
          <div>
            <label for="password">密码:</label>
            <input type="text" v-model="userPwd" id="password" value="userPwd">
          </div>
          <div>
            <label for="userImg">图片:</label>
            <input type="text" v-model="userImg" id="userImg" value="userImg">
          </div>
          <button type="button" @click="goAmend">修改</button>
          <button type="button" @click="isAmend = false">取消</button>
        </div>
      </div>
    </div>
    <table class="table table-hover table-bordered table-striped" v-else>
      <thead>
      <tr>
        <th><input type="checkbox" id="checkbox" :checked="checkedAll" @click="checkAll"> 全选</th>
        <th>编号</th>
        <th>头像</th>
        <th>用户</th>
        <th>账号</th>
        <th>密码</th>
        <th>注册时间</th>
        <th>修改</th>
        <th><button class="btn btn-danger" href="javascript:;" @click="removeUser">删除选中</button></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in userList">
        <td><input type="checkbox" :value="item.userName"  v-model="item.checked" @click="goChecked($event)"></td>
        <td>{{index+1}}</td>
        <td><img :src="'../../static/'+item.userImg" alt=""></td>
        <td>{{item.userName}}</td>
        <td>{{item.userId}}</td>
        <td>{{item.userPwd}}</td>
        <td>{{item.regTime}}</td>
        <td><button class="btn btn-info" href="javascript:;" @click="getUserInfo(item.userName,true)">修改</button></td>
        <td><button class="btn btn-danger" href="javascript:;" @click="removeUser(item.userName,true)">删除</button></td>
      </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation" v-show="isAmend == false">
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

  export default {
    name: "user-item",
    data() {
      return {
        userList: [],
        page: 1,
        pageSize: 10,
        countAll: 0,
        info: '',
        isAmend: false,
        userName: '',
        userId: '',
        userImg: '',
        userPwd: '',
        oldName: '',
        checkedAll: '',
      }
    },
    computed: {

    },
    mounted() {
      this.getUserList();
    },
    methods: {
      //  删除
      removeUser(name,flag) {
        if (name&&flag) {
          axios.post('/users/removeUser',{userName:name}).then((response) => {
            let res = response.data;
            if(res.status == 0) {
              alert("删除成功");
              this.getUserList();
            }
          })
        }else {
          axios.post('/users/removeUser',{rmSelect: true}).then((response) => {
            let res = response.data;
            if(res.status == 0) {
              alert("删除成功");
              this.getUserList();
            }
          })
        }
      },
      //  单选
      goChecked (e) {
        let isChecked = e.target.checked ? '1': '0';
        console.log(e.target.checked);
          axios.post('/users/editCheckAll',{userName:e.target.value,checked:isChecked}).then((response) => {
            let res = response.data;
            if (res.status == 0) {
              this.getUserList();
            }
          })

      },
      //  全选
      checkAll() {
        this.checkedAll = $('#checkbox').is(':checked');
        let checkAll = this.checkedAll ? '1' : '0';
        axios.post('/users/editCheckAll',{checkAll:checkAll}).then((response) => {
          let res = response.data;
          if (res.status == 0) {
            this.getUserList();
          }
        })
      },
      //  修改会员
      goAmend() {
        let param = {
          oldName:this.oldName,
          userName:this.userName,
          userId:this.userId,
          userImg:this.userImg,
          userPwd:this.userPwd
        }
        if (confirm("确定修改吗啊?")) {
          axios.post('/users/amend',param).then((response) => {
            let res = response.data;
            if (res.status == 0) {
              alert(res.msg);
              this.isAmend = false;
              this.getUserList();
            }
          })
        }
      },
      //  获取注册会员信息
      getUserList() {
        axios.post('/users/userList', {page: this.page, pageSize: this.pageSize}).then((response) => {
          let res = response.data;
          if (res.status == 0) {
            this.userList = res.result;
            this.countAll = res.countAll;
            this.userList.forEach((item) => {
              if (item.checked != 1) {
                this.checkedAll = 0
              }else {
                if (this.userList.length == 0) {
                  this.checkedAll = 0
                }else {
                  this.checkedAll = 1;
                }
              }
            })
          }
        })
      },
      //  点击索引跳转
      getPage(index) {
        this.page = index;
        this.getUserList();
      },
      //  查找会员
      getUserInfo(info,flag) {
        axios.post('/users/search', {userName: info, userId: info}).then((response => {
          let res = response.data;
          if (res.status == 0) {
            if (flag) {
              this.isAmend = true;
              this.userName = res.result.userName;
              this.userId = res.result.userId;
              this.userImg = res.result.userImg;
              this.userPwd = res.result.userPwd;
              this.oldName = res.result.userName;
            } else {
              this.userList = [res.result];
            }
          } else {
            alert("查无此人");
          }
        }))
        this.info = '';
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/css/index";
  .userItem {
    /*搜索框*/
    .search {
      margin-bottom: 10px;
      input {
        width: 350px;
        height: 40px;
        border: 1px solid #ff530a;
        padding-left: 10px;
        outline: none;
      }
    }

    table {
      th, td {
        text-align: center !important;
        vertical-align: middle;
        img {
          width: 25px;
          height: 25px;
          vertical-align: middle;
        }
      }
      th {
        font-weight: bold;
      }
    }
    nav {
      margin-top: -25px;
      text-align: right;
    }
  }
</style>
