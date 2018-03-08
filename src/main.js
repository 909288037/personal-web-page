// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import animate from 'animate.css'
import $ from 'jquery'
import 'bootstrap/js/bootstrap.min.js'
import 'bootstrap/css/bootstrap.min.css'
import 'babel-polyfill'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import infiniteScroll from 'vue-infinite-scroll'


Vue.config.productionTip = false
Vue.use(animate)
Vue.use(mavonEditor)
Vue.use(infiniteScroll)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
