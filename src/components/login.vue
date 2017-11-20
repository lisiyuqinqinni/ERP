<template>
  <div class="login">
    <div class="container">
    <div class="logo">
      <img src="../assets/login/logo.png" alt="logo">
    </div>
    <!--登录-->
    <form @submit.prevent='sendLogin' autocomplete="off">
      <div class="block">
        <div class="inp">
          <img src="../assets/login/user.png" alt="user">
          <input  placeholder="请输入用户名" ref="userName">
        </div>
        <div class="h1"></div>
        <div class="inp">
          <img src="../assets/login/password.png" alt="pwd">
          <input type="password" placeholder="请输入密码" maxlength="18" ref="passWord">
          <img src="../assets/login/close.png" alt="x" id="close">
        </div>
      </div>
      <input type="submit" value="登录">
    </form>
  </div>
  </div>
</template>

<script>
import qs from 'qs'
import Axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
    }
  },
  created () {
    let userInfo = this.$local.fetch('user')
    let user = {username: userInfo.userName,password: userInfo.passWord}
    this.$formPost.post('user/login.do',user)
    .then((res) => {
      if(res.data.status == '1'){
        this.$router.push('/list')
        Axios.defaults.headers.common['Authorization'] = res.data.msg
      }
    })
  },
  methods: {
    sendLogin () {
      let userName = this.$refs.userName.value
      let passWord = this.$refs.passWord.value
      this.$local.save('user', {
        login: true,
        userName: userName,
        passWord: passWord
      })
      let user = {username: userName,password: passWord}
      let vm = this
      this.$formPost.post('user/login.do',user)
      .then((res) => {
        console.log(res)
        if(res.data.status == '1'){
          this.$router.push('/list');
          var yonghu = res.data.data;
          yonghu.deptIds = iteatorDept(yonghu);
          yonghu.allPris = iteatorPris(yonghu);
          vm.$local.save('yonghu', yonghu);
          Axios.defaults.headers.common['Authorization'] = res.data.msg
        }else {
          this.$vux.toast.text(res.data.msg, 'top')
        }
      })
      function iteatorDept(user) {
          function iteator(depts) {
              var result = depts;
              for (var i=0; i<depts.length; i++) {
                  var dept = depts[i];
                  var subs = dept.subs;
                  if (subs) {
                      result = result.concat(subs);
                      for (var j=0; j<subs.length; j++) {
                          var sub = subs[j];
                          result = result.concat(iteator(sub.subs));
                      }
                  }
              }
              return result;
          }
          var depts = iteator([user.dept]);
          var deptIds = [];
          for (var i=0; i<depts.length; i++) {
              deptIds.push(depts[i].id);
          }
          return deptIds;
      }
      function iteatorPris(user) {
          function iteator(pris) {
              var result = pris;
              for (var i=0; i<pris.length; i++) {
                  var pri = pris[i];
                  var subs = pri.subs;
                  if (subs) {
                      result = result.concat(subs);
                      for (var j=0; j<subs.length; j++) {
                          var sub = subs[j];
                          result = result.concat(iteator(sub.subs));
                      }
                  }
              }
              return result;
          }
          var allPris = iteator(user.role.pris);
          return allPris;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input{
  border: 0;
  margin: 0;
  padding: 0;
  font-size: 1em;
  line-height: 1em;
   -webkit-appearance: none; 
  background-color: rgba(0, 0, 0, 0);
}
html,body{
      width: 100%;
      min-width: 100%;
      background: #fff;
    }
    /*头部*/
    .header{
      height: 43px;
      line-height: 43px;
      background: #fff;
      border-bottom: 1px solid #e6e6e6;
      position: fixed;
      width: 100%;
      top: 0;
      left: 0;
    }
    .back{
      padding: 0 12px;
      position: absolute;
      top: 0;
      left: 0;
    }
    .back img{
      width: 8px;
      height: 14px;
    }
    .title{
      text-align: center;
      font-weight: bold;
    }
    /*主体部分*/
    .h1{
      height: 1px;
      background: #c4c4c4;
    }
    .container{
      padding: 44px 10px 0;
    }
    .logo{
      padding: 35px 0 45px;
      text-align: center;
    }
    .logo img{
      /*width: 165px;*/
      height: 57px;
    }
    .block{
      border: 1px solid #c4c4c4;
      border-radius: 4px;
      line-height: 60px;
    }
    .inp{
      display: -webkit-flex;
      display: flex;
      -webkit-align-items: center;
      align-items: center;
    }
    .inp input{
      height: 60px;
      outline: none;
      width: 100%;
      -webkit-flex: 1;
      flex: 1;
    }
    .inp img{
      width: 18px;
      height: 21px;
      padding: 0 20px 0 16px;
    }
    .inp img[alt="x"]{
      width: 18px;
      height: 18px;
      padding: 0 15px;
      display: none;
    }
    input[type="submit"]{
      height: 40px;
      line-height: 40px;
      background: #8ec31f;
      text-align: center;
      border-radius: 6px;
      color: #fff;
      outline: none;
      width: 100%;
      margin-top: 16px;
      font-size: 18px;
    }
    .register{
      color: #666;
      margin-top: 12px;
      display: -webkit-flex;
      display: flex;
      -webkit-justify-content: space-between;
      justify-content:space-between;
      font-size: 14px;
    }
</style>
