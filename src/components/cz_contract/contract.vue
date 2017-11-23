<template>
  <div class="contract">
    <group title="房源信息">
      <x-input required title="行政区" text-align="right" disabled v-model="houseInfo.xzq"></x-input>
      <x-input required title="小区" text-align="right" disabled v-model="houseInfo.xq"></x-input>
      <x-input required title="座栋" text-align="right" disabled v-model="houseInfo.zd"></x-input>
      <x-input required title="单元" text-align="right" disabled v-model="houseInfo.dy"></x-input>
      <x-input required title="门号" text-align="right" disabled v-model="houseInfo.mh"></x-input>
      <x-input required title="地址" text-align="right" v-model="houseInfo.dz"></x-input>
      <Selector title="房间号" :options="houseInfo.fangjianhao" direction="rtl" placeholder="请选择房间号" v-model="parames.room_code"></Selector>
      <x-input required title="入住人数" text-align="right" type="number" :max="1" v-model="parames.admin_count"></x-input>
    </group>
    <group title="客户信息">
      <div v-for="item in parames.kehus">
        <x-input required title="客户姓名" text-align="right" v-model="item.realName" is-type="china-name" :max='4'></x-input>
        <Selector title="性别" :options="sex" direction="rtl" placeholder="请选择性别" v-model="item.sex"></Selector>
        <Selector title="证件类型" :options="idType" direction="rtl" placeholder="请选择证件类型" v-model="item.cardType" ></Selector>
        <x-input required title="证件编号" text-align="right" v-model="item.cardId" @on-blur="checkIdCard(item)" type="number" :max="18"></x-input>
        <x-input required title="联系电话" text-align="right" v-model="item.telephone" is-type="china-mobile" type='tel' :max="11"></x-input>
        <x-input title="备用电话" text-align="right" v-model="item.tel1" type='tel' :max="11"></x-input>
      </div>
    </group>
    <div class="center">
      <x-button mini plain @click.native="addKehus">添加客户</x-button>
      <x-button mini plain @click.native="delKehus">删除客户</x-button>
    </div>
    <group title="合同信息">
      <x-input required title="合同编号" text-align="right" @on-blur="checkCode" v-model="parames.code" type='number'></x-input>
      <selector title="第三方资金" :options="sanfang" direction="rtl" v-model="parames.ifthird"></selector>
      <selector title="第三方" :options="sanfangOption" direction="rtl" v-if="parames.ifthird =='是'" v-model="parames.third"></selector>
      <datetime title="起租日" v-model="parames.start_time"></datetime>
      <x-input required title="期限(月)" text-align="right" @on-blur="addDate" v-model="parames.term" type="number" :max="2"></x-input>
      <x-input required title="到期日" text-align="right" disabled v-model="parames.end_time"></x-input>
      <x-input required title="租金" text-align="right" v-model="parames.rent" type="number" :max="5"></x-input>
      <x-input required title="押金" text-align="right" v-model="parames.deposit" type="number" :max="5"></x-input>
      <x-input required title="管理费" text-align="right" v-model="parames.guanlifei" type="number" :max="5"></x-input>
      <selector title="支付方式" :options="payment" direction="rtl" placeholder="请选择付款方式" v-model="parames.fu"></selector>
      <x-textarea title="其他约定" :rows="1" autosize v-model="parames.about"  direction="rtl"></x-textarea>
      <selector title="签约人" :options="users" direction="rtl" v-model="parames.fk_sign_id"></selector>
      <selector title="签约部门" :options="depts" direction="rtl" v-model="parames.fk_sign_dept_id"></selector>
      <datetime title="签约时间" v-model="parames.sign_time"></datetime>
    </group>

    <div class="box">
      <x-button @click.native="nextStep" :disabled="nextS">下一步</x-button>
    </div>
    
  </div>
</template>

<script>
import {XInput, Group,Selector,XTextarea,Datetime ,XButton,Flexbox ,FlexboxItem } from 'vux'
import qs from 'qs'
export default {
  name: 'contract',
  components: {
    XInput,
    Group,
    Selector,
    XTextarea,
    Datetime,
    XButton,
    Flexbox,
    FlexboxItem
  },
  created () {
    this.depts = script_depts.map( item => {
      return {key:item.id,value:item.name}
    })
    this.users = script_users.map( item => {
      return {key:item.id,value:item.username}
    })
    let id = this.$route.query.id
    
    this.$formPost.post('sf_hetong/detail.do',{id:id})
    .then((res) => {
      this.houseInfo.xzq=res.data.data.fy.xq.xzq.name
      this.houseInfo.xq=res.data.data.fy.xq.name
      this.houseInfo.zd=res.data.data.fy.zd_code
      this.houseInfo.dy=res.data.data.fy.dy_code
      this.houseInfo.mh=res.data.data.fy.fj_code
      this.houseInfo.dz=res.data.data.fy.address
     /* this.houseInfo.fangjianhao = res.data.data.rooms.map( item => {
        return {key:item.code,value:item.code}
      })*/
      for (var i=0;i<res.data.data.rooms.length;i++){
        if(res.data.data.rooms[i].status==0){
          this.houseInfo.fangjianhao.push({key:res.data.data.rooms[i].code,value:res.data.data.rooms[i].code})
        }
      }
    })
  },
  data () {
    return {
      nextS:false,
      sanfang: [{key: '是', value: '是'}, {key: '否', value: '否'}],
      sanfangOption: [{key: '方泽金服', value: '方泽金服'}],
      sex: [{key: '男', value: '男'}, {key: '女', value: '女'}],
      idType: [{key: 'gd', value: '身份证'}, {key: 'gx', value: '护照'},{key: 'gx', value: '军官证'},{key: 'gx', value: '营业执照'}],
      payment: [{key: '1', value: '月付'},{key: '2',value: '两月付'},{key: '3', value:'季付'},{key:'6',value:'半年付'},{key:'12',value:'年付'}],
      depts:[],
      users:[],
      houseInfo:{
        xzq:'',
        xq:'',
        zd:'',
        dy:'',
        mh:'',
        dz:'',
        fangjianhao:[]
      },
      parames:{
        kehus:[{
          realName:'',
          cardType:'',
          cardId:'',
          sex:'',
          telephone:'',
          tel1:''
        }],
        about:'',
        ifthird:'',
        third:'',
        room_code:'',
        admin_count:'',
        code:'',
        deposit:'',
        start_time:'',
        term:'',
        end_time:'',
        rent:'',
        guanlifei:'',
        fu:'',
        sign_time:'',
        fk_sign_id:'',
        fk_sign_dept_id:'',
        fk_sfht_id:this.$route.query.id
      }
    }
  },
  methods:{
    addKehus () {
      this.parames.kehus.push({
          realName:'',
          cardType:'',
          cardId:'',
          sex:'',
          telephone:'',
          tel1:''
        })
    },
    delKehus () {
      this.parames.kehus.length > 1 ? this.parames.kehus.pop() : this.$vux.toast.text("最少保留一个", 'top')
    },
    nextStep () {
      if(this.parames.kehus[0].cardId!=''&&this.parames.code!=''&&this.parames.fk_sign_id!=''&&this.parames.fk_sign_dept_id!=''&&this.parames.room_code!=''){
        this.$jsonPost.post('cz_hetong/add.do',this.parames)
        .then( res => {
          if(res.data.status==1){
            this.$store.commit('changCz_hetong',res.data.data.id)
            this.$router.push('/cz_contract/cz_supporting') ;
            this.nextS=true
            this.$vux.toast.text(res.data.msg, 'top')
          }
        })
        .catch( res => {
          this.$vux.toast.text('录入失败,请退出重新选取房源', 'top')
        })
      }else {
        this.$vux.toast.text('信息缺失', 'top')
      }
      
    },
    addDate () {
        if(this.parames.start_time!=''){
          let ds=this.parames.start_time.split('-');
          let d=new Date( ds[0],ds[1]-1+Number(this.parames.term),ds[2])
          this.parames.end_time = d.toLocaleDateString().match(/\d+/g).join('-') 
        }else {
          this.$vux.toast.text("请先选择起租日", 'top')
          this.parames.term = ''
        }
          
    },
    checkCode () {
      this.$formPost.post('cz_hetong/checkCode.do',{code:this.parames.code})
      .then((res) => {
        if(res.data.status=='n'){
          this.$vux.toast.text(res.data.info, 'top')
          this.parames.code=''
        }
      })
    },
    checkIdCard(item){
      if(!this.idCard(item.cardId)){
        this.$vux.toast.text("身份证验证失败", 'top')
        item.cardId = ''
      }
    },
    idCard (cardid) {
      return isIdCard(cardid)
      function isIdCard (gets){
        /*
          该方法由网友提供;
          对身份证进行严格验证;
        */
      
        var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];// 加权因子;
        var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];// 身份证验证位值，10代表X;
      
        if (gets.length == 15) {   
          return isValidityBrithBy15IdCard(gets);   
        }else if (gets.length == 18){   
          var a_idCard = gets.split("");// 得到身份证数组   
          if (isValidityBrithBy18IdCard(gets)&&isTrueValidateCodeBy18IdCard(a_idCard)) {   
            return true;   
          }   
          return false;
        }
        return false;
        
        function isTrueValidateCodeBy18IdCard(a_idCard) {   
          var sum = 0; // 声明加权求和变量   
          if (a_idCard[17].toLowerCase() == 'x') {   
            a_idCard[17] = 10;// 将最后位为x的验证码替换为10方便后续操作   
          }   
          for ( var i = 0; i < 17; i++) {   
            sum += Wi[i] * a_idCard[i];// 加权求和   
          }   
          var valCodePosition = sum % 11;// 得到验证码所位置   
          if (a_idCard[17] == ValideCode[valCodePosition]) {   
            return true;   
          }
          return false;   
        }
        
        function isValidityBrithBy18IdCard(idCard18){   
          var year = idCard18.substring(6,10);   
          var month = idCard18.substring(10,12);   
          var day = idCard18.substring(12,14);   
          var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));   
          // 这里用getFullYear()获取年份，避免千年虫问题   
          if(temp_date.getFullYear()!=parseFloat(year) || temp_date.getMonth()!=parseFloat(month)-1 || temp_date.getDate()!=parseFloat(day)){   
            return false;   
          }
          return true;   
        }
        
        function isValidityBrithBy15IdCard(idCard15){   
          var year =  idCard15.substring(6,8);   
          var month = idCard15.substring(8,10);   
          var day = idCard15.substring(10,12);
          var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));   
          // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法   
          if(temp_date.getYear()!=parseFloat(year) || temp_date.getMonth()!=parseFloat(month)-1 || temp_date.getDate()!=parseFloat(day)){   
            return false;   
          }
          return true;
        }
        
      }
     
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
.center{
  text-align: center;
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
