<template>
  <div class="order">
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
	<div class="order-address">
		<div class="content-order-top">
			<h1>商品送货地址</h1>
		</div>
		<div class="content-order-bar">
			<ul>
				<li>订单商品</li>
				<li>单价</li>
				<li>订单个数</li>
				<li>总价</li>
			</ul>
		</div>
		<div class="order-item-list">
			<ul>
				<li v-for="item in cartList" v-if="item.checked =='1'">
					<div class="order-prout">
					<img :src="'/static/'+item.prodcutImg" :alt="item.productName">
					<span>{{item.productName}}</span>
					</div>
					<div class="order-Price">
							<span>{{item.prodcutPrice|currency('$')}}</span>
					</div>
					<div class="order-productNum">			
						<span>{{item.productNum}}</span>
					</div>
					<div class="order-total">
						<span>{{item.prodcutPrice*item.productNum |currency('$')}}</span>
					</div>
				</li>
			</ul>
		</div>

	</div>
	<div class="confirm">
		<div class="confirm-content">
			<p>合计：{{subTotal|currency('$')}}</p>
			<p>运费：{{shipping|currency('$')}}</p>
			<p>折扣：{{discount|currency('$')}}</p>
			<p>税收：{{tax|currency('$')}}</p>
			<p>订单总金额：{{orderTotal|currency('$')}}</p>
			<a href="javascript:void(0)" @click="payMent">确认订单</a>
            
		</div>
        <div class="clear"></div>
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
          cartList:[],
          shipping:100,
          discount:200,
          orderTotal:0,
          subTotal:0,
          tax:400
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
      this.init();
  },
  methods:{
      init(){
           axios.get('/users/cartList').then((response)=>{
                let res = response.data;
                this.cartList = res.result;
                this.cartList.forEach((item)=>{
                    if(item.checked=='1'){
                        this.subTotal += item.prodcutPrice* item.productNum;
                    }
                });
                this.orderTotal = this.subTotal +this.shipping-this.discount+this.tax
            })
      },
      payMent(){
          var addressId = this.$route.query.addressId;
          
          axios.post("/users/payMent",{
              addressId:addressId,
              orderTotal:this.orderTotal
          }).then((response)=>{
              let res = response.data;
              if(res.status == '0'){
                 this.$router.push({
                     path:'/orderSuccess?orderId='+res.result.orderId
                 })
              }
          })
      }
  }
}
</script>
<style scoped>
		.order{
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
			border-bottom: 1px solid #c3bdbd;

        }
        .content-order-top{
        	width:100%;
			line-height: 50px;
			height: 50px;
			text-align: left;
			margin-top: 20px;
			font-size: 14px;
			background-color: #fff;
        }
        .content-order-bar{
			width: 100%;
			margin-top: 20px;
			
		}
        .view-your-order, .confirm-address{
			border-bottom: 1px solid red;
		}
		.content-order-bar{
			background-color: #484646;
		}
		.content-order-bar ul li{
			display: inline-block;
			padding-left: 300px;
			line-height: 50px;
			color: #fff;

		}
		.order-item-list{
			width: 100%;
			background-color: #fff;
		}
		.order-item-list ul li div{
			float: left;
			height: 180px;
		}
		.order-item-list ul::after{
		    clear:both;
		    content:'';
		    height: 0;
		    display: block;
		    visibility: hidden;
		}
		.order-prout{
			text-align: center;
			width: 650px;
			line-height: 180px;
		}
		.order-prout img{
			width: 100px;
			height: 120px;
		}
		.order-Price{
			text-align: center;
			width: 70px;
			line-height: 180px;
		}
		.order-productNum{
			text-align: center;
			width: 650px;
			line-height: 180px;
		}
		.order-total{
			text-align: letf;
			width: 200px;
			line-height: 180px;
		}
		.confirm-content{
			float: right;
		}
		.confirm-content p {
			padding:10px;
		}
		.confirm-content a {
			padding:10px;
            margin-top: 10px;
            margin-left: 10px;
			background-color: #e2bebe;
		}
		.clear{
		    clear:both;
		}
</style>
