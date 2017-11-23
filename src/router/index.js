import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import login from '@/components/login'
import listInfo from '@/components/info'
import List from '@/components/listaccordion'
import Slideout from '@/components/slideout'
import cz_contractMain from '@/components/cz_contract/contractMain'
import cz_contract from '@/components/cz_contract/contract'
import cz_supporting from '@/components/cz_contract/supporting'
import cz_original from '@/components/cz_contract/original'
import cz_imgUpload from '@/components/cz_contract/img-upload'
import sf_contractMain from '@/components/sf_contract/contractMain'
import sf_contract from '@/components/sf_contract/contract'
import sf_supporting from '@/components/sf_contract/supporting'
import sf_original from '@/components/sf_contract/original'
import sf_imgUpload from '@/components/sf_contract/img-upload'

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
      component: List,
      children: [
        {
          path: '',
          component: Slideout
        }
      ]
    },
    {
      path: '/info',
      name: 'info',
      component: listInfo
    },
    {
      path: '/cz_contract',
      component: cz_contractMain,
      children: [
        {
          path: '',
          component: cz_contract
        },
        {
          path: 'cz_supporting',
          component: cz_supporting
        },
        {
          path: 'cz_original',
          component: cz_original
        },
        {
          path: 'cz_imgUpload',
          component: cz_imgUpload
        }
      ]
    },
    {
      path: '/sf_contract',
      component: sf_contractMain,
      children: [
        {
          path: '',
          component: sf_contract
        },
        {
          path: 'sf_supporting',
          component: sf_supporting
        },
        {
          path: 'sf_original',
          component: sf_original
        },
        {
          path: 'sf_imgUpload',
          component: sf_imgUpload
        }
      ]
    },
    {
      path: '/slideout',
      name: 'slideout',
      component: Slideout
    }
  ]
})
