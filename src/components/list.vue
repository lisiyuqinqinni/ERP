<template>
    <view-box>
      <x-header
      title="客有家租房"
      :left-options="{showBack:false}"
      slot="header"
      class="header">
      <div slot="left" class="toggle-button">点击</div>
      <div slot="right" @click="outLogin">退出登录</div>
      </x-header>
      <search class="search" :maxlength="10" @search='search'></search>
      <tab @screen="screen"></tab>
      <div>
        <scroller
          class="my-scorller"
          ref="myScroller"
          :on-refresh="refresh"
          :on-infinite="infinite"
          >
          <div class="lists">
				    <ul>
                <router-link v-for="item,key in dataList" tag='li' :to="{path: '/info',query: {id:item.id}}" :key="key" >
                 
                   <div class="list-img fl">
                     <img v-if="item.fb_fj_photo[0]" :src="'http://erp.ourkyj.com'+item.fb_fj_photo[0]">
                     <img v-if="item.fb_fj_photo==''" src="../assets/list.png">
                   </div>
                   <div class="list-p fl">
                     <h3>{{item.fy.xq.name}}
                       
                     </h3>
                     <p>{{item.fy.shi}}室{{item.fy.ting}}厅--{{item.fy.orientation}}</p>
                     <p>{{item.fy.area}}㎡ {{item.fy.floor}}/{{item.fy.floor_top}}</p>
                     <p class="address">{{item.fy.address}}</p>
                   </div>
                   <div class="rt area">
                      <p>{{item.room}}/{{item.rooms.length}}</p>
                   </div>
                 
                 <p class="clear"></p>
               </router-link>
             </ul>
           </div>
        </scroller>
      </div>
      <tabbar slot="bottom">
        <div @click="allHouse" class="footer">
          <tabbar-item>
            <img src="../assets/icon_nav_button.png" alt="" slot="icon" >
            <span slot="label">所有房源</span>
          </tabbar-item>
        </div>
        <div @click="houseToLet" class="footer">
          <tabbar-item >
            <img src="../assets/icon_nav_cell.png" alt="" slot="icon">
            <span slot="label">可租房源</span>
          </tabbar-item>
        </div>
      </tabbar>
    </view-box>
    <!-- <router-view></router-view> -->
</template>

<script>
import {ViewBox, XHeader, Tabbar, TabbarItem, Panel} from 'vux'
import search from './search'
import tab from './tab'
export default {
  name: 'app',
  components: {
    ViewBox,
    XHeader,
    Tabbar,
    TabbarItem,
    Panel,
    search,
    tab
  },
  data () {
    return {
      type: '1',
      dataList: null,
      dataListx: null,
      moreDataList: [],
      condition:{
        keyword:'',
        pageNum:'',
        pages:'',
        chuzuTypeSearch:'',
        xzqIdSearch:'',
        fyTypeSearch:''
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    // ....
    if( from.path!='/info'){
      next(vm =>{
        vm.$formPost.post('sf_hetong/list.do')
        .then((res) => {
          vm.handle (res)
          vm.dataList = vm.dataListx
          vm.condition.pageNum = res.data.data.nextPage
          vm.condition.pages = res.data.data.pages
          vm.$local.save('info', {
            dataList: vm.dataList,
            page: vm.condition.pageNum,
            pages: vm.condition.pages
          })
          vm.$refs.myScroller.finishInfinite()
        })
        .catch((res) => {
          console.log(res)
        })
      })
    }else if(from.path == '/info'){
      next(vm => {
        let info = vm.$local.fetch('info')
        let condition = vm.$local.fetch('condition')
        vm.dataList = info.dataList
        vm.condition = condition.condition
      })
    }
    
  },
  beforeRouteLeave (to, from, next) {
    this.$local.save('position', {
      position:this.$refs.myScroller.getPosition()
    })
    this.$local.save('condition', {
      condition:this.condition
    })
    next()
  },
  created () {
  },
  mounted () {
    this.$nextTick(function(){
       let posInfo = this.$local.fetch('position')
       if(posInfo){
        let vm = this
        setTimeout(function(){
          vm.$refs.myScroller.scrollTo(0,posInfo.position.top,true)
        },1)
      }  
    })
  },
  methods: {
    refresh () {
      // 下拉刷新
      setTimeout(() => {
        this.$refs.myScroller.finishPullToRefresh();
        this.$vux.toast.text(`当前一共刷新了10条数据`, 'top')
      }, 1000)
    },
    infinite () {
      if(this.dataList!=null){  
        if(this.condition.pageNum!=0){
          let data= this.condition
          this.ajax(data)
        }else {
          this.$refs.myScroller.finishInfinite(2);
        }
      }
    },
    handle (res){
      for (var i=0; i<res.data.data.list.length; i++){
        res.data.data.list[i].room = (res.data.data.list[i].room.split('0')).length-1
        if(res.data.data.list[i].fb_fj_photo){
          res.data.data.list[i].fb_fj_photo = res.data.data.list[i].fb_fj_photo.split(';')
        }
        
        let n = 0
        do{
          var now = new Date;
          var d = new Date(res.data.data.list[i].rents[n]);
          res.data.data.list[i].rent = res.data.data.list[i].rents[n].price
          n++
        }
        while(new Date>new Date(res.data.data.list[i].rents[n]))
      }
      this.dataListx = res.data.data.list
    },
    goInfo (){
      this.$router.push('/info')
    },
    outLogin () {
      this.$local.save('user',null)
      this.$local.save('info',null)
      this.$local.save('position',null)
      this.$local.save('yonghu',null)
      this.$router.push('/')
    },
    screen (obj) {
      this.condition.chuzuTypeSearch = obj.chuzuTypeSearch
      this.condition.xzqIdSearch = obj.xzqIdSearch
      this.$refs.myScroller.finishInfinite(false)
      this.dataList = []
      this.condition.pageNum=''
      this.condition.pages=''
      this.ajax(this.condition)
    },
    search (val) {
      this.condition.keyword = val
      this.$refs.myScroller.finishInfinite(false)
      this.dataList = []
      this.condition.pageNum=''
      this.condition.pages=''
      this.ajax(this.condition)
    },
    allHouse () {
      this.$refs.myScroller.finishInfinite(false)
      this.dataList = []
      this.condition.pageNum=''
      this.condition.pages=''
      this.condition.fyTypeSearch=''
      this.ajax(this.condition)
    },
    houseToLet () {
      this.$refs.myScroller.finishInfinite(false)
      this.dataList = []
      this.condition.pageNum=''
      this.condition.pages=''
      this.condition.fyTypeSearch= 0 
      this.ajax(this.condition)
    },
    ajax (data) {
      this.$formPost.post('sf_hetong/list.do',data)
          .then((res) => {
            if(res.data == 'notLogin'){
              this.$router.push('/')
            }
            this.handle (res)
            this.condition.pageNum = res.data.data.nextPage
            this.condition.pages = res.data.data.pages
            this.dataList = this.dataList.concat(this.dataListx);
            this.$local.save('info', {
              dataList: this.dataList,
              page: this.condition.pageNum,
              pages: this.condition.pages
            })
            this.$refs.myScroller.finishInfinite();
          })
          .catch((res) => {
            console.log(res)
          })
    }
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