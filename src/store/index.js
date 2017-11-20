import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


let store = new Vuex.Store({
  state: {
    cz_hetongId:'',
    houseId:''
  },
  mutations: {
    changCz_hetong(state, n) {
      state.cz_hetongId = n
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
