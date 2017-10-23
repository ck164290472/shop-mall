<template>
<div>
    <nav-header></nav-header>
    <nav-bread>
        <a href="">购物车</a>
    </nav-bread>
 	<div class="cartbox">

        <div class="cart-top">
            <h1>我的购物车</h1>
        </div>
        <div class="cartContent">
            <div class="cart-item-head">
                <ul>
                    <li>商品</li>
                    <li>价格</li>
                    <li>商品个数</li>
                    <li>总价</li>
                    <li>删除</li>
                </ul>
            </div>
            <div class="cart-item-list">
                <ul>
                    <li  v-for="item in cartList">
                        <div class="cart-checkbox">
                            <input type="checkbox" :checked="item.checked =='1'" @click="editCart('checked',item)">
                        </div>

                        <div class="cart-prout">
                            <img v-bind:src="'/static/'+item.prodcutImg" v-bind:alt="item.productName">
                            <span>{{item.productName}}</span>
                        </div>

                        <div class="cart-Price">
                            <span>{{item.prodcutPrice|currency('$')}}</span>
                        </div>

                        <div class="cart-productNum">
                            <button @click="editCart('add',item)">+</button>
                            <span>{{item.productNum}}</span>
                            <button @click="editCart('minus',item)">-</button>
                        </div>

                        <div class="cart-total">
                            <span>{{(item.productNum*item.prodcutPrice)|currency('$')}}</span>
                        </div>

                        <div class="cart-dele">
                            <a href="javascript:void(0)" @click="delCartConfirm(item.productId)">删除</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="clear"></div>
        <div class="select-prout">
            <div class="select-prout-left">
                <input type="checkbox" :checked="checkAllFlag" @click="toggleCheckAll">
                <a href="javascript:void(0)" @click="toggleCheckAll">全部选中</a>
                <a href="javascript:void(0)">删除全部</a>
            </div>
            <div class="select-prout-rigth">
                <span>合计</span>
                <span>{{totalPrice|currency('$')}}</span>
                <a href="javascript:void(0)" @click="checkOut" v-bind:class="{'disabled':checkedCount == 0}">结算</a>
            </div>
        </div>	
    </div>
    <modal v-bind:mdShow="modalConfirm" @close ="closeModal">
        <p slot="message">你确认要删除此条数据吗！！！</p>
        <a slot="btnClose" @click="delCart">确定</a>
        <a slot="btnGroup" @click="modalConfirm = false" href="javascript:;" >关闭</a>
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
import {currency} from './../util/currency'
export default {
    data(){
        return{
            cartList:[],
            modalConfirm:false,
            productId:'',
            
        }
    },
    components:{
        NavHeader,
        NavBread,
        NavBottom,
        Modal
    },
    computed:{
        checkAllFlag(){
            return this.checkedCount == this.cartList.length;
        },
        checkedCount(){
            var  i = 0;
            this.cartList.forEach((item)=>{
                if(item.checked == '1') i++;
            })
            return i;
        },
        totalPrice(){
            var money = 0;
            this.cartList.forEach((item)=>{
                if(item.checked == '1'){
                    money += parseFloat(item.prodcutPrice)*parseInt(item.productNum)
                }
            })
            return money;
        }
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
            })
        },
        delCartConfirm(productId){
            this.modalConfirm = true;
            this.productId = productId;
        },
        delCart(){
            axios.post("/users/cartDel",{
                productId:this.productId
            }).then((response)=>{
                let res = response.data;
                if(res.status == '0'){
                    this.modalConfirm = false;
                    this.init();
                }
            });
        },
        closeModal(){
            this.modalConfirm = false;
        },
        editCart(flag,item){
            if(flag == 'add'){
                item.productNum ++;
            }else if(flag == 'minus'){
                if(item.productNum <=1){
                    return;
                }
                item.productNum --;
            }else{
                item.checked = item.checked =="1"?'0':'1';
                console.log(item.checked);
            }
            axios.post("/users/cartEdit",{
                productId:item.productId,
                productNum:item.productNum,
                checked:item.checked
            }).then((response)=>{
                let res = response.data;
            })
        },
        toggleCheckAll(){
            var flag = !this.checkAllFlag;
             console.log(this.checkAllFlag)
            this.cartList.forEach((item) =>{
                item.checked = flag?'1':'0';
            });
             axios.post("/users/editCheckAll",{
                checkAll:flag
            }).then((response)=>{
                let res = response.data;
                if(res.status =='0'){
                    console.log('更新成功')
                }
            })
        },
        checkOut(){
            if(this.checkedCount > 0){
                this.$router.push({
                    path:"/address"
                });
            }
        }
    }
}
</script>
<style scoped>
		.cartbox{
			width: 1850px;
			margin:0 auto;
		}
		.cart-top{
			width: 100%;
			height: 100px;
		}
		.cart-top h1{
			line-height: 100px;
		}
		.cartContent{
			width: 100%;
			height: 50px;
		}
		.cart-item-head{
			background-color: #484646;
		}
		.cart-item-head ul li{
			display: inline-block;
			padding-left: 300px;
			line-height: 50px;
			color: #fff;

		}
		.cart-item-list{
			background-color: #fff;
		}
		.cart-item-list ul li div{
			float: left;
			height: 180px;

		}
		.cart-item-list ul::after{
		    clear:both;
		    content:'';
		    height: 0;
		    display: block;
		    visibility: hidden;
		}
		.cart-checkbox{
			width: 200px;
			text-align: center;
			line-height: 180px;
		}
		.cart-checkbox input{
			width: 30px;
			height:30px;
		}
		.cart-prout{
			width: 200px;
			text-align: center;
			line-height: 180px;
		}
		.cart-prout img{
			width: 100px;
			height: 120px;
			border: 1px solid #484646;
		}
		.cart-Price{
			width: 500px;
			text-align: center;
			line-height: 180px;
		}
		.cart-productNum{
			width: 200px;
			text-align: center;
			line-height: 180px;
		}
		.cart-productNum button ,.cart-productNum span{
			width: 30px;
			height: 30px;
		}
		.cart-total{
			width: 520px;
			text-align: center;
			line-height: 180px;
			color: red;
		}
		.cart-dele{
			width: 150px;
			text-align: center;
			line-height: 180px;
		}
		.select-prout{
			width: 100%;
			height: 50px;
			background-color: #fff;
			margin-top: 30px;
		}
		.select-prout-left {
			float: left;
			line-height: 50px;
			margin-left: 20px;
		}
		.select-prout-rigth{
			float: right;
			line-height: 50px;
		}
		.select-prout-rigth a{
			padding:15px;
			background-color: #e8a9a9;
		}
		.select-prout-rigth span{
			padding:15px;
		}
		.clear{
		    clear:both;
        }
        a.disabled {
            pointer-events: none;
            filter: alpha(opacity=50); /*IE滤镜，透明度50%*/
            -moz-opacity: 0.5; /*Firefox私有，透明度50%*/
            opacity: 0.5; /*其他，透明度50%*/
        }
</style>

