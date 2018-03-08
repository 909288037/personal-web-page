<template>
    <div class="readBlog">
      <div class="container-fluid">
        <div class="row">
          <blogs-header>
            <slot>{{readArticles.title}}</slot>
          </blogs-header>
          <!-- 详细列表 -->
          <div class="reading">
            <div class="container">
              <div class="row text-center reading-box">
                <h1>{{readArticles.title}}</h1>
                <div class="text-right reading-label">
                <span>
                  <i class="glyphicon glyphicon-time"></i>
                  {{readArticles.createDate}}
                </span>
                  <span>
                  <i class="glyphicon glyphicon-tag"></i>
                  {{readArticles.classify}}
                </span>
                  <span>
                  <i class="glyphicon glyphicon-eye-open"></i>
                  {{readArticles.PV}}
                </span>
                </div>
                <div class="reading-content" v-html="readArticles.content"></div>
              </div>
            </div>
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


    export default {
        name: "read-blog",
      data() {
          return {
            readArticles: ''
          }
      },
      created() {
        this.readArticle();

      },
      updated() {
        $('html,body').scrollTop(654);
      },
      methods: {
        // 获取详情文章
        readArticle() {
          let id = this.$route.query._id;
          axios.get('/article/readArticle',{params: {
              _id: id
            }}).then((response) => {
            let res = response.data;
            if (res.status == 0) {
              this.readArticles = res.result;
              this.$nextTick(function () {
                $('.reading-content p').css({'margin': '10px 0 20px'})
              })
            }
          })
        },
      },
      components: {
        NavFooter,
        BlogsHeader,
      }
    }
</script>

<style lang="less" scoped>
  .readBlog {
    background: #FBFBEA;
    &>div {
      padding-bottom: 30px;
    }
  }
  .reading {
    h1 {
      margin: 50px 0;
      font-size: 28px;
      font-weight: bold;
    }
    span {
      margin-right: 10px;
      vertical-align: top;
      i {
        vertical-align: top;
      }
    }
    .reading-box {
      margin: 50px 0;
      font-family: Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,STXihei,\\534E\6587\7EC6\9ED1,serif;
      .reading-content {
        margin-top: 40px;
        text-align: left;
        line-height: 1.9;
        font-size: 18px;
      }

    }

  }

</style>
