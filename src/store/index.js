import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


let store = new Vuex.Store({
  state: {
    cz_hetongId:'',
    sf_hetongId:'',
    houseId:''
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
  }
})

export default store
