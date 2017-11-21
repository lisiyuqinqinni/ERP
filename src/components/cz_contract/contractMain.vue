<template>
  <div class="contract">
    <x-header title="合同录入" :left-options="{showBack:true}" slot="header" class="header">
       <div slot="right" @click="houseinfo">返回列表</div>
    </x-header>
    <keep-alive>
      <router-view style="padding-top:46px;"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import {XHeader} from 'vux'
export default {
  name: 'contract',
  components: {
    XHeader
  },
  created () {
  },
  data () {
    return {
    }
  },
  methods:{
    houseinfo () {
      this.$router.push({path: '/list'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contract{
  height: 100%;
  overflow-y: scroll;
}
.vux-header{
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 5;
}
router-view{
  padding-top: 46px;
}
</style>
