<template>
  <div class="repairitem1">
    <form-preview v-for="(item,index) in List" :header-label="item.header" :header-value="item.status" :body-items="item.item" :key="index"></form-preview>
  </div>
</template>

<script>
import { FormPreview } from 'vux'
export default {
    name: 'repairitem1',
    components: {
       FormPreview
    },
    data () {
        return {
          params:{
            findAll:1,
            sfhtIdSearch:this.$store.state.orderStore.cleaning.fk_sfht_id
          },
          List:[
          ]
        }
    },
    created () {
        this.$formPost.post('wx_shenqing/list.do',this.params)
        .then( res => {
            this.List = res.data.data.list.map( item => {
                return {
            header:'状态',
            status:item.status,
            item:[
                {
                    label:'报修人',
                    value:item.input.username
                },
                {
                    label:'维修事项',
                    value:item.wx_item
                },
                {
                    label:'申请时间',
                    value:item.input_time
                },
                {
                    label:'接单公司',
                    value:'天天保洁'
                },
                {
                    label:'派单时间',
                    value:'2017-05-08'
                },
                {
                    label:'验收时间',
                    value:'2017-06-01'
                },
                {
                    label:'保洁结果',
                    value:'合格'
                },
                {
                    label:'结算金额',
                    value:'200元'
                },
                {
                    label:'反馈评价',
                    value:'做的不错，以后还用你家，继续努力'
                }
            ]
          }
            })
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vux-button-group > a.vux-button-group-current{
    color: #000;
    background: #ffe26d;
}
.vux-button-group > a{
    display: block;
    position: relative;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    width: 100%;
    height: 30px;
    padding: 0;
    font-size: 14px;
    line-height: 31px;
    text-align: center;
    color: #999;
    white-space: nowrap;
    background: #fdfdfd;
    -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
}
.padTop{
    padding: 20px 15px;
}
.box{
  padding: 15px 10px;
}
.weui-btn_default{
  background: #ff9900;
  color:#fff;
  border:1px solid #CC6600;
}
</style>
