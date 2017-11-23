<template>
<div class="center">
	<div class="box">
		<h5>合同照片</h5>
		<div v-for="item,index in arrImg.photo" class="echo">
			<img :src="'http://erp.ourkyj.com'+item" alt="">
			<span @click="delImg(arrImg.photo,index,item)"><img src="../../assets/del.png" alt=""></span>
		</div>
		<vue-core-image-upload
	    class="btn btn-primary"
	    :crop="false"
	    @imagechanged="imagechangedPhoto"
	    :max-file-size="10485760"
	    :multiple="true"
	    compress="90" 
	    inputAccept='image/jpg,image/jpeg,image/png'
		:multiple-size="4"
	    :isXhr="false">
	    <img src="../../assets/list.png" alt="">
	  </vue-core-image-upload>
	</div>
	<div class="box">
		<h5>授权委托书：</h5>
		<div v-for="item,index in arrImg.trust_books" class="echo">
			<img :src="'http://erp.ourkyj.com'+item" alt="">
			<span @click="delImg(arrImg.trust_books,index,item)"><img src="../../assets/del.png" alt=""></span>
		</div>
		<vue-core-image-upload
	    class="btn btn-primary"
	    :crop="false"
	    @imagechanged="imagechangedtrust_books"
	    :max-file-size="10485760"
	    :multiple="true"
	    inputAccept='image/jpg,image/jpeg,image/png'
		:multiple-size="4"
	    :isXhr="false">
	    <img src="../../assets/list.png" alt="">
	  </vue-core-image-upload>
	</div>
	<div class="box">
		<h5>客户身份证照片</h5>
		<div v-for="item,index in arrImg.owner_cards" class="echo">
			<img :src="'http://erp.ourkyj.com'+item" alt="">
			<span @click="delImg(arrImg.owner_cards,index,item)"><img src="../../assets/del.png" alt=""></span>
		</div>
		<vue-core-image-upload
	    class="btn btn-primary"
	    :crop="false"
	    @imagechanged="imagechangedIdcare"
	    :max-file-size="10485760"
	    :multiple="true"
	    inputAccept='image/jpg,image/jpeg,image/png'
		:multiple-size="4"
	    :isXhr="false">
	    <img src="../../assets/list.png" alt="">
	  </vue-core-image-upload>
	</div>
	<div class="box">
		<h5>产权证明</h5>
		<div v-for="item,index in arrImg.room_license" class="echo">
			<img :src="'http://erp.ourkyj.com'+item" alt="">
			<span @click="delImg(arrImg.room_license,index,item)"><img src="../../assets/del.png" alt=""></span>
		</div>
		<vue-core-image-upload
	    class="btn btn-primary"
	    :crop="false"
	    @imagechanged="imagechangedroom_license"
	    :max-file-size="10485760"
	    :multiple="true"
	    inputAccept='image/jpg,image/jpeg,image/png'
		:multiple-size="4"
	    :isXhr="false">
	    <img src="../../assets/list.png" alt="">
	  </vue-core-image-upload>
	</div>
	<div class="box">
		<h5>银行卡</h5>
		<div v-for="item,index in arrImg.bank_photo" class="echo">
			<img :src="'http://erp.ourkyj.com'+item" alt="">
			<span @click="delImg(arrImg.bank_photo,index,item)"><img src="../../assets/del.png" alt=""></span>
		</div>
		<vue-core-image-upload
	    class="btn btn-primary"
	    :crop="false"
	    @imagechanged="imagechangedbank_photo"
	    :max-file-size="10485760"
	    :multiple="true"
	    inputAccept='image/jpg,image/jpeg,image/png'
		:multiple-size="4"
	    :isXhr="false">
	    <img src="../../assets/list.png" alt="">
	  </vue-core-image-upload>
	</div>
  	<div class="box">
		<h5>其他照片</h5>
		<div v-for="item,index in arrImg.other_photos" class="echo">
			<img :src="'http://erp.ourkyj.com'+item" alt="">
			<span @click="delImg(arrImg.other_photos,index,item)"><img src="../../assets/del.png" alt=""></span>
		</div>
		<vue-core-image-upload
	    class="btn btn-primary"
	    :crop="false"
	    @imagechanged="imagechangedOther"
	    :max-file-size="10485760"
	    inputAccept='image/jpg,image/jpeg,image/png'
	    :multiple="true"
		:multiple-size="4"
	    :isXhr="false">
	    <img src="../../assets/list.png" alt="">
	  </vue-core-image-upload>
	</div>
	<div class="box">
      <x-button @click.native="nextStep">下一步</x-button>
    </div>
	<div class="pos" v-if="status">
		<div class="mask"></div>
		<div class="content">{{pecent}}% <div>正在上传</div></div>
	</div>
</div>
</template>

<script>
import VueCoreImageUpload from 'vue-core-image-upload'
import {XButton} from 'vux'
import lrz from 'lrz'
export default {
  components: {
    'vue-core-image-upload': VueCoreImageUpload,
    XButton
  },
  data() {
    return {
      status:false,
      pecent:'0',
      arrImg:{
        owner_cards:[],
	    other_photos:[],
	    photo:[],
	    bank_photo:[],
	    room_license:[],
	    trust_books:[]
      },
      params:{
      	id:this.$store.state.sf_hetongId,
      	owner_cards:'',
      	other_photos:'',
      	photo:'',
      	bank_photo:'',
      	room_license:'',
      	trust_books:''
      }
    }
  },
  methods: {
    imagechangedPhoto (res) {
    	let name = 'photo'
	    this.upload (res,name)
    },
    imagechangedIdcare (res){
    	let name = 'owner_cards'
	    this.upload (res,name)
    },
    imagechangedOther (res){
    	let name = 'other_photos'
	    this.upload (res,name)
    },
    imagechangedtrust_books (res) {
    	let name = 'trust_books'
	    this.upload (res,name)
    },
    imagechangedroom_license (res){
    	let name = 'room_license'
	    this.upload (res,name)
    },
    imagechangedbank_photo( res ){
    	let name = 'bank_photo'
	    this.upload (res,name)
    },
    Axaj (res,name) {
    	let vm = this
    	if(res){
    		this.$imgPost.post("upload.do",{type:'cz_hetong',file:res},
			{
		    onUploadProgress: function (progressEvent) {
		    // 对原生进度事件的处理
			    if(progressEvent.lengthComputable){
			        //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
			        //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
			      vm.pecent = ~~(100 * progressEvent.loaded / progressEvent.total)
			    }
			  }
			})
			.then((res) => {
				this.status=false
				this.pecent=0
				this.arrImg[name].push(res.data.msg)
			})
			.catch((res) =>{
				this.status=false
				this.pecent=0
				this.$vux.toast.text('上传失败', 'top')
			})
    	}
    	
    },
    upload (res,name) {
    	this.status=true
    	if (res.length){
	    	console.log(res)
	    	for (var i = 0; i<res.length; i++){
	    		const reader = new FileReader();
		        let self = this;
		        reader.onload = function(e) {
		          	let src = e.target.result;
		          	lrz(src)
		          	.then( rst => {
						self.Axaj(rst.base64,name)
		          	})
		          	
		        }
		      	reader.readAsDataURL(res[i]);
	    	}
	    }else{
	    	const reader = new FileReader();
	        let self = this;
	        reader.onload = function(e) {
	          	let src = e.target.result;
	          	lrz(src)
	          	.then( rst => {
					self.Axaj(rst.base64,name)	
	          	})
		          	
	          	
	        }
	      	reader.readAsDataURL(res);
	    }
    },
    delImg(arr,index,item){
    	arr.splice(index,1)
    	this.$imgPost.post("del.do",{paths:item})
    	.then( res => {
    		console.log(res)
    	})
    },
    nextStep () {
    	for ( var i in this.arrImg){
    		this.params[i] = this.arrImg[i].join(";")
    		this.params[i] += ";"
    	}
      	this.$jsonPost.post('sf_hetong/mod.do',this.params)
      	.then( res => {
        	if(res.data.status==1){
          		this.$vux.toast.text(res.data.msg, 'top')
          		this.$router.push('/list')
        	}
      	})
      	.catch( res => {
        	console.log(res)
      	})
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 h5{
 	padding-left: 20px;
 	font-size: 16px
 }
 .box{
 	overflow: hidden;
 }
 .g-core-image-upload-btn {
	float: left
 }
 .echo{
 	width: 88px;
 	height: 75px;
 	float: left;
 	margin: 10px;
 	position: relative;
 }
 .echo img{
 	width: 100%;
 	height: 100%;
 }
 .echo span{
 	position: absolute;
 	height: 20px;
 	width: 20px;
	top: -10px;
	right: -10px;
	text-align: center;
	line-height: 20px;
	border-radius: 50%;	
	z-index: 20;
 }
 .pos{
 	position: fixed;
 	width: 100%;
 	height: 100%;
 	top: 0;
 	z-index: 30;
 }
 .pos .mask{
 	position: fixed;
 	width: 100%;
 	height: 100%;
 	top: 0;
 	background: #000;
 	opacity: .6;
 }
 .pos .content{
 	position: absolute;
 	top: 0;
 	left: 0;
 	right: 0;
 	bottom: 0;
 	margin: auto;
 	height: 50px;
 	width: 100%;
 	color: #fff;
 	text-align:center;
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
