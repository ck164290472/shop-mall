<template>
  <div class="orderSuccess">
    <nav-header></nav-header>
    <nav-bread>
        <a href="">我的订单</a>
    </nav-bread>
	<div class="address-top">
		<div class="confirm-address process">
			确认地址
		</div>

		<div class="view-your-order process">
			查看您的订单
		</div>
		<div class="make-payment process">
			付款
		</div>
		<div class="order-confirmation process">
			订单确认
		</div>
		<div class="clear"></div>
	</div>
	<div class="order-Success">
		
		<div class="content-orderSuccess-img">
			<img src="/static/ok-2.png" alt="">
		</div>
		<div class="order-Success-text">
			<p>祝贺你</p>
			<p>你的订单正在处理中！</p>
			<span>订单ID：{{orderId}}</span>
			<span>订单总价格：{{orderTotal|currency('$')}}</span>
		</div>

	</div>
	<div class="order-Success-btn">
		<router-link to="/cart">购物车列表</router-link>
		<router-link to="/">商品列表</router-link>
	</div>
    <nav-bottom></nav-bottom>
</div>
</template>
<script>
import NavHeader from '@/components/Header.vue'
import NavBread from '@/components/NavBread.vue'
import NavBottom from '@/components/NavBottom.vue'
import axios from 'axios'
import {currency} from './../util/currency'
export default {
    data(){
        return{
            orderId:'',
            orderTotal:0
        }
    },
    components:{
            NavHeader,
            NavBread,
            NavBottom,
    },
     filters:{
       currency:currency
    },
    mounted(){
        var orderId=this.$route.query.orderId;
        console.log(orderId);
        if(!orderId){
            return;
        }
        axios.get('/users/orderDetail',{
            params:{orderId:orderId}
        }).then((response)=>{
            let res = response.data;
            if(res.status == '0'){
                this.orderTotal = res.result.orderTotal;
                this.orderId = orderId;
            }
        })
    }
}
</script>
<style>
        .orderSuccess{
			width: 1850px;
			margin:0 auto;
		}
		.process{
			width: 460px;
			display: inline-block;
			float: left;
			height:100px;
			line-height: 100px;
			text-align: center;
			border-bottom: 1px solid red;

        }
	    .order-Success{
			width: 100%;
	     }
	     .content-orderSuccess-img{
	     	margin-top: 50px;
	     	width: 100%;
	     	text-align: center;
	     }
	     .content-orderSuccess-img img{
	     	width: 150px;
	     	height: 200px;
	     }
	     .order-Success-text{
	     	margin-top: 50px;
	     	width: 100%;
	     	text-align: center;
	     }
         .order-Success-text span{
             margin-right: 10px;
         }
	     .order-Success-btn{
	     	margin-top: 50px;
			text-align: center;
	     }
	     .order-Success-btn a{

	     	padding: 10px;
	     	background-color: #e49393;
	     }
		
</style>
