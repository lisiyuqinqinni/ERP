import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import {formPost, imgPost, jsonPost, arrPost} from '../config/axaj'

Vue.use(Vuex)

let orderStore = {
  state: {
    cleaning:{
      fk_sfht_id:'',
      sq_type:'移动端申请',
      bj_item:'',
      content:''
    },
    repair:{
      fk_sfht_id:'',
      sq_type:'移动端申请',
      wx_item:'',
      content:''
    }
  },
  mutations: {
    changOrderId (state, id) {
      state.cleaning.fk_sfht_id = id
      state.repair.fk_sfht_id = id
    },
    changBj (state, item) {
      state.cleaning.bj_item = item
    },
    changContent (state, item) {
      state.cleaning.content = item
    },
    changWx (state, item) {
      state.repair.wx_item = item
    },
    changWxCon (state, item) {
      state.repair.content = item
    }
  },
  actions: {
    subBj ({state}) {
      formPost.post('bj_shenqing/add.do',state.cleaning)
      .then( res=> {
        Vue.$vux.toast.text(res.data.msg, 'top')
        router.push('/list')
      })
    },
    subWx ({state}) {
      formPost.post('wx_shenqing/add.do',state.repair)
      .then( res=> {
        Vue.$vux.toast.text(res.data.msg, 'top')
        router.push('/list')
      })
    }
  }
}

let store = new Vuex.Store({
  state: {
    cz_hetongId:'',
    sf_hetongId:'',
    houseId:'',
    
  },
  mutations: {
    changCz_hetong(state, n) {
      state.cz_hetongId = n
    },
    changSf_hetong(state, n) {
      state.sf_hetongId = n
    },
    changHouseId (state,id) {
      state.houseId = id
    }
  },
  actions: {
  },
  modules: {
    orderStore
  }
})

export default store
