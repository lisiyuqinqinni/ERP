<template>
  <div class="cleanitem">
    
    <group title="订单详情">
        <x-input title="维修项目" text-align="right" :value="wx_item" @input="updateBj($event)"></x-input>
        <x-input title="维修详情" text-align="right" :value="content" @input="updateCon($event)"></x-input>
    </group>
    <div class="box">
      <x-button @click.native="sub">提交订单</x-button>
    </div>
  </div>
</template>

<script>
import {XInput, Group, XButton} from 'vux'
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
    name: 'cleaning',
    components: {
        XInput,
        Group,
        XButton,
    },
    computed: {
        ...mapState({
            wx_item: state => state.orderStore.repair.wx_item,
            content: state => state.orderStore.repair.content
        })
    },
    data () {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    methods: {
        ...mapMutations({
            updateBj: 'changWx',
            updateCon: 'changWxCon'
        }),
        ...mapActions({
            sub: 'subWx'
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
