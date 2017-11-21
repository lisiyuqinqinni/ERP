<template>
  <div class="info" v-if="roomInfo.fy">
    <x-header title="客有家详情" :left-options="{showBack:true}" slot="header" class="header">
      <div slot="right"><router-link tag="div":to="{path: '/contract',query: {id:this.$route.query.id},replace: true}">租房录入</router-link></div>
    </x-header>
    <div class="top">
    <div @click="infoimg">
      <swiper :list="demo01_list" v-model="demo01_index" @on-index-change="demo01_onIndexChange"></swiper>
    </div>
    
    <div class="main">
      <h5>{{roomInfo.chuzu_type}}—{{roomInfo.fy.xq.name}}—{{roomInfo.fy.shi}}室—{{roomInfo.fy.orientation}}</span></h5>
      <ul>
        <li>面积：{{roomInfo.fy.area}}㎡</li>
        <li>户型：{{roomInfo.fy.shi}}室{{roomInfo.fy.ting}}厅</li>
        <li>楼层：{{roomInfo.fy.floor}}/{{roomInfo.fy.floor_top}}</li>
      </ul>
      <p>地址：{{roomInfo.fy.address}}</p>
    </div>
    <div class="Supporting">
      <h5>房屋配置：</h5>
      <ul>
        <li v-for="item in roomInfo.pzs"><span>{{item.name}}</span></li>
      </ul>
    </div>
    <div class="room-info">
      <h5>房间信息：</h5>
      <ul>
        <li v-for="item in this.sheyouInfo"><span class="number">{{item.code}}</span><span>{{item.price}}</span><span>{{item.status==1?'已入住':'未入住'}}</span><span class="realName"><img v-if="item.sex=='男'" src="../assets/men.png" alt=""><img v-if="item.sex=='女'" src="../assets/women.png" alt="">{{item.name}}</span><span>{{item.sjprice}}</span><span class="price">{{item.tel}}</span></li>
      </ul>
    </div>
    </div>
    <mask-info v-if="maskState" :listImg="demo01_list" :indexImg="demo01_index" @imgClose="closeImg"></mask-info>
  </div>  
</template>

<script>
import {ViewBox, XHeader, Tabbar, TabbarItem, Panel, Swiper} from 'vux'
import maskInfo from './mask-info.vue'

const baseList = [{
  url: 'javascript:',
  img: 'https://static.vux.li/demo/1.jpg',
  title: '送你一朵fua'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/2.jpg',
  title: '送你一辆车'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/3.jpg',
  title: '送你一次旅行'
}]

export default {
  name: 'info',
  components: {
    ViewBox,
    XHeader,
    Tabbar,
    TabbarItem,
    Panel,
    Swiper,
    maskInfo
  },
  data () {
    return {
      demo01_list: [],
      demo01_index: 0,
      swiperItemIndex: 1,
      roomInfo: [],
      sheyouInfo:[],
      maskState: false
    }
  },
  created () {
    let id = this.$route.query.id
    
    this.$formPost.post('sf_hetong/detail.do',{id:id})
    .then((res) => {
      console.log(res)
      res.data.data.room = (res.data.data.room.split('0')).length-1
      this.roomInfo = res.data.data
      if(res.data.data.fb_fj_photo){
        this.roomInfo.fb_fj_photo = res.data.data.fb_fj_photo.split(';')
        for (var i=0;i<this.roomInfo.fb_fj_photo.length-1;i++){
          this.demo01_list.push({
            url: 'javascript:',
            img: 'http://erp.ourkyj.com'+this.roomInfo.fb_fj_photo[i],
            title: ''
          })
        }
      }else{
        this.demo01_list=[{
          url: 'javascript:',
          img: '',
          title: '效果图未上传'
        }]
      }
      for (var i=0;i<this.roomInfo.rooms.length;i++){
        for(var n=0;n<this.roomInfo.fjs.length;n++){
          if(this.roomInfo.rooms[i].code==this.roomInfo.fjs[n].fj_code){
            if(this.roomInfo.rooms[i].status==0){
              this.sheyouInfo.push({
                code:this.roomInfo.fjs[n].fj_type,
                status:this.roomInfo.rooms[i].status,
                sex:'',
                name:'',
                price:this.roomInfo.fjs[n].fj_price,
                sjprice:'',
                tel:''
              })
            }else {
              for (var j=0;j<this.roomInfo.zfHts.length;j++){
                if(this.roomInfo.rooms[i].code==this.roomInfo.zfHts[j].room_code){
                  if(new Date(this.roomInfo.zfHts[j].start_time)<new Date&&new Date<new Date(this.roomInfo.zfHts[j].return_time)){
                    this.sheyouInfo.push({
                      code:this.roomInfo.fjs[n].fj_type,
                      status:this.roomInfo.rooms[i].status,
                      sex:this.roomInfo.zfHts[j].kehus[0].sex,
                      name:this.hasPri('cz$ht$detail$hx',this.roomInfo.zfHts[j].fk_tend_id,this.roomInfo.zfHts[j].fk_tend_dept_id)&&this.roomInfo.zfHts[j].kehus[0].realName||this.roomInfo.zfHts[j].kehus[0].realName.replace(/./g, '*'),
                      price:this.roomInfo.fjs[n].fj_price,
                      sjprice:this.roomInfo.zfHts[j].deposit,
                      tel:this.hasPri('cz$ht$detail$hx',this.roomInfo.zfHts[j].fk_tend_id,this.roomInfo.zfHts[j].fk_tend_dept_id)&&this.roomInfo.zfHts[j].kehus[0].telephone||this.roomInfo.zfHts[j].kehus[0].telephone.replace(/./g, '*')
                    })
                  }
                }
              }
            }
          }
        }
      }
    })
    .catch((res) => {
      console.log(res)
    })
  },
  methods: {
    onSwiperItemIndexChange (index) {
      console.log('demo item change', index)
    },
    demo01_onIndexChange (index) {
      this.demo01_index = index
    },
    infoimg () {
      this.maskState = true
    },
    closeImg () {
      this.maskState = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .info{
    background: #e6e6e6;
    padding-bottom: 1px;
    height: 100%;
    overflow-y: scroll;
  }
li{
  list-style-type: none;
}
body{
  font-family: '微软雅黑';
  color: #000;
}
.main {
  padding:20px 10px 20px;
  background: #ffffff;
  margin-bottom: 10px;
}
.main h5{
  font-size: 20px;
  padding-left: 10px;
  color: #000;
}
.main h5 span{
  font-size: 14px;
  font-weight: normal;
  padding: 0 10px;
}
.main ul{
  overflow: hidden;
}
.main ul li {
  float: left;
  padding:10px;
  font-size: 12px;
}
.main p{
  padding-left: 10px;
  font-size: 14px;
}
.Supporting,.room-info{
  background: #ffffff;
  margin-bottom: 10px;
  padding-left: 10px;
}
.Supporting h5,.room-info h5{
  font-size: 16px;
  line-height: 30px;
  color: #000;
}
.Supporting ul::after{
  content: ' ';
  display: block;
  clear: both;
}
.Supporting li{
  float: left;
  padding:10px 5px;
}
.Supporting li span {
  padding: 5px 10px;
  font-size: 12px;
  color: #FF9900;
  border: 1px solid #FF9900;
  border-radius: 5px;
}
.room-info ul li{
  border-bottom:1px dashed #ccc;
}
.room-info ul li span{
  display: inline-block;
  text-align: center;
  font-size: 12px;
  width: 14%;
}
.room-info ul li span.number{
  width: 10%;
}
.room-info ul li span.price{
  width: 30%;
}
.room-info ul li span.realName{
  width: auto
}
.room-info ul li span.realName img{
  vertical-align: sub;
  margin-right: 3px;
}
.top{
  padding-top: 46px;
}
.vux-header {
  position: fixed;
  width: 100%;
  z-index: 20
}
#app .vux-header{
  background-color: #ffffff;
}
#app .vux-header .vux-header-title{
  color: #000;
  font-weight: bolder;
}
#app .vux-header-right,#app .vux-header-left a{
  color: #000;
}

</style>
