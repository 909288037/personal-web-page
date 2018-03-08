<template>
    <div class="blogsHeader">
      <nav-header2 :isFlag="isFlag"></nav-header2>
      <div class="bgImg">
        <img src="../../assets/sunset.jpg" alt="">
        <div>
          <transition appear enter-active-class="animated zoomInLeft">
            <h1 class="title">
              <slot></slot>
            </h1>
          </transition>
        </div>
      </div>
    </div>
</template>

<script>
  import NavHeader2 from '@/components/NavHeader2'

  export default {
        name: "blogs-header",
    data() {
      return {
        isFlag: true,
      }
    },
    methods: {

    },
    components: {
      NavHeader2,
    }
    }
</script>

<style lang="less" scoped>
  @keyframes myScale {
    0% {
      transform: scale(1, 1);
    }
    100% {
      transform: scale(1.2, 1.2);
    }
  }
  ul {
    padding-left: 20%;
  }
  nav {
    margin: 0;
  }
  .bgImg {
    width: 100%;
    position: relative;
    overflow: hidden;
    img {
      width: 100%;
      height: 600px;
      -webkit-animation: myScale 5s ease-in-out infinite alternate;
      -o-animation: myScale 5s ease-in-out infinite alternate;
      animation: myScale 5s ease-in-out infinite alternate;
    }
    .title {
      text-align: center;
      width: 100%;
      font-family: Georgia, Microsoft YaHei, \\5FAE\8F6F\96C5\9ED1, STXihei, \\534E\6587\7EC6\9ED1, serif;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%);
      color: #fff;
      font-size: 50px;
      z-index: 99;
    }
  }
</style>
