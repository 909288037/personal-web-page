<template>
  <div class="account-box">
    <!--注册成功-->
    <div class="isOk" v-if="isOk == true">
      <div class="pass">
        <h1>恭喜您,注册成功</h1>
        <h3>Hi,{{userName}}</h3>
        <p><a href="javascript:;" @click="goHome">网页将在3秒钟后跳转....</a></p>
      </div>
    </div>
    <div class="container" v-if="isOk == false">
      <div class="row">
        <div class="account  text-center">
          <h1 class="title">注册账号</h1>
          <div>
            <label for="userName">昵称:</label>
            <input type="text" v-model="userName" id="userName" placeholder="请输入你的昵称(2-4个字符)">
            <span class="error" v-show="showE == 1"><i
              class="glyphicon glyphicon-remove-circle"></i>名字格式错误或包含敏感词汇!</span>
            <span class="error" v-show="showE == 2"><i class="glyphicon glyphicon-remove-circle"></i>名字已被占用</span>
            <span class="succeed" v-show="showE == 0"><i class="glyphicon glyphicon-ok-circle"></i>名字可以使用</span>
          </div>
          <div class="">
            <label for="account">账号:</label>
            <input type="text" v-model="userId" id="account" placeholder="请输入你的账号(6-11个字符)">
            <span class="error" v-show="showI == 1"><i class="glyphicon glyphicon-remove-circle"></i>账号格式不对哦,仅支持英文和数字!</span>
            <span class="error" v-show="showI == 2"><i class="glyphicon glyphicon-remove-circle"></i>账号已注册</span>
            <span class="succeed" v-show="showI == 0"><i class="glyphicon glyphicon-ok-circle"></i>账号可以使用</span>
          </div>

          <div>
            <label for="password">密码:</label>
            <input type="password" v-model="userPwd" id="password" placeholder="请输入你的密码(以字母开头,6-18个字符)">
            <span class="error" v-show="showP == 1"><i class="glyphicon glyphicon-remove-circle"></i>密码格式不对哦,仅支持以字母开头英文数字下划线!</span>
            <span class="succeed" v-show="showP == 0"><i class="glyphicon glyphicon-ok-circle"></i>密码格式正确</span>
          </div>
          <div>
            <label for="passwordTwo">确认密码:</label>
            <input type="password" v-model="userPwdTwo" id="passwordTwo" placeholder="请再次输入密码">
            <span class="error" v-show="showT == 1"><i class="glyphicon glyphicon-remove-circle"></i>密码不一致哦!</span>
            <span class="succeed" v-show="showT == 0"><i class="glyphicon glyphicon-ok-circle"></i>密码一致</span>
          </div>
          <button type="button" :disabled="isDisabled" @click="register">注册</button>
          <button type="button" @click="goHome">返回首页</button>
        </div>

      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import NavFooter from '@/components/NavFooter'
  import axios from 'axios'
  import {Format} from '../util/util'


  export default {
    name: "account",
    data() {
      return {
        userName: '',
        userId: '',
        userPwd: '',
        userPwdTwo: '',
        showE: -1,
        showI: -1,
        showP: -1,
        isOk: false
      }
    },
    computed: {
      showT() {
        if (this.userPwd == this.userPwdTwo && this.userPwd.length != 0) {
         return  0;
        }else if(this.userPwd != this.userPwdTwo){
         return  1;
        }else {
          return -1;
        }
      },
      isDisabled() {
        if (this.showE==0 && this.showI == 0 && this.showP == 0 && this.showT == 0) {
          return false;
        }
        return true;
      }
    },
    mounted() {
      this.testInput();
    },
    methods: {
      //  格式检测
      testInput() {
        const that = this;
        //  检测昵称
        $('#userName').blur(function () {
          let testName = /^[\u4E00-\u9FA5A-Za-z]{2,4}$/;
          that.userName = that.userName.trim();
          if (testName.test(that.userName) && that.userName.indexOf("刘帅") == -1 && that.userName.length != 0) {
            axios.get('/users/name',{params:{
                userName:that.userName
              }}).then((response) => {
              let res = response.data;
              // console.log(res.status);
              if (res.status == 0) {
                that.showE = 2;
              }else if(res.status == 10001) {
                that.showE = 0;
              }
            });
          } else if (testName.test(that.userName) == false || that.userName.indexOf("刘帅") != -1 || that.userName.length == 0) {
            return that.showE = 1;
          }

        });
      //  检测账号
        $("#account").blur(function () {
          let testId = /^[A-Za-z0-9]{6,11}$/;
            that.userId = that.userId.trim();
          if (testId.test(that.userId)) {
            axios.get('/users/name',{params:{
                userId:that.userId
              }}).then((response) => {
              let res = response.data;
              // console.log(res.status);
              if (res.status == 0) {
                that.showI = 2;
              }else if(res.status == 10001) {
                that.showI = 0;
              }
            });
          } else if (testId.test(that.userId) == false || that.userId.length == 0) {
            return that.showI = 1;
          }
        });
        //  密码检测
        $("#password").blur(function () {
          let testPwd = /^[a-zA-Z]\w{5,17}$/;
          if (testPwd.test(that.userPwd)) {
            that.showP = 0
          }else  {
            that.showP = 1
          }
        });
      //  重复检测
        $("#passwordTwo").blur(function () {

        })
      },
      //  回首页
      goHome() {
        this.$router.push({
          path: '/'
        })
      },
      //  注册
      register() {
        let that = this;
        let t = Math.ceil(Math.random()*7);
        let regTime = new Date().Format('yyyy-MM-dd hh:mm:ss');
        axios.post('/users/register', {
          userName: this.userName,
          userId: this.userId,
          userPwd: this.userPwd,
          userImg: `hd${t}.jpg`,
          regTime: regTime
        }).then((response) => {
          let res = response.data;
          if (res.status == 0) {
            this.isOk = true;
            setTimeout(function () {
              that.goHome();
            },3000);
          }
        })
      }
    },
    components: {
      NavFooter
    }
  }
</script>

<style lang="less" scoped>
  .title {
    color: #e15671;
    font-size: 26px;
    font-weight: bold;
  }

  .account-box {
    width: 100%;
    height: 100%;
    /*注册成功提示*/
    .isOk {
      width: 100%;
      height: 100%;
      .pass {
        h1 {
          font-size: 32px;
          color: #e15671;
          margin-bottom: 20px;
        }
        h3 {
          color: #2bc4e2;
        }
        text-align: center;
        margin: 200px auto;
        font-size: 18px;
      }
    }
    .container {
      width: 100%;
      height: 100%;
      background: url("../../static/login.jpg") no-repeat center;
      background-size: cover;
    }
    .account {
      padding: 106px 0 0px;
      & > div {
        position: relative;
      }
      h1 {
        margin: 0;
        padding-left: 45px;
      }
      label {
        display: inline-block;
        width: 100px;
        color: #e15671;
        font-size: 20px;
      }
      input {
        width: 300px;
        height: 40px;
        border: 1px solid #e15671;
        -webkit-border-radius: 19px;
        -moz-border-radius: 19px;
        border-radius: 19px;
        outline: none;
        padding-left: 15px;
      }
      div {
        margin-top: 30px;
      }
      button {
        width: 200px;
        height: 40px;
        color: #fff;
        -webkit-border-radius: 19px;
        -moz-border-radius: 19px;
        border-radius: 19px;
        outline: none;
        border: none;
        background: #e15671;
        margin-top: 30px;
        margin-left: 45px;
      }
      .error, .succeed {
        position: absolute;
        left: 66%;
        top: 50%;
        transform: translateY(-50%);
      }
      .error {
        color: #fe221a;
      }
      .succeed {
        color: #00eb00;
      }
    }
  }
</style>
