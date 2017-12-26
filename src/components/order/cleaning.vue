<template>
  <div class="cleaning">
    <x-header title="保洁" :left-options="{showBack:true}" slot="header" class="header"></x-header>
    <div class="padTop">
        <button-tab v-model="number">
            <button-tab-item selected @on-item-click="consoleIndex()">订单详情</button-tab-item>
            <button-tab-item @on-item-click="consoleIndex()">历史订单</button-tab-item>
        </button-tab>
    </div>
    <transition name="fade" mode="out-in" appear>
        <component :is="tab"></component>
    </transition>
  </div>
</template>

<script>
import {XHeader, ButtonTab, ButtonTabItem} from 'vux'
import cleanItem0 from './cleanItem0.vue'
import cleanItem1 from './cleanItem1.vue'
export default {
    name: 'cleaning',
    components: {
        XHeader,
        ButtonTab,
        ButtonTabItem,
        cleanItem0,
        cleanItem1
    },
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            number: null,
            tab: 'clean-item0'
        }
    },
    methods: {
        consoleIndex () {
            this.tab= 'clean-item'+this.number
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cleaning{
    height: 100%;
    overflow: auto;
}
.vux-button-group > a.vux-button-group-current{
    color: #000;
    background: #ffe26d;
}
.vux-button-group > a{
    display: block;
    position: relative;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    width: 100%;
    height: 30px;
    padding: 0;
    font-size: 14px;
    line-height: 31px;
    text-align: center;
    color: #999;
    white-space: nowrap;
    background: #fdfdfd;
    -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
}
.padTop{
    padding: 20px 15px;
}
.box{
  padding: 15px 10px;
}
.weui-btn_default{
  background: #ff9900;
  color:#fff;
  border:1px solid #CC6600;
}
</style>
