<template>
  <div class="supporting">
    <group title="配套信息">
      <div v-for="item in pts">
        <Selector title="类型" :options="Type" v-model="item.type" direction="rtl"></Selector>
        <x-input title="名称" text-align="right" v-model="item.name" :max="6"></x-input>
        <x-input title="品牌" text-align="right" v-model="item.brand" :max="6"></x-input>
        <x-input title="数量" text-align="right" v-model="item.amount" :max="3" type="number"></x-input>
        <x-input title="备注" text-align="right" v-model="item.remarks"></x-input>
      </div>
    </group>
    <div class="center">
      <x-button mini plain @click.native="addpzs">添加配套</x-button>
      <x-button mini plain @click.native="delpzs">删除配套</x-button>
    </div>
    <div class="box">
      <x-button @click.native="nextStep">下一步</x-button>
    </div>
  </div>
</template>

<script>
import {XInput, Group,Selector ,XButton  } from 'vux'
export default {
  name: 'supporting',
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
      Type: [{key: '家具', value: '家具'}, {key: '家电', value: '家电'},{key: '配饰', value: '配饰'},{key: '其他', value: '其他'}],
      pts:[{
        amount:'',
        brand:'',
        fk_ht_id:this.$store.state.cz_hetongId,
        name:'',
        remarks:'',
        type:''
      }]
    }
  },
  methods:{
    addpzs () {
      this.pts.push({
        amount:'',
        brand:'',
        fk_ht_id:this.cz_hetongId,
        name:'',
        remarks:'',
        type:''
      })
    },
    delpzs () {
      this.pts.length > 1 ? this.pts.pop() : this.$vux.toast.text("最少保留一个", 'top')
    },
    nextStep () {
      this.$arrPost.post('cz_peizhi/mod.do',this.pts)
      .then( res => {
        if(res.data.status==1){
          this.$router.push('/cz_contract/cz_original');
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
.center {
  text-align: center;
  margin-bottom: 20px;
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
