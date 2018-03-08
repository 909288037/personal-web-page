<template>
  <div class="cms">
    <div class="admin">
      <div class="container-fluid">
        <div class="row">
          <!--管理页面-->
          <div class="cmsWeb" v-if="isLogin">
            <nav class="navbar navbar-default navbar-fixed-top clearfix">
              <div class="container">
                <div class="navbar-header">
                  <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                          data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                  </button>
                  <a class="navbar-brand" href="#">个人网站后台</a>
                </div>

                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul class="nav navbar-nav navbar-right">
                    <li>
                      <router-link to="/">首页</router-link>
                    </li>
                    <li class="dropdown">
                      <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                         aria-expanded="false">后台管理 <span class="caret"></span></a>
                      <ul class="dropdown-menu">
                        <li><a href="#">{{userName}}</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="#myModal" data-toggle="modal">修改密码</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="javascript:;" @click="logout">退出</a></li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <!--模态框-->
            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                      aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">管理员密码修改:</h4>
                  </div>
                  <div class="modal-body">
                    <form action="">
                      <div class="from-group">
                        <label for="oldPassword">旧密码:</label>
                        <input type="password" class="form-control" id="oldPassword">
                      </div>
                      <div class="from-group">
                        <label for="newPassword">新密码:</label>
                        <input type="password" class="form-control" id="newPassword">
                      </div>
                      <div class="from-group">
                        <label for="repeatPassword">重复新密码:</label>
                        <input type="password" class="form-control" id="repeatPassword">
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary">修改</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="container">
              <div class="row">
                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 tab">
                  <div class="panel-group" role="tablist">
                    <div class="panel panel-info">
                      <div class="panel-heading" role="tab" id="userItem">
                        <h4 class="panel-title">
                          <a class="collapsed" role="button" data-toggle="collapse" href="#collapseOne"
                             aria-expanded="false" aria-controls="collapseOne">
                            会员管理
                          </a>
                        </h4>
                      </div>
                      <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel"
                           aria-labelledby="userItem">
                        <ul class="list-group">
                          <router-link to="/cms/userItem" class="list-group-item">会员查看</router-link>
                        </ul>
                      </div>
                    </div>
                    <div class="panel panel-info">
                      <div class="panel-heading" role="tab" id="projects">
                        <h4 class="panel-title">
                          <a class="collapsed" role="button" data-toggle="collapse" href="#collapseTwo"
                             aria-expanded="false" aria-controls="collapseTwo">
                            项目管理
                          </a>
                        </h4>
                      </div>
                      <div id="collapseTwo" class="panel-collapse collapse in" role="tabpanel"
                           aria-labelledby="projects">
                        <ul class="list-group">
                          <router-link to="/cms/amendItems" class="list-group-item">项目查看</router-link>
                          <router-link to="/cms/addItem" class="list-group-item">项目添加</router-link>

                        </ul>
                      </div>
                    </div>
                    <div class="panel panel-info">
                      <div class="panel-heading" role="tab" id="blog">
                        <h4 class="panel-title">
                          <a class="collapsed" role="button" data-toggle="collapse" href="#collapseThree"
                             aria-expanded="false" aria-controls="collapseThree">
                            博客管理
                          </a>
                        </h4>
                      </div>
                      <div id="collapseThree" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="blog">
                        <ul class="list-group">
                          <router-link to="/cms/bloglist" class="list-group-item">文章列表</router-link>
                          <router-link to="/cms/classify" class="list-group-item">标签列表</router-link>
                        </ul>
                      </div>
                    </div>
                    <div class="panel panel-info">
                      <div class="panel-heading" role="tab" id="bbs">
                        <h4 class="panel-title">
                          <a class="collapsed" role="button" data-toggle="collapse" href="#collapse4"
                             aria-expanded="false" aria-controls="collapse4">
                            聊天室管理
                          </a>
                        </h4>
                      </div>
                      <div id="collapse4" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="bbs">
                        <ul class="list-group">
                          <a href="javascript:;" class="list-group-item">聊天查看</a>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10 views">
                  <router-view></router-view>
                </div>
              </div>
            </div>
          </div>
          <!--登录页面-->
          <div class="login" v-else>
            <h1>后台管理系统</h1>
            <div>
              <label for="userId">
                <span>账号:</span>
              </label>
              <input type="text" id="userId" v-model="userId" placeholder="管理员账号">
            </div>
            <div>
              <label for="pwd">
                <span>密码:</span>
              </label>
              <input type="password" id="pwd" v-model="userPwd" placeholder="管理员密码">
            </div>
            <button type="button" @click="login">登录</button>
            <router-link to="/" tag="button">返回首页</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "c-m-s",
    data() {
      return {
        isLogin: false,
        userPwd: '',
        userId: '',
        userName: '',
        userImg: ''
      }
    },
    methods: {
      //  登出
      logout() {
        if (window.confirm("确认退出吗?")) {
          axios.post("/users/logout").then((response) => {
            let res = response.data;
            if(res.status == 0) {
              this.$router.go(0)
            }
          })
        }
      },
      //  登录
      login() {
        let params = {
          userId: this.userId,
          userPwd: this.userPwd
        }
        axios.post('/users/login', params).then((response) => {
          let res = response.data;
          if (res.status == 0) {
            // console.log(res);
            this.isLogin = res.result.isAdmin;
            this.userName = res.result.userName;
            this.userImg = res.result.userImg;
            if (this.isLogin != true) {
              alert("对不起，你不是管理员，无权登录!")
            }
          } else {
            alert("登录失败")
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  /*登录页面*/
  .login {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    padding-top: 260px;
    text-align: center;
    background: url("../../static/admin.jpg") no-repeat center;
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
    h1 {
      font-size: 26px;
      color: #ffcd32;
      font-weight: 500;
      padding-left: 15px;
      padding-bottom: 20px;
    }
    div {
      margin-top: 20px;
      span {
        font-size: 20px;
        color: #ffcd32;
      }
    }
    input {
      width: 300px;
      height: 40px;
      border: 1px solid #ffcd32;
      outline: none;
      padding-left: 10px;
      -webkit-border-radius: 19px;
      -moz-border-radius: 19px;
      border-radius: 19px;
    }
  }

  /*管理页面*/
  .cmsWeb {
    .tab, .views {
      margin-top: 70px;
    }
  }
</style>
