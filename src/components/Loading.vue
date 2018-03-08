<template>
  <div class="loader29 loader">
    <div class="loader-29">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "loading"
    }
</script>

<style scoped>
  .loader {
    width: 100px;
    height: 100px;
    /*float: left;*/
    display: -webkit-flex;/*safari弹性布局*/
    justify-content: center;
    display: flex;
    align-items: center;
    margin: 0 auto;
  }
  .loader-29 {
    position: relative;
  }
  .loader-29 div {
    position: absolute;
    width: 10px;
    height: 10px;
    background: #ff540b;
    border-radius: 50%;
  }
  .loader-29 div:nth-child(1) {
    left: -20px;
    -webkit-animation: loader29-1 1.5s  ease-in-out infinite;
  }
  .loader-29 div:nth-child(2) {
    top: -35px;
    -webkit-animation: loader29-2 1.5s  ease-in-out infinite;
  }
  .loader-29 div:nth-child(3) {
    left: 20px;
    -webkit-animation: loader29-3 1.5s ease-in-out infinite;
  }
  @-webkit-keyframes loader29-1 {
    33.333% {
      -webkit-transform: translate(20px, -35px);
    }
    66.666% {
      -webkit-transform: translate(40px, 0);
    }
    100% {
      -webkit-transform: translate(0, 0);
    }
  }
  @-webkit-keyframes loader29-2 {
    33.333% {
      -webkit-transform: translate(20px, 35px);
    }
    66.666% {
      -webkit-transform: translate(-20px, 35px);
    }
    100% {
      -webkit-transform: translate(0, 0);
    }
  }
  @-webkit-keyframes loader29-3 {
    33.333% {
      -webkit-transform: translate(-40px, 0);
    }
    66.666% {
      -webkit-transform: translate(-20px, -35px);
    }
    100% {
      -webkit-transform: translate(0, 0);
    }
  }
</style>
