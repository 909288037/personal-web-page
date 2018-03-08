<template>
  <!-- Modal -->
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" @click="isShow=false">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="isShow=false"><span aria-hidden="true">&times;</span></button>
            <slot name="title"></slot>
        </div>
        <div class="modal-body">
          <div class="alert alert-danger alert-dismissible text-center" role="alert" v-show="isShow">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true"></span></button>
            <strong>登录失败!</strong> 账号或密码错误，请重试!
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">账号:</label>
            <input type="email" v-model="userId" class="form-control" id="exampleInputEmail1" placeholder="请输入账号">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">密码:</label>
            <input type="password" v-model="userPwd" class="form-control" id="exampleInputPassword1" placeholder="请输入密码">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click.stop.prevent="getLogin">登录</button>
          <button type="button" class="btn btn-danger" data-dismiss="modal" @click="isShow=false">取消</button>
        </div>
        <div class="text-right account">
          <a href="javascript:;" class="text-info " data-dismiss="modal" role="button" @click="goAccount">没有账号,点击注册</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "model",
      data() {
        return {
          userId:'',
          userPwd: '',
          isShow: false
        }
      },
      methods: {
        //  跳转注册页面
        goAccount() {
          this.$router.push({
            path: 'Account'
          })
        },
      //  登录
        getLogin() {
          let userId = this.userId.trim();
          let userPwd = this.userPwd.trim();
          if (userId.length == 0 || userPwd.length == 0) {
            this.userId = '';
            this.userPwd = '';
            this.isShow = true;
            return;
          }
          axios.post('/users/login',{
            userId: this.userId,
            userPwd: this.userPwd
          }).then((response) => {
            let res = response.data;
            // console.log(res);
            if (res.status == 0) {
              this.userId = '';
              this.userPwd = '';
              $('#myModal').modal('hide');
              // this.$router.go(0);
              this.$emit('getusername',...[res.result.userName,res.result.userImg]);
            }else {
              this.isShow = true;
            }
          })
        }
      }
    }
</script>

<style lang="less" scoped>
  input {
    border: 1px solid #ccc;
  }
  .account {
    padding: 0 15px 15px;
    a:hover{
      text-decoration: underline !important;
    }
  }
</style>
