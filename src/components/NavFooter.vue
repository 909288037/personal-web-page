<template>
  <div class="footer">
    <div class="container-fluid">
      <div class="row text-center">
        <div class="col-md-12 col-sm-12">
          <a href="http://www.miitbeian.gov.cn/" class="icp" target="_blank">赣ICP备17016753号</a>
        </div>
        <div class="col-md-12 col-sm-12">Designed and developed by Shuai Liu.</div>
        <div class="col-md-12 col-sm-12">Copyright &copy; 2017-2018 liushuai.shop All  Rights Reserved | <router-link to="/cms">站长登录</router-link></div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "nav-footer"
    }
</script>

<style lang="less" scoped>
  .footer {
    background-color: #e9e9e9;
    color: #888;
    padding: 20px 0;
    font: bold 15px -apple-system,"Helvetica Neue",Helvetica,Arial,"PingFang SC","Hiragino Sans GB","WenQuanYi Micro Hei","Microsoft Yahei",sans-serif;
    .icp {
      font-size: 15px;
      color: #FF4F02 !important;
      font-weight: bold;
    }
  }
</style>
