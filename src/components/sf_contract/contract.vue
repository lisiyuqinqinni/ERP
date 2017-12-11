<template>
  <div class="sf_contract">
    <group title="房源信息">
      <Selector title="行政区" :options="xzq" direction="rtl" placeholder="请选择行政区" @on-change="chioce" v-model="chiocexzq"></Selector>
      <Selector title="小区" :options="xq" direction="rtl" placeholder="请选择小区" v-model="params.fy.fk_xq_id"></Selector>
      <x-input required title="座栋" text-align="right" :max='5' v-model="params.fy.zd_code"></x-input>
      <x-input required title="单元" text-align="right" :max='5' v-model="params.fy.dy_code"></x-input>
      <x-input required title="门号" text-align="right" :max='5' v-model="params.fy.fj_code"></x-input>
      <x-input required title="地址" text-align="right" v-model="params.fy.address"></x-input>
      <x-input required title="户型(室)" text-align="right" type="number" :max="1" v-model="params.fy.shi"></x-input>
      <x-input required title="户型(厅)" text-align="right" type="number" :max="1" v-model="params.fy.ting"></x-input>
      <x-input required title="户型(卫)" text-align="right" type="number" :max="1" v-model="params.fy.wei"></x-input>
      <x-input required title="面积" text-align="right" type="number" :max="8" v-model="params.fy.area"></x-input>
      <x-input required title="本层" text-align="right" type="number" :max="3" v-model="params.fy.floor"></x-input>
      <x-input required title="顶层" text-align="right" type="number" :max="3" v-model="params.fy.floor_top"></x-input>
      <Selector title="朝向" :options="orientation" direction="rtl" placeholder="请选择" v-model="params.fy.orientation"></Selector>
      <x-input required title="梯户(梯)" text-align="right" type="number" :max="2" v-model="params.fy.ti"></x-input>
      <x-input required title="梯户(户)" text-align="right" type="number" :max="2" v-model="params.fy.hu"></x-input>
      <Selector title="装修" :options="renovation" direction="rtl" placeholder="请选择" v-model="params.fy.fitment"></Selector>
    </group>
    <group title="业主信息">
      <div v-for="item,index in params.owners">
        <x-input required title="业主姓名" text-align="right" v-model="item.name"></x-input>
        <selector title="性别" :options="sex" direction="rtl" placeholder="请选择" v-model="item.sex"></selector>
        <x-input required title="身份证号" text-align="right" type="number" :max="18" @on-blur="checkIdCard(item)" v-model="item.cardId"></x-input>
        <x-input required title="电话" text-align="right" type="number" :max="11"  v-model="item.tel"></x-input>
      </div>
      <div class="center">
        <x-button mini plain @click.native="addOwner">添加业主</x-button>
        <x-button mini plain @click.native="delOwner">删除业主</x-button>
      </div>
      <x-input required title="被委托人姓名" text-align="right" :max="4" v-model="params.trust.realName"></x-input>
      <selector title="性别" :options="sex" direction="rtl" placeholder="请选择" v-model="params.trust.sex"></selector>
      <Selector title="证件类型" :options="idType" direction="rtl" placeholder="请选择证件类型" v-model="params.trust.cardType" ></Selector>
      <x-input required title="证件编号" text-align="right" type="number" :max="18" @on-blur="checkIdCard(params.trust)" v-model="params.trust.cardId"></x-input>
      <x-input required title="被委托人电话" text-align="right" type="number" :max="11" v-model="params.trust.telephone"></x-input>
      <x-input required title="备用电话(1)" text-align="right" type="number" :max="11" v-model="params.trust.tel1"></x-input>
      <x-input required title="备用电话(2)" text-align="right" type="number" :max="11" v-model="params.trust.tel2"></x-input>
      <div class="center">
        <x-button mini plain style="margin-top:15px;" @click.native="copyOwner">同业主信息</x-button>
      </div>
      <x-input required title="收款人" text-align="right" :max="4" v-model="params.receive_name"></x-input>
      <x-input required title="开户行" text-align="right" v-model="params.receive_bank"></x-input>
      <x-input required title="收款账号" text-align="right" type="number"  v-model="params.receive_account"></x-input>
    </group>
    <group title="合同信息">
      <x-input required title="合同编号" text-align="right" @on-blur="checkCode" v-model="params.code"></x-input>
      <datetime title="起租日" v-model="params.start_time" @on-change="modMianZuQi"></datetime>
      <x-input required title="期限(月)" text-align="right" type="number" :max="2" @on-blur="addDate" v-model="params.term"></x-input>
      <x-input required title="到期日" text-align="right" disabled v-model="params.end_time"></x-input>
      <Selector title="免租期" :options="free" direction="rtl" placeholder="请选择" @on-change="dateType" v-model="freedate"></Selector>
      <x-input required title="免租期共(月)" text-align="right" type="number" :max="2" v-model="params.total_frees"></x-input>
      <div v-if="freedate != '非标准'">
        <datetime title="免租期每年(始)" v-model="biaozhun.start" :format="freeDateType" @on-change="modMianZuQi"></datetime>
        <datetime title="免租期每年(终)" v-model="biaozhun.end" :format="freeDateType"  @on-change="modMianZuQi"></datetime>
      </div>
      <div v-for="item,index in params.frees" v-if="freedate == '非标准'">
        <datetime title="免租期每年(始)" v-model="item.start" :format="freeDateType"></datetime>
        <datetime title="免租期每年(终)" v-model="item.end" :format="freeDateType"></datetime>
      </div>
      <div class="center" v-if="freedate == '非标准'">
        <x-button mini plain @click.native="addFree">添加</x-button>
        <x-button mini plain @click.native="delFree">删除</x-button>
      </div>
      <div v-for="item,index in params.rents">
        <datetime title="租金(日期始)" v-model="item.start"></datetime>
        <datetime title="租金(日期终)" v-model="item.end"></datetime>
        <x-input required title="租金(元/月)" text-align="right" type="number" :max="6" v-model="item.price"></x-input>
      </div>
      <div class="center">
        <x-button mini plain @click.native="addRent">添加</x-button>
        <x-button mini plain @click.native="delRent">删除</x-button>
      </div>
      <x-input required title="押金(元)" text-align="right" type="number" :max="6" v-model="params.deposit"></x-input>
      <selector title="支付方式" :options="payment" direction="rtl" placeholder="请选择" v-model="params.fu"></selector>
      <x-input required title="提前付租(日)" text-align="right" type="number" :max="3" v-model="params.advance"></x-input>
      <datetime title="首次付租日期" v-model="params.first_pay_date"></datetime>
      <x-input title="其他约定" text-align="right" v-model="params.about"></x-input>
      <selector title="签约人" :options="users" direction="rtl" placeholder="请选择" v-model="params.fk_sign_id"></selector>
      <selector title="签约部门" :options="depts" direction="rtl" placeholder="请选择" v-model="params.fk_sign_dept_id"></selector>
      <datetime title="签约时间" v-model="params.sign_time"></datetime>
    </group>
    <div class="box">
      <x-button @click.native="nextStep" :disabled="nextS">下一步</x-button>
    </div>
  </div>
</template>

<script>
import {XInput, Group,Selector,XTextarea,Datetime ,XButton,Flexbox ,FlexboxItem } from 'vux'
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
  data () {
    return {
      nextS:false,
      freeDateType:'',
      freedate:'',
      biaozhun:{
        star:'',
        end:''
      },
      chiocexzq:'',
      sanfang: [{key: '是', value: '是'}, {key: '否', value: '否'}],
      orientation: [{key: '东', value: '东'},{key: '南', value: '南'},{key: '西', value: '西'},{key: '北', value: '北'},{key: '东南', value: '东南'},{key: '西南', value: '西南'},{key: '东北', value: '东北'},{key: '西北', value: '西北'}],
      renovation: [{key: '简装', value: '简装'}, {key: '精装', value: '精装'},{key: '毛坯', value: '毛坯'}],
      free: [{key: '标准',value: '标准'},{key: '非标准',value: '非标准'}],
      payment: [{key: '1', value: '月付'},{key: '2',value: '两月付'},{key: '3', value:'季付'},{key:'6',value:'半年付'},{key:'12',value:'年付'}],
      idType: [{key: '身份证', value: '身份证'}, {key: '护照', value: '护照'},{key: '军官证', value: '军官证'},{key: '营业执照', value: '营业执照'}],
      sex: [{key: '男', value: '男'}, {key: '女', value: '女'}],
      depts:[],
      users:[],
      xzq:[],
      xq:[],
      params:{
        about:'',
        advance:'',
        code:'',
        deposit:'',
        end_time:'',
        first_pay_date:'',
        fk_sign_dept_id:'',
        fk_sign_id:'',
        frees:[{
          end:'',
          start:''
        }],
        fu:'',
        fy:{
          address:'',
          area:'',
          dy_code:'',
          fitment:'',
          fj_code:'',
          fk_xq_id:'',
          floor:'',
          floor_top:'',
          hu:'',
          orientation:'',
          shi:'',
          ti:'',
          ting:'',
          wei:'',
          zd_code:''
        },
        owners:[{
          cardId:'',
          name:'',
          sex:'',
          tel:''
        }],
        receive_account:'',
        receive_bank:'',
        receive_name:'',
        rents:[{
          end:'',
          price:'',
          start:''
        }],
        sign_time:'',
        start_time:'',
        term:'',
        total_frees:'',
        trust:{
          cardId:'',
          cardType:'',
          realName:'',
          sex:'',
          tel1:'',
          tel2:'',
          telephone:''
        }
      }
    }
  },
  created () {
    this.depts = script_depts.map( item => {
      return {key:item.id,value:item.name}
    })
    this.users = script_users.map( item => {
      return {key:item.id,value:item.username}
    })
    this.xzq = script_xzqs.map( item => {
      return {key:item.id,value:item.name}
    })
    this.xq = script_xqs.map( item => {
      return {key:item.id,value:item.name}
    })
  },
  methods:{
    chioce () {
      var arr = []
      for (var i=0;i<script_xqs.length;i++){
        if(script_xqs[i].fk_xzq_id == this.chiocexzq){
          arr.push({key:script_xqs[i].id,value:script_xqs[i].name})
        }
      }
      this.xq = arr
    },
    addOwner () {
      this.params.owners.push({
          cardId:'',
          name:'',
          sex:'',
          tel:''
        })
    },
    delOwner () {
      this.params.owners.length > 1 ? this.params.owners.pop() : this.$vux.toast.text("最少保留一个", 'top')
    },
    copyOwner () {
      let ob = JSON.parse(JSON.stringify(this.params.owners[0]))
      this.params.trust.cardType = '身份证'
      this.params.trust.cardId = ob.cardId
      this.params.trust.sex = ob.sex
      this.params.trust.realName = ob.name
      this.params.trust.telephone = ob.tel
    },
    addFree () {
      this.params.frees.push({
          end:'',
          start:''
        })
    },
    delFree () {
      this.params.frees.length > 1 ? this.params.frees.pop() : this.$vux.toast.text("最少保留一个", 'top')
    },
    addRent () {
      this.params.rents.push({
          end:'',
          price:'',
          start:''
        })
    },
    delRent () {
      this.params.rents.length > 1 ? this.params.rents.pop() : this.$vux.toast.text("最少保留一个", 'top')
    },
    addDate () {

      if(this.params.start_time!=''){
        console.log(this.params.start_time,this.params.term)
        let ds=this.params.start_time.split('-');
        let d=new Date( ds[0],ds[1]-1+Number(this.params.term),ds[2]-1)
        this.params.end_time = d.toLocaleDateString().match(/\d+/g).join('-') 
        this.modMianZuQi()
      }
        
    },
    dateType(){
      this.freedate == '标准'? this.freeDateType='MM-DD':this.freeDateType='YYYY-MM-DD',this.params.frees=[{start:'',end:''}]
    },
    checkCode () {
      this.$formPost.post('cz_hetong/checkCode.do',{code:this.params.code})
      .then((res) => {
        if(res.data.status=='n'){
          this.$vux.toast.text(res.data.info, 'top')
          this.params.code=''
        }
      })
    },
    checkIdCard(item){
      if(!this.idCard(item.cardId)){
        this.$vux.toast.text("身份证验证失败", 'top')
        item.cardId = ''
      }
    },
    modMianZuQi() {
      var start = this.biaozhun.start
      var end = this.biaozhun.end
      var mianzutype = this.freedate
      var start_time = this.params.start_time
      var end_time = this.params.end_time
      if (start && end && start_time && end_time && mianzutype=="标准") {
        var start_date = new Date(start_time);
        var end_date = new Date(end_time);
        var start_year = start_date.getFullYear();
        var end_year = end_date.getFullYear();
        this.params.frees=[]
        for (var i=start_year; i<=end_year; i++) {
          var mStart = i+"-"+start;
          var mEnd = i+"-"+end;
          var mStartDate = new Date(mStart);
          var mEndDate = new Date(mEnd);
          if (mStartDate<start_date || mEndDate>end_date)
              continue;
          this.params.frees.push({
            start:mStart,
            end:mEnd
          })
           
        }
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
    },
    nextStep () {
      if(this.params.code!=''&&this.params.fk_sign_dept_id!=''&&this.params.fk_sign_id!=''&&this.params.trust.cardId!=''&&this.params.owners[0].cardId!=''){
        this.$jsonPost.post('sf_hetong/add.do',this.params)
        .then( res => {
          if(res.data.status==1){
            this.$store.commit('changSf_hetong',res.data.data.id)
            this.$router.push('/sf_contract/sf_supporting') ;
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sf_contract{
  height: 100%;
  overflow-y: scroll;
}
.center{
  text-align: center;
  border-top:1px solid #D9D9D9;
  padding-bottom: 15px;
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
