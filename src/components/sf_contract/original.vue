<template>
  <div class="original">
    <group title="原始信息">
      <x-input title="初始总电表读数" text-align="right" v-model="params.chushi_zdianbiao" type="number" :max='11'></x-input>
      <x-input title="初始分电表读数" text-align="right" v-model="params.chushi_fdianbiao"  type="number" :max='11'></x-input>
      <x-input title="初始水表读数" text-align="right" v-model="params.chushi_shuibiao"  type="number" :max='11'></x-input>
      <x-input title="初始燃气表读数" text-align="right" v-model="params.chushi_ranqi" type="number" :max='11'></x-input>
      <x-input title="备注" text-align="right" v-model="params.remarks"></x-input>
    </group>
    <div class="box">
      <x-button @click.native="nextStep">下一步</x-button>
    </div>
  </div>
</template>

<script>
import {XInput, Group,Selector ,XButton  } from 'vux'
export default {
  name: 'original',
  components: {
    XInput,
    Group,
    Selector,
    XButton
  },
  computed: {
    cz_hetongId () {
      return this.$store.state.cz_hetongId
    }
  },
  data () {
    return {
      params:{
        chushi_zdianbiao:'',
        chushi_fdianbiao:'',
        chushi_shuibiao:'',
        chushi_ranqi:'',
        remarks:'',
        id:this.$store.state.cz_hetongId
      }
    }
  },
  
  methods:{
    nextStep () {
      this.$jsonPost.post('cz_hetong/mod.do',this.params)
      .then( res => {
        if(res.data.status==1){
          this.$router.push('/cz_contract/cz_imgUpload')
          this.$vux.toast.text(res.data.msg, 'top')
        }
      })
      .catch( res => {
        console.log(res)
      })
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
.weui-btn_default{
  background: #ff9900;
  color:#fff;
  border:1px solid #CC6600;
}
.box{
  padding: 15px 10px;
}
</style>
