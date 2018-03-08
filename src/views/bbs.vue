<template>
  <div class="bbs">
    <nav-header2 @userItem="getIsLogin">
      <slot>
        <img src="../assets/header4.jpg" alt="">
      </slot>
    </nav-header2>
    <div class="container-fluid">
      <div class="row">
        <div class="barrage-box">
            <div class="barrageList">
              <div class="alert alert-info alert-dismissible fade in text-center">
                <a href="#" class="close" data-dismiss="alert">
                  &times;
                </a>
                <strong>欢迎来到聊天室:当前聊天室版本v1.0</strong>
              </div>
              <ul >
                <li v-for="item in infoList" ref="info">
                  <div class="listItem">
                    <a href="javascript:;">
                      <img :src="'../../static/'+item.userImg" alt="">
                      <span>{{item.userName}}</span>:
                    </a>
                    <p>{{item.userInfo}}</p>
                    <div class="time">{{item.sendData}}</div>
                  </div>
                </li>
              </ul>
            </div>
          <div class="barrageSpeak" >
              <p ref="isText" contenteditable="true"></p>
            <div class="text" >朕有话要说~</div>
            <button class="btn btn-info"  contenteditable="false" @click="goSend">发送</button>
            <div class="mustLogin col-sm-12 col-xs-12" v-if="isLogin == false">
                <div>游客不能发送消息，请先<a href="javascript:;" @click="goLogin">登录</a>或<a href="javascript:;" @click="goAccount">注册</a>账号~</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>

</template>

<script>
  import NavHeader2 from '@/components/NavHeader2'
  import NavFooter from '@/components/NavFooter'
  import axios from 'axios'
  import {Format} from '../util/util'
  let socket = io.connect('http://127.0.0.1:3000');
  let colorArr = ["#FF0000","#00FF00","#0000FF","#FF00FF","#00FFFF","#FFFF00","#00FFFF","#FF7F00"];
  export default {
    name: "bbs",
    data() {
      return {
        infoList: [],
        userName: '',
        userImg: '',
        isLogin: ''
      }
    },
    mounted() {
      this.getInfoList();
      this.textShow();
      this.getSocketIo();
    },
    methods: {
      goAccount() {
        this.$router.push({
          path: 'Account'
        })
      },
      //  登录
      goLogin () {
        $('#myModal').modal('show')
      },
      getIsLogin(isLogin,userName,userImg) {
        this.isLogin = isLogin;
        this.userName = userName;
        this.userImg = userImg;
      },
      textShow() {
        let that = this;
        $('.barrageSpeak p').focus(function () {
          $('.text').hide()
        }).blur(function () {
          if (that.$refs.isText.innerText.length == 0) {
            $('.text').show()
          }
        })
      },
    //  接收各个发送消息
      getSocketIo() {
        socket.on('receiveMessage',(data) => {
          this.infoList.push(data)
          this.$nextTick(function () {
            for (var i = 0; i < $(".barrageList ul li").length; i++) {
              let temp = Math.floor(Math.random()*8);
              $(".barrageList ul li p").eq(i).css({color:colorArr[temp]})
              $('.barrageList').animate({scrollTop: $(".barrageList ul").height()}, 50);//让滚动条一直置于页面最底部
            }
          })
        })
      },
    //  发送
      goSend() {
        let info = this.$refs.isText.innerText.trim();

        if (info.length == 0) {
          this.$refs.isText.innerText = '';
          return alert("文本不能为空!");
        }else {
          this.$refs.isText.innerText = '';
          let sendData = new Date().Format('yyyy-MM-dd hh:mm:ss');
          let data = {
            userInfo: info,
            userName: this.userName,
            userImg: this.userImg,
            sendData:sendData
          }
          socket.emit('sendMessage', data);
          axios.post("/users/info",{
            userInfo: info,
            sendData:sendData
          }).then((response) => {
            let res = response.data;
            // if (res.status == 0) {
            //   this.$nextTick(function () {
            //     this.getInfoList();
            //   })
            // }
          })
        }
      },
    //  获取总聊天信息
      getInfoList() {
        axios.post("/users/getInfoList").then((response) => {
          let res = response.data;
          if (res.status == 0) {
            this.infoList = res.result;
            this.$nextTick(function () {
              for (var i = 0; i < $(".barrageList ul li").length; i++) {
                let temp = Math.floor(Math.random()*8);
                $(".barrageList ul li p").eq(i).css({color:colorArr[temp]})
                $('.barrageList').animate({scrollTop: $(".barrageList ul").height()}, 50);//让滚动条一直置于页面最底部
              }
            })
          }
        })
      }
    },
    components: {
      NavFooter,
      NavHeader2
    }
  }
</script>

<style lang="less" scoped>
  .bbs {
    /*width: 100%;*/
    /*height: 100%;*/
    .container {
      /*width: 100%;*/
      /*height: 100%;*/
    }
    .barrageList {
      width: 70%;
      height: 306px;
      border: 1px solid #CCCCCC;
      margin: 30px auto 10px;
      overflow: auto;
      ul{
        overflow: hidden;
        padding: 0 15px;
        li {
            .listItem {
              position: relative;
              padding: 10px 0;
              border-top: 1px dashed #ccc;
              img {
                width: 30px;
                height: 30px;
                vertical-align: middle;
              }
              span {
                padding-left: 5px;
                vertical-align: middle;
              }
              p{
                display: inline-block;
                font-size: 14px;
              }
              .time {
                position: absolute;
                display: inline-block;
                top: -5px;
                right: 10px;
                line-height: 25px;
                font-size: 12px;
              }
            }
        }
      }
    }
    .barrageSpeak {
      position: relative;
      width: 60%;
      height: 80px;
      border: 1px solid #ccc;
      margin: 0 auto 200px;
      outline: none;
      p{
        margin-top: 10px;
        width: 620px;
        height: 60px;
        padding-left: 15px;
        outline: none;
        overflow: auto;
      }
      .text {
        position: absolute;
        top: 10px;
        left: 15px;
        color: #999;
        z-index: -1;
      }
      button {
        position: absolute;
        top: 25px;
        right: 10px;
        outline: none;
        border: none;
      }
      .mustLogin {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 80px;
        text-align: center;
        /*line-height: 80px;*/
        color: #fff;
        font-size: 16px;
        background: rgba(0,0,0,0.3);
        z-index: 100;
        div {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          z-index: 101;
        }
      }
    }
  }
</style>
