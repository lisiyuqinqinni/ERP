import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import login from '@/components/login'
import listInfo from '@/components/info'
import List from '@/components/list'
import contractMain from '@/components/contract/contractMain'
import contract from '@/components/contract/contract'
import supporting from '@/components/contract/supporting'
import original from '@/components/contract/original'
import imgUpload from '@/components/contract/img-upload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/list',
      name: 'list',
      component: List
    },
    {
      path: '/info',
      name: 'info',
      component: listInfo
    },
    {
      path: '/contract',
      component: contractMain,
      children: [
        {
          path: '',
          component: contract
        },
        {
          path: 'supporting',
          component: supporting
        },
        {
          path: 'original',
          component: original
        },
        {
          path: 'imgUpload',
          component: imgUpload
        }
      ]
    }
  ]
})
