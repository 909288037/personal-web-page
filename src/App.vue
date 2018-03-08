<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  @import "assets/css/reset.css";
  html,body {
    width: 100%;
    height: 100%;
  }
  #app {
    height: 100%;
  }
</style>
