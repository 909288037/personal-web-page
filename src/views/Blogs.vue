<template>
  <div class="blogs">
    <div class="container-fluid">
      <div class="row">
        <blogs-header>
          <slot>Welcome to my blog</slot>
        </blogs-header>
        <!-- 文章列表 -->
        <div class="blogsList">
          <ul>
            <li v-for="item in articleList">
              <h1>{{item.title}}</h1>
              <div>
                <span>
                  <i class="glyphicon glyphicon-time"></i>
                  {{item.createDate}}
                </span>
                <span>
                  <i class="glyphicon glyphicon-tag"></i>
                  {{item.classify}}
                </span>
                <span>
                  <i class="glyphicon glyphicon-eye-open"></i>
                  {{item.PV}}
                </span>
              </div>
              <p>{{item.value.slice(0,151)+'...'}}</p>
              <div class="read-box">
                <button type="button" class="read" @click="goReadBlog(item._id)">
                  <span>阅读全文</span>
                </button>
              </div>
            </li>
          </ul>
        </div>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
          <loading v-if="isLoading"></loading>
        </div>
        <div class="text-center">
          <span v-show="isBottom" style="display: inline-block; font-weight: bold; margin: 30px 0">已经到底了，别扯了(*^__^*)</span>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import axios from 'axios'
  import NavFooter from '../components/NavFooter'
  import BlogsHeader from '../views/BlogsChild/BlogsHeader'
  import Loading from '@/components/Loading'

    // setTimeout(function () {
    //   $(".title").addClass("animated zoomInLeft")
    // },2000)



  export default {
    name: "blogs",
    data() {
      return {
        articleList: '',
        page: 1,
        pageSize: 5,
        isRead: true,
        readArticles: '',
        isLoading: false,
        isBottom: false
      }
    },
    mounted() {
      this.getArticle();
    },
    methods: {
      //  下拉获取
      loadMore() {
        this.busy = true;
        setTimeout(() => {
          this.page++;
          this.getArticle();
          this.busy = false;
        }, 500);
      },
      //  跳转详细页
      goReadBlog(id) {
        this.$router.push({
          path: `/readArticle`,
          query: {_id: id}
        })
      },
      //  获取文章
      getArticle() {
        if (this.page > this.countAll) {
          this.isBottom = true;
          return;
        }
        this.isLoading = true;
        axios.get('/article/articleList', {
          params: {
            page: this.page, pageSize: this.pageSize
          }
        }).then((response) => {
          let res = response.data;
          this.isLoading = false;
          if (res.status == 0) {
            if (this.page > 1) {
              this.articleList = this.articleList.concat(res.result)
            } else {
              this.articleList = res.result;
            }
            this.countAll = res.countAll;
          }
        })
      }
    },
    components: {
      NavFooter,
      BlogsHeader,
      Loading
    }
  }
</script>

<style lang="less" scoped>
  @media screen and (max-width: 700px) {
    .blogsList {
      ul {
        padding: 0 !important;
      }
    }
  }

  .blogs {
    position: relative;
    overflow: hidden;
    background: #F1FAFA;
    .blogsList {
      ul {
        padding: 0 200px;
        li {
          padding-bottom: 20px;
          border-bottom: 2px solid #ff530a;
          h1 {
            font-size: 26px;
            margin: 30px 0 20px;
            font-family: Microsoft YaHei, \\5FAE\8F6F\96C5\9ED1, STXihei, \\534E\6587\7EC6\9ED1, serif;
            font-weight: bold;
          }
          div {
            span {
              margin-right: 10px;
              vertical-align: middle;
              i {
                vertical-align: top;
              }
            }
          }
          p {
            margin: 30px 0;
          }
          .read-box {
            text-align: right;
            margin: 20px 0 30px;
            .read {
              border: none;
              background-color: rgba(255, 83, 10, 0.7);
              -webkit-border-radius: 9px;
              -moz-border-radius: 9px;
              border-radius: 5px;
              padding: 0 0 0 7px;
              outline: none;
              &:hover {
                background-color: rgba(255, 83, 10, 1);
              }
              span {
                display: inline-block;
                color: #fff;
                height: 40px;
                line-height: 40px;
                padding-left: 7px;
                transition: all .5s;
                margin-right: 0;
                &:after {
                  content: " >>";
                  opacity: 0;
                  transition: all .5s ease;
                  font-size: 12px;
                  position: relative;
                  right: 0;
                }
                &:hover {
                  transform: translateX(-7px);
                  &:after {
                    opacity: 1;
                  }
                }
              }
            }
          }
        }
      }
    }
    /*详细页面*/
    .reading {
      h1 {
        margin: 20px 0;
        font-size: 28px;
        font-weight: bold;
      }
      span {
        margin-right: 10px;
        vertical-align: middle;
        i {
          vertical-align: top;
        }
      }
      .reading-box {
        margin: 50px 0;
      }
    }
  }

  @keyframes myScale {
    0% {
      transform: scale(1, 1);
    }
    100% {
      transform: scale(1.2, 1.2);
    }
  }
</style>
