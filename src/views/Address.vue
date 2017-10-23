<template>
  <div class="address">
    <nav-header></nav-header>
    <nav-bread>
        <a href="">收货地址</a>
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
	<div class="content-address">
		<div class="content-address-top">
			<h1>商品送货地址</h1>
		</div>
		<div class="content-address-bar">
			<ul>
				<li v-for="(item,index) in addressListFilter" v-bind:class="{'check':checkIndex == index}" @click="checkIndex=index;selectedAddrId=item.addressId">
					<p>{{item.userName}}</p>
					<p>{{item.streetName}}</p>
					
					<p>{{item.tel}}</p>
					<div class="selsect-address">
						<p v-if="item.isDefault" class="default-address">默认地址</p>
                        <p v-if="!item.isDefault" class="default-address"><a id="setdefault" @click="setDefault(item.addressId)" href="javascript:void(0)">设置为默认地址</a></p>
						<a href="javascript:void(0)" @click="delAddressConfirm(item.addressId)">删除</a>
						
					</div>
				</li>
				<li>
					<h1>+</h1>
					<span>添加新的地址信息</span>
				</li>
			</ul>
			<div class="clear"></div>
		</div>
		<div class="more"><a href="javascript:void(0)" @click="expand">更多</a></div>
		<div class="delivery-mode">
			<ul>
				<li>
					<p>快递方式</p>
					<p>平邮</p>
					
					<p>一旦下货，订单将在1-7天内到达目的地</p>
				</li>
			</ul>
		</div>
	</div>
	<div class="confirm">
		<!-- <a href="javascript:void(0)">确认地址</a> -->
		<router-link class="confirm-a" v-bind:to="{ path:'/orderConfirm',query:{'addressId':selectedAddrId}}">确认地址</router-link>
	</div>
    <modal v-bind:mdShow="isMdShow" @close ="closeModal">
        <p slot="message">你确认要删除此条地址吗！！！</p>
        <a slot="btnClose" @click="delAddress">确定</a>
        <a slot="btnGroup" @click="isMdShow = false" href="javascript:;" >关闭</a>
    </modal>
    <nav-bottom></nav-bottom>
</div>
</template>
<script>
import NavHeader from '@/components/Header.vue'
import NavBread from '@/components/NavBread.vue'
import NavBottom from '@/components/NavBottom.vue'
import axios from 'axios'
import Modal from '@/components/Modal.vue'
export default {
    data(){
        return{
            limit:3,
            addressList:[],
            checkIndex:0,
			selectedAddrId:'',
            isMdShow:false,
            addressId:''

        }
    },
    computed:{
        addressListFilter(){
            return this.addressList.slice(0,this.limit);
        }
    },
    components:{
            NavHeader,
            NavBread,
            NavBottom,
            Modal
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){
            axios.get("/users//addressList").then((response)=>{
                let res = response.data;
                if(res.status == '0'){
                    this.addressList = res.result;

                }
            })
        },
        expand(){
            if(this.limit == 3){
                this.limit = this.addressList.length;
            }else{
                this.limit = 3;
            }
        },
        closeModal(){
            this.isMdShow = false;
        },
        delAddress(){
            axios.post("/users/delAddress",{
              addressId:this.addressId
            }).then((response)=>{
                let res = response.data;
                if(res.status=="0"){
                  console.log("del suc");
                  this.isMdShow = false;
                  this.init();
                }
            })
        },
        delAddressConfirm(addressId){
            this.isMdShow = true;
            this.addressId = addressId;
        },
        setDefault(addressId){
            console.log("addressId"+addressId)
            axios.post('/users/setDefault',{
                addressId:addressId
            }).then((response)=>{
                let res = response.data;
                if(res.status == '0'){
                    this.init();
                }
            })
        },
    }
}
</script>
<style scoped>
		.address{
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
        .confirm-address{
			border-bottom: 1px solid red;
		}
		.content-address-top{
			width:100%;
			line-height: 50px;
			height: 50px;
			text-align: left;
			margin-top: 20px;
			font-size: 14px;
			background-color: #fff;
		}
		.content-address-bar{
			width: 100%;
			margin-top: 20px;
			
		}
		.content-address-bar ul li{
			
			width: 250px;
			height: 150px;
			border: 1px solid red;
			float: left;
            margin-right:100px;
            margin-top: 20px;
		}
	
		.content-address-bar ul li p{
            margin-top: 10px;
            margin-left: 10px;
		}
		.default-address{
			display: inline-block;
		}
		.selsect-address{
			width: 100%;
		}
		.selsect-address p{
			float: left;
			margin-top: 40px;
		}
		.selsect-address a{
			padding:10px;
			background-color: #e49393;
			margin-right:10px;
			float: right;
		}
		.content-address-bar ul li h1{
			font-size: 50px;
			text-align: center;
			line-height: 100px;
		}
		.content-address-bar ul li span{
			display: block;
			text-align: center;
			line-height: 30px;
		}
		.more{
			text-align: center;
		}
		.delivery-mode  ul li{
			margin-top: 50px;
			width: 250px;
			height: 150px;
			border: 1px solid red;
		}
		.delivery-mode  ul li p{
            margin-top: 10px;
            margin-left: 10px;
		}
		.confirm{
			margin-top: 30px;
			width: 100%;
			height: 50px;
		}
		.confirm-a{
			float: right;
			line-height: 30px;
			padding:10px;
			background-color: #e49393;
        }
        .check{
            background-color: #e49393;
        }
        #setdefault{
            background-color: #f5f4f4;
        }
		.clear{
		    clear:both;
		}
</style>
