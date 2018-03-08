<template>
  <div class="hello" id="home">
    <div class="container-fluid">
      <div class="row">
        <div class="bgImage">
          <img src="../assets/header3.jpg" alt="">
        </div>
      </div>
    </div>
    <nav class="navbar navHeader">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                  data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand logo" href="javascript:;" title="我们不一样" @click="goHome">
            <img src="../assets/logo.jpg" alt="">
          </a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav navbar-right" role="tablist">
            <li><a href="javascript:;">首页</a></li>
            <li><a href="javascript:;">关于我</a></li>
            <li><a href="javascript:;">项目</a></li>
            <li><a href="javascript:;">博客</a></li>
            <li><a href="javascript:;" @click="goBbs">聊天室</a></li>
            <li class="dropdown login" v-if="isLogin">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                 aria-expanded="false">
                <img :src="'../../static/'+userImg" alt="头像" class="hidden-xs">
                {{userName}}
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li>
                  <a href="javascript:;" @click="myCenter">
                    个人中心
                  </a>
                </li>
                <li role="separator" class="divider"></li>
                <li>
                  <a href="javascript:;" @click="logOut">
                    <button type="button" class="exit" data-toggle="modal" @click="logOut">退出</button>
                  </a>
                </li>
              </ul>
            </li>

            <li v-else>
              <a href="#myModal" data-toggle="modal">登录/注册</a>
            </li>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>
    <model @getusername="getName">
        <h4 class="modal-title text-center" slot="title" id="myModalLabel">登录</h4>
    </model>
  </div>
</template>

<script>
  import Model from '@/components/Model'
  import axios from 'axios'
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        isLogin: false,
        userName: '',
        userImg: ''
      }
    },
    mounted() {
      this.getHeaderNav();
      this.checkLogin();
    },
    methods: {
      //  个人中心
      myCenter() {
        alert("个人中心暂未开放...:(")
      },
      //  回到首页
      goHome () {
        this.$router.push({
          path: '/'
        })
      },
      //  退出
      logOut () {
        if (window.confirm("确认退出吗?")) {
          axios.post("/users/logout").then((response) => {
            let res = response.data;
            if(res.status == 0) {
              this.isLogin = false;
              this.checkLogin();
            }
          })
        }
      },
      //  检测是否登录
      checkLogin() {
        axios.get("/users/checkLogin").then((response) => {
          let res = response.data;
          if (res.status == 0) {
            this.userName = res.result.userName;
            this.userImg = res.result.userImg;
            this.isLogin = true;
          }else {
            this.isLogin = false
          }
          this.$emit("isLogin",this.isLogin)
          // this.checkLogin();
        })
      },
      //  获取用户名
      getName (userName,userImg) {
        this.isLogin = true;
        this.userName = userName;
        this.userImg = userImg;
      },
      //  头部tab位子定位
      getHeaderNav () {
        $(window).scroll(function(){
          if ($(document).scrollTop()　>= 150) {
            $('.navHeader').css({"position":"fixed","top":0})
          }else {
            $('.navHeader').css({"position":"absolute","top":150})
          }
        });
      },
      goBbs() {
        this.$router.push({
          path: 'bbs'
        })
      }
    },
    components: {
      Model
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .hello {
    position: relative;

  }
  .hello .bgImage img {
    width: 100%;
    height: 250px;
  }

  .hello .logo {
    padding-left: 0;
  }

  .hello .logo img {
    margin-top: -40px;
    border-radius: 50%;
    width: 130px;
    height: 100px;
    opacity: .8;
  }

  .navHeader {
    position: absolute;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 0;
    width: 89%;
    padding: 25px 40px;
    background-color: rgba(255, 255, 255, 0.8);
    border: none;
    z-index: 100;
    .login {
      margin-top: -15px;
      a {
        &:hover {
          span {
            color: #ff630e;
          }
        }
        &:focus {
          background-color: transparent !important;
        }
        img {
          width: 50px;
          height: 50px;
          vertical-align: middle;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          border-radius: 50%;
        }
      }
      .exit {
        /*color: #868686;*/
        border: none;
        outline: none;
        background: transparent;
        &:hover {
          color: #ff630e;
        }
      }
    }

  }

  .navHeader .navbar-right {
    margin-top: 10px;

  }

  .navHeader .navbar-brand {
    color: #777;
  }

  .navHeader .navbar-brand:hover,
  .navHeader .navbar-brand:focus {
    color: #5e5e5e;
    background-color: transparent;
  }

  .navHeader .navbar-text {
    color: #777;
  }

  .navHeader .navbar-nav > li > a {
    font-size: 15px;
    margin: 0 15px;
    padding: 10px 0;
    color: #2E2E2E;
  }

  .navHeader .navbar-nav > li > a:before {
    content: '';
    background: transparent;
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 0;
    height: 2px;
    transition: all .3s;
  }

  .navHeader .navbar-nav > li > a:focus:before,.navHeader .navbar-nav > li > a:active:before,.navHeader .navbar-nav > li.active > a:before,.navHeader .navbar-nav > li > a:hover:before,.navHeader .navbar-nav > li.active > a:hover:before {
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: #ff5333;
  }

  .navHeader .navbar-nav > li > a:hover,
  .navHeader .navbar-nav > li > a:focus {
    color: #333;
    background-color: transparent;
  }

  .navHeader .navbar-nav > .active > a,
  .navHeader .navbar-nav > .active > a:hover,
  .navHeader .navbar-nav > .active > a:focus {
    color: #555;
    /*background-color: #e7e7e7;*/
  }

  .navHeader .navbar-nav > .disabled > a,
  .navHeader .navbar-nav > .disabled > a:hover,
  .navHeader .navbar-nav > .disabled > a:focus {
    color: #ccc;
    background-color: transparent;
  }

  .navHeader .navbar-toggle {
    border-color: #FF5333;
  }

  .navHeader .navbar-toggle:hover,
  .navHeader .navbar-toggle:focus {
    background-color: #ddd;
  }

  .navHeader .navbar-toggle .icon-bar {
    background-color: #FF5333;
  }

  .navHeader .navbar-collapse,
  .navHeader .navbar-form {
    border-color: #e7e7e7;
  }

  .navHeader .navbar-nav > .open > a,
  .navHeader .navbar-nav > .open > a:hover,
  .navHeader .navbar-nav > .open > a:focus {
    color: #555;
    background-color: #e7e7e7;
  }

  @media (max-width: 767px) {
    .navHeader .navbar-nav .open .dropdown-menu > li > a {
      color: #777;
    }

    .navHeader .navbar-nav .open .dropdown-menu > li > a:hover,
    .navHeader .navbar-nav .open .dropdown-menu > li > a:focus {
      color: #333;
      background-color: transparent;
    }

    .navHeader .navbar-nav .open .dropdown-menu > .active > a,
    .navHeader .navbar-nav .open .dropdown-menu > .active > a:hover,
    .navHeader .navbar-nav .open .dropdown-menu > .active > a:focus {
      color: #555;
      background-color: #e7e7e7;
    }

    .navHeader .navbar-nav .open .dropdown-menu > .disabled > a,
    .navHeader .navbar-nav .open .dropdown-menu > .disabled > a:hover,
    .navHeader .navbar-nav .open .dropdown-menu > .disabled > a:focus {
      color: #ccc;
      background-color: transparent;
    }
  }

  .navHeader .navbar-link {
    color: #777;
  }

  .navHeader .navbar-link:hover {
    color: #333;
  }

  .navHeader .btn-link {
    color: #777;
  }

  .navHeader .btn-link:hover,
  .navHeader .btn-link:focus {
    color: #333;
  }

  .navHeader .btn-link[disabled]:hover,
  fieldset[disabled] .navHeader .btn-link:hover,
  .navHeader .btn-link[disabled]:focus,
  fieldset[disabled] .navHeader .btn-link:focus {
    color: #ccc;
  }
</style>
