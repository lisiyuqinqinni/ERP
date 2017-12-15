<template>
  <div class="original">
    <group title="原始信息">
      <x-input title="初始电表读数" text-align="right" v-model="params.chushi_dianbiao" type="number" :max='11'></x-input>
      <x-input title="初始水表读数" text-align="right" v-model="params.chushi_shuibiao"  type="number" :max='11'></x-input>
      <x-input title="初始燃气表读数" text-align="right" v-model="params.chushi_ranqi" type="number" :max='11'></x-input>
      <datetime title="物业费缴费截止时间" v-model="params.wuyefei_end_date"></datetime>
      
      <x-input title="备注" text-align="right" v-model="params.remarks"></x-input>
    </group>
    <div class="box">
      <x-button @click.native="nextStep">下一步</x-button>
    </div>
  </div>
</template>

<script>
import {XInput, Group,Selector ,XButton ,Datetime } from 'vux'
export default {
  name: 'original',
  components: {
    XInput,
    Group,
    Selector,
    XButton,
    Datetime
  },
  computed: {
    sf_hetongId () {
      return this.$store.state.sf_hetongId
    }
  },
  data () {
    return {
      params:{
        chushi_dianbiao:'',
        chushi_shuibiao:'',
        wuyefei_end_date:'',
        chushi_ranqi:'',
        remarks:'',
        id:this.$store.state.sf_hetongId
      }
    }
  },
  
  methods:{
    nextStep () {
      this.$jsonPost.post('sf_hetong/mod.do',this.params)
      .then( res => {
        if(res.data.status==1){
          this.$router.push('/sf_contract/sf_imgUpload')
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
