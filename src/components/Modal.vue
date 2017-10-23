<template>
 		<div  v-show="mdShow">
			<div id="div1" @click="closeModal"></div>
			<div id="div2">
				<!-- <p class="login-item">登陆加入购物车失败，请登陆</p>  -->
				<slot name="message"></slot>
				<!-- <a href="#">关闭</a> 
				<a href="#">加入购车</a> -->
				<slot name="btnClose"></slot>
				<slot name="btnGroup"></slot>
			</div> 
		</div>
</template>
<script>
export default {
  props:['mdShow'],
  methods:{
    	closeModal(){
            this.$emit("close");
        }
  }
}
</script>
<style scoped>
       #div1{
			  z-index:99;
			  width:100%;
			  height:100%;
			  position:fixed;
			  top:0px;
			  left:0px;
			  background-color:#000000;
			  opacity:0.2;
		}
		#div2{
			position:fixed;
			margin:auto;
			left:0; 
			right:0; 
			top:0; 
			bottom:0;
			z-index:100;
			width:450px;
			height:250px;
			background-color:#fff;
			text-align: center;
			border: 1px solid #cd0200;
		}
		#div2 p{
			
			margin-top: 80px;
		}
		#div2 a{
			margin-top: 20px;
			display: inline-block;
			width:200px;
			height:50px;
			background-color: #ff693b;
			line-height: 50px;
			color: #fff;
		}

.md-show {
  visibility: visible;
}


</style>

