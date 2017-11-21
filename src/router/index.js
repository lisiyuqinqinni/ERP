import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import login from '@/components/login'
import listInfo from '@/components/info'
import List from '@/components/list'
import contractMain from '@/components/cz_contract/contractMain'
import contract from '@/components/cz_contract/contract'
import supporting from '@/components/cz_contract/supporting'
import original from '@/components/cz_contract/original'
import imgUpload from '@/components/cz_contract/img-upload'

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
