<template>
    <Slideout menu="#menu" panel="#panel" :toggleSelectors="['.toggle-button']" style="height:100%;">
      <nav id="menu">
        <div class="menu">菜单</div>
        <div>
          <ul>
            <li><div @click="outLogin">退出登录</div></li>
          </ul>
        </div>
      </nav>
      <main id="panel" style="height:100%;">
        <view-box>
          <x-header
          title="客有家租房"
          :left-options="{showBack:false}"
          slot="header"
          class="header">
          <div slot="left" class="toggle-button"><img style="width:25px;height:25px;" src="../assets/icon_nav_cell.png" alt="" ></div>
          <router-link tag="div" slot="right" :to="{path:'/sf_contract'}">收房录入</router-link>
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
                         <h3>{{item.fy.xq.name}}</h3>
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
      </main>
    </Slideout>

</template>
 
<script>
  import Slideout from 'vue-slideout'
  import {ViewBox, XHeader, Tabbar, TabbarItem, Panel} from 'vux'
  import search from './search'
  import tab from './tab'
  export default {
    name: 'app',
    components: {
      Slideout,
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
        console.log(condition.condition)
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
 
<style scoped>
  body {
   margin:0;
  padding:0;
  width:100%;
  height:100%;
  overflow: hidden;
  background: #ffffff;
  }

  .list,.weui-tab {
     width: 100%;
    min-height: 100vh;
  }
 
  .slideout-menu {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 256px;
    height: 100vh;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    z-index: 0;
    display: none;
    background-color: #1D1F20;
    color: white;
  }
 
  .slideout-menu-left {
    left: 0;
  }
 
  .slideout-menu-right {
    right: 0;
  }
 
  .slideout-panel {
    /*background-color: #4B5;*/
    color: white;
    position: relative;
    /*z-index: 1;*/
    will-change: transform;
    min-height: 100vh;
  }
 
  .slideout-open,
  .slideout-open body,
  .slideout-open .slideout-panel{
    overflow: hidden;
     margin:0;
  padding:0;
  width:100%;
  height:100%;
  overflow: hidden;
  background: #ffffff;
  }
 
  .slideout-open .slideout-menu {
    display: block;
  }
  nav {
    padding-left: 30px;
  }
  li{
    list-style-type: none;
  }
  nav .menu{
    color: #CC6600;
    padding-top:30px;
  }
  nav ul {
    padding-top:30px;
  }
  nav ul li{
    padding-left: 10px;
    color: #FF9900;
    font-size: 14px;
  }
</style> 