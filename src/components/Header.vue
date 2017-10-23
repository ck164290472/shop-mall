<template>
  <div>
   <div class="top">
        <div class="topcontent">
            <div class="topimg">
                <img src="./../assets/imgs/top1.jpg" alt="">
            </div>
            <ul>
				
                <li><a href="javascript:void(0)" @click="logOut" v-if="nickName">退出</a></li>
                <li><a href="javascript:void(0)" v-if="!nickName"  @click="loginModel">登陆</a></li>
				<li><span v-text="nickName" v-if="nickName"></span></li>
            </ul>
        </div>
        
    </div>
    <div v-show="loginModalFlag">
        <div id="div1"></div>
            <div id="div2">
                <div class="title">登陆<span @click="closeLogin" class="close"></span></div>
                <p class="login-item" v-show="errorTip">用户名或者密码错误</p>
                <div class="login-item"><input class="loginInput" v-model="userName" type="text" id="txtusername"/></div>
                <div class="login-item"><input class="loginInput" v-model="userPwd" type="password" id="password"/></div>
                <div class="login-item"><a href="javascript:void(0)" id="loginBtn" @click="login">登&nbsp;&nbsp;&nbsp;陆</a></div>  
        </div> 
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data(){
      return{
          userName:'',
          userPwd:'',
		  errorTip:false,
		  loginModalFlag:false,
		  nickName:''
      }
  },
  mounted(){
	  this.checkLogin();
  },
  methods:{
	  checkLogin(){
		  axios.get('/users/checkLogin').then((response) =>{
			  let res = response.data;
			  if(res.status =="0"){
				  this.nickName = res.result;
			  }
		  })
	  },
      login(){
		  if(!this.userName || !this.userPwd){
			  this.errorTip = true;
			  return;
		  }
          axios.post("/users/login",{
              userName:this.userName,
              userPwd:this.userPwd
          }).then((response) =>{
               let res = response.data;
               if(res.status == "0"){
				   this.errorTip = false;
				   this.nickName = res.result.userName;
				   this.closeLogin();
               }else{
                   this.errorTip = true;
               }
          })
	  },
	  loginModel(){
		  this.loginModalFlag = true;
	  },
	  closeLogin(){
		  this.loginModalFlag = false;
	  },
	  logOut(){
		  axios.post('/users/logout').then((response) =>{
			  let res = response.data;
			  if(res.status == "0"){
				  this.nickName = '';
			  }
		  })
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
		}
		.title{
			margin:10px;
			font-size: 25px;
		}
		
		.login-item{
			margin:10px;
			/*width: 427px;
			height: 52px;*/
		}
		.loginInput{
			width: 427px;
			height: 32px;
		}
		#loginBtn{
			display: block;
			width: 430px;
			height: 32px;
			background-color: #ff693b;
			text-align: center;
			line-height: 32px;
			color: #fff;
			font-size: 20px;
		}
		.close {
		    /* still bad on picking color */
		    background: orange;
		    color: red;
		    /* make a round button */
		    border-radius: 12px;
		    /* center text */
		    line-height: 20px;
		    text-align: center;
		    height: 20px;
		    width: 20px;
		    font-size: 18px;
		    padding: 1px;
		}
		/* use cross as close button */
		.close::before {
		    content: "\2716";
		}
		/* place the button on top-right */
		.close {
		    top: -10px;
		    right: -10px;
		    position: absolute;
		}
</style>
