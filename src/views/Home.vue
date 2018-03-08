<template>
  <div class="main">
    <nav-header></nav-header>
    <div class="container">
      <div class="row ">
        <!--首页-->
        <div class="home text-center">
          <div class="headImg" id="aboutMe">
            <img src="../assets/touxiang.jpg" title="汪汪汪" alt="图片消失了">
          </div>
          <div class="myName">
            <span>刘帅</span><br>
            Web程序员
          </div>
        </div>
        <!--关于我-->
        <div class="aboutMe" id="projects"> 刘帅，一个2017年入行90后菜鸟😂，Web程序员。热爱学习,良好的团队合作精神，能迅速融入新的团队。
          易和人相处，拥有良好的亲和力😊。有强烈的责任感，工作踏实，性格开朗乐观，积极上进，吃苦耐劳😎。
          能在较大的压力下保持良好的工作状态，善于自我调节😛。非常热爱编程，喜欢钻研新的技术，喜欢接受各种不同的挑战。
          具有很强的自学能力和良好的学习方法。😄😄😄
        </div>
      </div>
    </div>
    <!--最近开发的项目-->
    <div class="projects">
      <div class="container">
        <div class="row">
          <h1 class="myName text-center">最新<span>开发</span>的<span>项目</span></h1>
          <ul>
            <li class="col-md-6 col-sm-12 col-xs-12" v-for="item in items">
              <a :href="item.itemUrl">
                <div class="col-md-6 col-sm-6 col-xs-12" :class="{'content-right' : item.itemPosition == 0,'content-left': item.itemPosition == 1}">
                  <h3 :title="item.itemName">{{item.itemName}}</h3>
                  <p>{{item.itemInfo}}</p>
                </div>
                <div class="projects-img col-md-6 col-sm-6 col-xs-12">
                  <img class="col-xs-12 myImg" :src="'../../static/'+item.itemImg" alt="">
                </div>
              </a>
            </li>
          </ul>
          <loading v-if="isLoading"></loading>
          <div class="text-right btn-box">
            <button class="btnStyle" v-if="liLength != countAll" @click="getMore">查看更多...</button>
            <button class="btnStyle" v-else-if="isLoading">加载中...</button>
            <button class="btnStyle" v-else>没有了...</button>
          </div>
        </div>
      </div>
    </div>
    <!--博客-->
    <div class="blog" id="blog">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h1 class="myName text-center">最新<span>技术</span>开发<span>博客</span></h1>
            <p class="myInfo">整理一些在项目中用到的小知识或者技术点做一个总结及叙述，希望通过这些记录，能够将自己的学习成果总结出来，与大家分享交流。</p>
            <div class="blog-list">
              <h3>按 <span style="color: #FF5333; font-weight: 600;">时间</span> 顺序</h3>
              <ul>
                <li v-for="item in articleList">
                  <router-link :to="{ path: 'readArticle', query: {_id: item._id}}">
                    <div class="item-title">
                      <h4>{{item.title}}</h4>
                      <span>{{item.createDate.slice(0,10)}}</span>
                      <div class="border-bottom"></div>
                    </div>
                    <div class="item-info">{{item.value.slice(0,101)+"..."}}</div>
                  </router-link>
                </li>
              </ul>
            </div>
            <div class="text-right btn-box">
              <router-link tag="button" class="btnStyle" to="/blogs" style="margin: ">查看更多...</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import NavHeader from '@/components/NavHeader'
  import NavFooter from '@/components/NavFooter'
  import axios from 'axios'
  import Loading from '@/components/Loading'
  export default {
    name: "home",
    data() {
      return {
        items: '',
        countAll: 0,
        count: -1,
        liLength: -1,
        page: 1,
        pageSize: 6,
        isLoading: false,
        articleList: ''
      }
    },
    mounted() {
      this.getItems();
      this.getArticle();
    },
    updated() {
      this.getAllHeight();
    },
    methods: {
    //  点击获取更多项目
      getMore() {
        this.isLoading = true;
        this.page++;
        this.getItems(true);
        this.$nextTick(function () {
          this.getAllHeight();
        })
      },
    //  获取所有的分区高度
      getAllHeight() {
      //  首页距离
        let homeH = $('.hello').offset().top+198;
        // console.log(homeH);
        //  关于我的距离
        let aboutMeH =$('.aboutMe').offset().top-100;
        // console.log(aboutMeH);
        //  项目距离
        let projectsH = $('.projects').offset().top-100;
        // console.log(projectsH);
        //  博客距离
        let blogH = $('.blog').offset().top-200;
        // console.log(blogH);
        let arr = [0,aboutMeH-200,projectsH,blogH];
        //  滚动监听
        $(window).scroll(function () {
          let scrollT = $(document).scrollTop();
          if ( scrollT <= homeH) {
            _activeClass(0);
            $(".home").addClass("animated bounceInDown")
          }else if (scrollT > homeH && scrollT <= aboutMeH) {
            $(".home").removeClass("animated bounceInDown");
            $(".aboutMe").addClass("animated rotateIn");
            _activeClass(1);
          }else if (scrollT > aboutMeH && scrollT < blogH) {
            $(".aboutMe").removeClass("animated rotateIn");
            $(".blog").removeClass("animated wobble");
            $(".projects").addClass("animated flash");
            _activeClass(2)
          }else if (scrollT >= blogH) {
            $(".projects").removeClass("animated flash");
            $(".blog").addClass("animated wobble");
            _activeClass(3)
          }
        });
        //  点击导航栏滚动指定区域
        for (var i = 0; i < 4; i++) {
          $('.hello ul li').eq(i).click(function () {
            // console.log($(this).index());
            $('html,body').animate({scrollTop:arr[$(this).index()]},200);
          })
        }
        //  控制active方法
        function _activeClass(index) {
          $('.hello ul li').eq(index).addClass("active").siblings('li').removeClass('active');
        }
      },
    //  获取项目数据
      getItems(flag) {
        let param = {
          page: this.page,
          pageSize: this.pageSize
        }
        axios.get("/items",{params:param}).then((response) => {
          let res = response.data;
          this.isLoading = true;
          if (res.status == 0) {
            this.isLoading = false;
            if (flag) {
              if (res.result.count == 0) {
                return ;
              }else {
                this.items = this.items.concat(res.result.list);
              }
            }else {
              this.items = res.result.list;
            }
            this.countAll = res.result.countAll;
            this.$nextTick(function () {
              this.liLength = $('.projects ul li').length;
            })
            // console.log(this.items);
          }
        });
        // this.getAllHeight();
      },

    //  获取博客文章
      getArticle() {
        axios.get('/article/articleList',{params:{
          page:1,pageSize:5
          }}).then((response) => {
            let res = response.data;
            if (res.status == 0) {
              this.articleList = res.result;
            }
        })
      }
    },
    components: {
      NavHeader,
      NavFooter,
      Loading
    }
  }
</script>

<style lang="less" scoped>
  @media screen and (min-width:992px) and (max-width:1199px){
    .myImg {
      height: 212px;
    }
  }
  @media screen and (max-width: 992px){
    .btn-box {
      text-align: center;
    }
  }
  .main {
    .home {
      padding: 55px 0 0;
    }
    .myName {
      position: relative;
      padding: 40px 0;
      font-size: 36px;
      font-family: "黑体";
      span {
        font-size: 45px;
        color: #ff530a;
        font-weight: 600;
      }
      &:after {
        content: '';
        position: absolute;
        bottom: 15px;
        left: 50%;
        margin-left: -70px;
        width: 140px;
        height: 1px;
        background: #C8C1B3;
      }
    }
    /*项目*/
    .projects {
      background: url("../assets/bgImg01.jpg") no-repeat fixed;
      -webkit-background-size: cover;
      background-size: cover;
      /*height: 1000px;*/
      ul {
        padding: 40px 15px;
        overflow: hidden;
        li {
          /*width: 50%;*/
          height: 100%;
          background-color: #fff;
          padding: 0;
          margin-bottom: 10px;
          overflow: hidden;
          &:hover {
            .projects-img>img {
              transition: transform .5s;
              transform:scale(1.1,1.1);
            }
          }
          .projects-img {
            /*width: 100%;*/
            /*height: 100%;*/
            /*float: right;*/
            padding: 0;
            text-align: center;
            overflow: hidden;
            img {
              position: relative;
              /*width: 100%;*/
              /*height: 100%;*/
              width: 285px;
              height: 200px;
              padding: 0;
              left: 50%;
              margin-left: -142.5px;
              /*transform: translateX(-50%);*/
            }
          }
          .content-right {
            position: relative;
            height: 100%;
            /*width: 50%;*/
            float: right;
            text-align: center;
            padding: 40px 35px 45px;
            &:before {
              content: '';
              position: absolute;
              top: 50%;
              left: -15px;
              width: 30px;
              height: 30px;
              margin-top: -15px;
              background-color: #fff;
              transform: rotate(45deg);
              z-index: 10;
            }
          }
          .content-left {
            position: relative;
            height: 100%;
            /*width: 50%;*/
            float: left;
            text-align: center;
            padding: 40px 35px 45px;
            &:before {
              content: '';
              position: absolute;
              top: 50%;
              right: -15px;
              width: 30px;
              height: 30px;
              margin-top: -15px;
              background-color: #fff;
              transform: rotate(45deg);
              z-index: 10;
            }
          }
          h3 {
            position: relative;
            color: #323232;
            font-size: 20px;
            font-weight: 600;
            padding: 0 40px 20px;
            margin: 0;
            white-space: nowrap;
            -ms-text-overflow: ellipsis;
            text-overflow: ellipsis;
            overflow: hidden;
            &:after {
              content: "";
              position: absolute;
              left: 50%;
              margin-left: -45px;
              bottom: 0;
              width: 90px;
              height: 1px;
              background-color: #ff530a;
            }
          }
          p {
            padding-top: 25px;
            color: #959595;
            margin: 0;
          }
        }

      }
    }
    /*按钮样式*/
    .btn-box {
      padding: 20px 15px 40px;
      .btnStyle {
        border: none;
        width: 200px;
        height: 50px;
        background: rgba(255,84,11,0.7);
        color: #fffacd;
        outline: none;
        &:hover {
          background: rgba(255,84,11,1);
        }
      }
    }
    /*博客*/
    .blog {
      .container {
        p {
          display: inline-block;
          width: 100%;
          color: #9D9D9D;
          font-size: 16px;
          line-height: 26px;
          padding: 40px 50px 0;
        }
        .blog-list {
          padding-top: 85px;
          h3 {
            font-size: 20px;
            font-weight: 600;
          }
          li {
            padding: 21px 0;
            &:hover {
              background: #F1FAFA;
            }
          }
          .item-title {
            h4 {
              display: inline-block;
              position: relative;
              /*background: #fff;*/
              color: #333;
              font-size: 18px;
              font-weight: 600;
            }
            .border-bottom {
              border: 1px dashed #ccc;
            }
            span {
              float: right;
              /*line-height: 48px;*/
              font-size: 15px;
              color: #938463;
            }
          }
          .item-info {
            padding: 12px 0 0;
            color: #949494;
          }
        }
      }
    }
  }

  .home .headImg img {
    width: 150px;
    height: 150px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    margin: 6px;
    border: 6px solid rgba(0, 0, 0, 0.1);
    &:hover {
      border: 6px solid rgba(0, 0, 0, 0.3);
      cursor: pointer;
    }
  }

  /*关于我*/
  .aboutMe {
    padding: 40px 0;
    /*width: 89%;*/
    /*margin-left: 50%;*/
    /*transform: translateX(-50%);*/
    font-size: 16px;
    background: #F1FAFA;
    text-indent: 2em;
  }
</style>
