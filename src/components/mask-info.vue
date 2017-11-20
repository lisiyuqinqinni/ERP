<template>
  <div class="maskInfo">
    <div class="mask"></div>
    <div class="main">
      <swiper :list="listImg" v-model="demo01_index" dots-position="center" height="100%" @on-index-change="demo01_onIndexChange" style="width:100%;"></swiper>
    </div>
    <div class="close" @click="close">关闭</div>
  </div>
</template>

<script>
import {Swiper} from 'vux'
const baseList = [{
  url: 'javascript:',
  img: 'https://static.vux.li/demo/1.jpg',
  title: '送你一朵fua'
}, {
  url: 'javascript:',
  img: 'http://202.102.83.22:9527/cougasysFile/fabufangjian/2017/9/20170928152700567.jpeg',
  title: '送你一辆车'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/3.jpg',
  title: '送你一次旅行'
}]
export default {
  props:['listImg','indexImg'],
  components: {
    Swiper
  },
  name: 'maskInfo',
  data () {
    return {
      demo01_list: baseList,
      demo01_index: this.indexImg
    }
  },
  created () {
  },
  methods: {
    onSwiperItemIndexChange (index) {
      console.log('demo item change', index)
    },
    demo01_onIndexChange (index) {
      this.demo01_index = index
    },
    close () {
      this.$emit('imgClose')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.maskInfo{
  position: absolute;
  z-index: 999;
  width:100%;
  height: 100%;
  top: 0;
}
.maskInfo .mask{
  position: fixed;
  background: #000;
  opacity: .9;
  width: 100%;
  height: 100%
}
.maskInfo .main{
  box-sizing: border-box;
  height: 100%;
  padding:46px 0;
}
.maskInfo .vux-slider{
  height: 100%;
}
.maskInfo .main .vux-slider > .vux-swiper > .vux-swiper-item > a > .vux-img{
  background-size: contain;
}
.maskInfo .close{
  position: absolute;
  color: #fff;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  border: 1px solid #fff;
  border-radius: 3px;
  font-size: 12px;
}
</style>
