<template>
   <router-view></router-view>
</template>

<script>
export default {
  name: 'app',
  components: {
  },
  data () {
    return {
    }
  }, 
  methods: {
  }
}
</script>

<style>
html,body{
  margin:0;
  padding:0;
  width:100%;
  height:100%;
  overflow: hidden;
  background: #ffffff;
}
a{
  text-decoration: none;
}
.clear{
  clear: both;
}
.fl{
  float: left;
}
.rt{
  float: right;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height:100%;
}
#app .search{
  position:fixed;
  top:46px;
  left:0;
  z-index:5;
  width:100%;
}
#app .my-scorller{
  top:136px;
}
#app .panel1,{
  margin:0;
}
#app .weui-panel {
  margin-top: 0;
  text-align: center;
}
#app .loading-layer {
  padding-bottom: 130px
}
._v-container>._v-content>.active[data-v-ecaca2b0]{
  margin-top:-60px;
}
/******************list*************************/
.lists{
	position: relative;
}
.lists>ul li{
	padding:16px 3.7%;
	border-bottom: 1px solid #e9e9e9;
  list-style-type: none;
}
.lists>ul li a{
  display: block;
  overflow: hidden;}
.lists .list-img{
  width: 24.5%;
  float: left;
  height: 80px;
}
.lists .list-img img{
	width: 100%;
	height: 100%;
}
.lists .list-p {
	box-sizing: border-box;
  width: 70%;
	padding-left: 4%;
  float: left;
}
.lists .list-p h3{
	font-size: 16px;
	color: #333333;
	font-weight: bold;
	word-break: keep-all;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.lists .list-p p{
	font-size: 13px;
	color: #999;
	line-height: 22px;
}
.lists .list-p .address{
	margin-bottom: 5px;
  width: 100%;
  overflow: hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
}
.lists .area {
  width: 11%;
  margin-top: 25px;
  position: absolute;
  right: 7%;
  color: #CC6600;
  font-weight: bold;
  font-size: 20px;
}
#app .vux-header{
  background-color: #ffffff;
  border-bottom: 1px solid #eeeeee;
}
#app .vux-header .vux-header-title{
  color: #000;
  font-weight: bolder;
}
#app .vux-header-right,#app .vux-header-left a,#app .vux-header .vux-header-left .left-arrow:before{
  color: #000;
}
.vux-search-box .weui-search-bar {
  background-color:#fff;
}
.vux-search-box .weui-search-bar__label{
  color: #999;
  background: #eeeeee;
}
#app .vux-header .vux-header-left .left-arrow:before{
  content: "";
  position: absolute;
  width: 12px;
  height: 12px;
  border: 1px solid #000;
  border-width: 1px 0 0 1px;
  -webkit-transform: rotate(315deg);
  transform: rotate(315deg);
  top: 8px;
  left: 7px;
}
.footer{
  width: 50%
}
</style>