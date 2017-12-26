// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueScroller from 'vue-scroller'
import {ToastPlugin } from 'vux'
import  { AlertPlugin } from 'vux'
import {formPost, imgPost, jsonPost, arrPost} from './config/axaj'

import Utils from './lib/utils'
Vue.config.productionTip = false

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
