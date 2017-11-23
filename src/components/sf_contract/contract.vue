<template>
  <div class="sf_contract">
    <group title="房源信息">
      <Selector title="行政区" :options="sanfang" direction="rtl" placeholder="请选择行政区"></Selector>
      <Selector title="小区" :options="sanfang" direction="rtl" placeholder="请选择小区"></Selector>
      <x-input required title="座栋" text-align="right"></x-input>
      <x-input required title="单元" text-align="right"></x-input>
      <x-input required title="门号" text-align="right"></x-input>
      <x-input required title="地址" text-align="right"></x-input>
      <x-input required title="户型(室)" text-align="right" type="number" :max="1"></x-input>
      <x-input required title="户型(厅)" text-align="right" type="number" :max="1"></x-input>
      <x-input required title="户型(卫)" text-align="right" type="number" :max="1"></x-input>
      <x-input required title="面积" text-align="right" type="number" :max="8"></x-input>
      <x-input required title="本层" text-align="right" type="number" :max="3"></x-input>
      <x-input required title="顶层" text-align="right" type="number" :max="3"></x-input>
      <Selector title="朝向" :options="orientation" direction="rtl" placeholder="请选择行政区"></Selector>
      <x-input required title="梯户(梯)" text-align="right" type="number" :max="1"></x-input>
      <x-input required title="梯户(户)" text-align="right" type="number" :max="1"></x-input>
      <Selector title="装修" :options="renovation" direction="rtl" placeholder="请选择行政区"></Selector>
    </group>
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
  created () {
    
  },
  data () {
    return {
      sanfang: [{key: '是', value: '是'}, {key: '否', value: '否'}],
      orientation: [{key: '东', value: '东'},{key: '南', value: '南'},{key: '西', value: '西'},{key: '北', value: '北'},{key: '东南', value: '东南'},{key: '西南', value: '西南'},{key: '东北', value: '东北'},{key: '西北', value: '西北'}],
      renovation: [{key: '简装', value: '简装'}, {key: '精装', value: '精装'},{key: '毛坯', value: '毛坯'}]
    }
  },
  methods:{
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
.sf_contract{
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
