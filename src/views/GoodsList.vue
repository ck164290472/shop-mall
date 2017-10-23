<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
        <a href="">商品</a>
    </nav-bread>
    <div class="content">
        <div class="contentBox">
            <div class="contentTop">
                <ul>
                    <li><a href="javascript:void(0)" @click="sortDropGoods">从高到低</a></li>
                    <li><a href="javascript:void(0)" @click="sortRiseGoods">从低到高</a></li>
                    <li><span>价格排序</span></li>
                </ul>
            </div>
            <div class="left">
                <dd><a href="javascript:void(0)" @click="setPriceFilter ('all')" :class="{'cur':priceChecked=='all'}">全部</a></dd>
                <dd v-for="(price,index) in priceFilter">
                    <a href="javascript:void(0)" @click="setPriceFilter(index)" :class="{'cur':priceChecked==index}">{{price.startPrice}}-{{price.endPrice}}</a>
                </dd>
            </div>
            <div class="right">
                <ul>
                    <li v-for="item in goodsList">
                        <div class="listBox">
                                <div class="pic">
                                    <a href="javascript:void(0)"><img v-lazy="'/static/'+item.prodcutImg" alt=""></a>
                                </div>
                                <div class="main">
                                    <div class="productname">{{item.productName}}</div>
                                    <div class="price">{{item.prodcutPrice}}</div>
                                    <div class="btn-area">
                                        <a href="javascript:void(0)" @click="addCart(item.productId)">加入购物车</a>
                                    </div>
                                </div>
                        </div>
                    </li>
        
                </ul>
                <div class="view-more-normal"
                   v-infinite-scroll="loadMore"
                   infinite-scroll-disabled="busy"
                   infinite-scroll-distance="30">
                <img src="./../assets/imgs/loading-spinning-bubbles.svg" v-show="loading">
              </div>
            </div>
        </div>
        <div class="clear"></div>
    </div>
    <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
        <p slot="message">请先登陆，否则无法加入到购物车中！</p>
        <a slot="btnClose" @click="mdShow = false">关闭</a>
    </modal>
    <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
        <p slot="message">加入购物车成功！！！</p>
        <a slot="btnClose" @click="mdShowCart = false">继续购物</a>
        <router-link slot="btnGroup" href="javascript:;" to="/cart">查看购物车</router-link>
    </modal>
    <nav-bottom></nav-bottom>
  </div>
</template>
<script>
import '@/assets/css/mian.css'
import NavHeader from '@/components/Header.vue'
import NavBread from '@/components/NavBread.vue'
import NavBottom from '@/components/NavBottom.vue'
import axios from 'axios'
import Modal from '@/components/Modal.vue'
export default {
    data(){
        return{
            goodsList:[],
            priceFilter:[
                {
                    startPrice:'0.00',
                    endPrice:'100.00'
                },
                {
                    startPrice:'100.00',
                    endPrice:'500.00'
                },
                {
                    startPrice:'500.00',
                    endPrice:'1000.00'
                },
                {
                    startPrice:'1000.00',
                    endPrice:'5000.00'
                }
            ],
            mdShowCart:false,
            priceChecked:'all',
            sortFlag:true,
            page:1,
            pageSize:5,
            busy:true,
            loading:false,
            mdShow:false
        }
    },
    mounted(){
        this.getGoodList();
    },
    methods:{
        getGoodList(flag){
            var param = {
                page:this.page,
                pageSize:this.pageSize,
                sort:this.sortFlag ? 1:-1,
                priceLevel:this.priceChecked
            }
            this.loading = true;
            axios.get("/goods/list",{params:param}).then((response) =>{
                let res = response.data;
                this.loading = false;
                if(res.status == '0'){
                    if(flag){
                        this.goodsList = this.goodsList.concat(res.result.list);
                        if(res.result.count == 0){
                            this.busy = true;
                        }else{
                            this.busy = false;
                        }
                    }else{
                        this.goodsList = res.result.list;
                        this.busy = false;
                    }
                    
                }else{
                    this.goodsList =[];
                }
            })
        },
        sortDropGoods(){
            this.sortFlag = false;

            this.page = 1;
            this.getGoodList();
        },
        sortRiseGoods(){
            this.sortFlag = true;
            this.page = 1;
            
            this.getGoodList();
        },
        setPriceFilter(index){
            this.priceChecked = index;
            
            this.page = 1;
            this.getGoodList();
        },
        loadMore(){
            this.busy = true;
            setTimeout(() =>{
                this.page++;
                this.getGoodList(true);
            },1000)
        },
        addCart(productId){
            axios.post("/goods/addCart",{
                productId:productId
            }).then((res)=>{

                if(res.data.status == '0'){
                    this.mdShowCart = true;
                }else{
                    this.mdShow = true
                }
            })
        },
        closeModal(){
             this.mdShow = false;
        }
    },
    components:{
      NavHeader,
      NavBread,
      NavBottom,
      Modal
    }
}
</script>

