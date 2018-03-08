import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import bbs from '@/views/bbs'
import Account from '@/views/Account'
import CMS from '@/views/CMS'
import Users from '@/views/cmsChild/Users'
import AmendItems from '@/views/cmsChild/AmendItems'
import Blogs from '@/views/Blogs'
import ReadArticle from '@/views/ReadBlog'
import AddItem from '@/views/cmsChild/AddItem'
import BlogList from '@/views/cmsChild/BlogList'
import Classify from '@/views/cmsChild/Classify'
Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/bbs',
      name: 'bbs',
      component: bbs
    },
    {
      path: '/Account',
      name: 'Account',
      component: Account
    },
    {
      path: '/cms',
      component: CMS,
      children: [
        {
          path : '/',
          redirect : 'userItem'
        },
        {
          path: 'userItem',
          component: Users
        },
        {
          path: 'amendItems',
          component: AmendItems
        },
        {
          path: 'addItem',
          component: AddItem
        },
        {
          path: 'bloglist',
          component: BlogList
        },
        {
          path: 'classify',
          component: Classify
        },
      ]
    },
    {
      path: '/blogs',
      component: Blogs
    },
    {
      path: '/readArticle',
      component: ReadArticle
    }
  ]
})
