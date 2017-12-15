// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import qs from 'qs'
import VueJsonp from 'vue-jsonp'
import VueScroller from 'vue-scroller'
import {ToastPlugin } from 'vux'
import  { AlertPlugin } from 'vux'

import Axios from 'axios'
import VueAxios from 'vue-axios'
import Utils from './lib/utils'
Vue.config.productionTip = false
Axios.defaults.baseURL = 'http://erp.ourkyj.com/cougaerp/'

let formPost = Axios.create({
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
      data = qs.stringify(data)
      return data
    }]
})
let imgPost = Axios.create({
    baseURL: 'http://erp.ourkyj.com/cougafile/file/',
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
      data = qs.stringify(data)
      return data
    }]
})
let jsonPost = Axios.create({
    headers:{
      'Content-Type':'application/json; charset=UTF-8',
    },
    responseType: 'json',
    withCredentials: true,
    crossDomain:true,
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
      data = JSON.stringify(qs.parse(data))
      return data
    }]
})
let arrPost = Axios.create({
    headers:{
      'Content-Type':'application/json; charset=UTF-8',
    },
    responseType: 'json',
    withCredentials: true,
    crossDomain:true,
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
      data=qs.parse(data)
      let arr = []
      let i = 0
      while (data[i]){
        arr[i] = data[i]
        i++
      }
      data = JSON.stringify(arr)
      return data
    }]
})
Vue.use(VueJsonp)
Vue.use(VueScroller)
Vue.use(ToastPlugin)
Vue.use(Utils)
Vue.use(AlertPlugin)

Vue.prototype.$formPost = formPost
Vue.prototype.$jsonPost = jsonPost
Vue.prototype.$arrPost = arrPost
Vue.prototype.$imgPost = imgPost
Vue.prototype.findPri = function(alias) {
	let yonghu = Vue.prototype.$local.fetch('yonghu')
	for (var i=0; i<yonghu.allPris.length; i++) {
        var pri = yonghu.allPris[i];
        if (pri.alias==alias) {
            return pri;
        }
    }
};
Vue.prototype.hasPri = function(alias, userId, deptId) {
	let yonghu = Vue.prototype.$local.fetch('yonghu')
    var pri = this.findPri(alias);
    if (!pri)
        return false;
    if (!pri.scope)
        return true;
    else if (pri.scope=="sy")
        return true;
    else if (pri.scope=="bd" && yonghu.deptIds.contain(deptId))
        return true;
    else if (pri.scope=="br" && yonghu.id==userId)
        return true;
    return false;
};
// 判断数组包含元素
Array.prototype.contain = function(e) {
    for(var i=0; i<this.length && this[i]!=e; i++);
    return !(i==this.length);
};
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
