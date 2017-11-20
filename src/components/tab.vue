<template>
  <div class="rows">
      <div class="list" v-for="item,index in dropdownList" @click="dropdown(index)" :class="{active:selected===index}">
        <a href="javascript:;">{{item.title}}<span></span></a>
        <ul class="listOpt" v-if="selected===index">
          <li @click="unlimited(item,index)">不限</li>
          <li v-for="item1,index1 in item.listInfo" @click="choice(item,index1,index)" :class="{active:item.title===item1.name}">{{item1.name}}</li>
        </ul>
      </div>
      <div class="mask" v-if="selected!=null" @click="dropUp"></div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      selected: null,
      dropdownList: [
        {
          title: '类型',
          listInfo: [
            {
              name: '整租'
            },
            {
              name: '合租'
            }
          ]
        },
        {
          title: '位置',
          listInfo: [
            {
              name: '整租1'
            },
            {
              name: '合租1'
            }
          ]
        }
        // {
        //   title: '户型',
        //   listInfo: [
        //     {
        //       info: '整租2'
        //     },
        //     {
        //       info: '合租2'
        //     }
        //   ]
        // },
        // {
        //   title: '其他',
        //   listInfo: [
        //     {
        //       info: '整租3'
        //     },
        //     {
        //       info: '合租3'
        //     }
        //   ]
        // }
      ],
      screen:{
        chuzuTypeSearch:'',
        xzqIdSearch:'' 
      }
    }
  },
  created () {
    this.dropdownList[1].listInfo = script_xzqs
  },
  methods: {  
    dropdown (index) {
      if (this.selected !== index) {
        this.selected = index
      }else if (this.selected === index) {
        this.selected = null
      }
    },
    dropUp () {
      this.selected = null
    },
    choice (item,index1,index) {
      item.title = item.listInfo[index1].name
      switch(index)
      {
      case 0:
        this.screen.chuzuTypeSearch = item.listInfo[index1].name
        break;
      case 1:
        this.screen.xzqIdSearch = item.listInfo[index1].id
        break;
      default:
        break;
      }
      this.$emit('screen',this.screen)
    },
    unlimited (item,index) {
      let arr = ['类型','位置','户型','其他']
      item.title = arr[index]
      switch(index)
      {
      case 0:
        this.screen.chuzuTypeSearch = ''
        break;
      case 1:
        this.screen.xzqIdSearch = ''
        break;
      default:
        break;
      }
      this.$emit('screen',this.screen)
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
ul{
  padding:0;
}

.rows{
  display: flex;
  margin-top:44px;
  position: relative;
  z-index: 100;
  background: #ffffff;
}
.rows div{
  width:0;
  flex-grow: 1;
  margin:auto;
}
.rows div a{
  font-size:14px;
  color:#666;
  text-align: center;
  line-height: 45px;
  display: block;
  border-bottom:1px solid #e9e9e9;
  overflow: hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
}
.rows div a span{
  display: inline-block;
  width:11px;
  height:7px;
  background-image:url(../assets/arrow.png);
  background-size: 11px 7px;
  margin-left:20px;
}
.rows .listOpt{
  position:absolute;
  top:46px;
  left:0;
  width: 100%;
  z-index: 66;
  padding:0;
  max-height: 277px;
  overflow: auto;
}
.rows .listOpt li{
  list-style-type: none;
  font-size: 14px;
  text-align: center;
  line-height: 45px;
  background-color: #fff;
  border-bottom: 1px solid #e9e9e9;
  margin: 0 auto;
}
.rows .mask{
  position: fixed;
  top: 136px;
  left: 0%;
  width: 100%;
  height: 100%;
  background: black;
  z-index: 55;
  opacity: .7;
}
.rows>div.active .listOpt .active{
  color: #8ec31f;
}
.rows>div.active a{
  color: #8ec31f;
}
.rows>div.active a span{
  background-image:url(../assets/toup.png);
}
</style>
