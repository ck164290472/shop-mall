var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');
mongoose.connect('mongodb://localhost:27017/shop',function(err){
    if(err){
        console.log('数据库链接失败');
    }else{
        console.log('数据库链接成功');
    }
});
router.get('/list',function(req,res,next){
    let page = parseInt(req.param("page"));
    let pageSize = parseInt(req.param("pageSize"));
    let sort = req.param("sort");
    let priceLevel = req.param('priceLevel');
    var priceGt = '',priceLte = '';
    let params = {};
    console.log("priceLevel"+priceLevel);
    if(priceLevel !='all'){
        switch(priceLevel){
            case '0':priceGt = 0;priceLte=100;break;
            case '1':priceGt = 100;priceLte=500;break;
            case '2':priceGt = 500;priceLte=1000;break;
            case '3':priceGt = 1000;priceLte=5000;break;
        }
        params = {
            prodcutPrice:{
                $gt:priceGt,
                $lte:priceLte
            }
        }
    }
    let skip = (page-1)*pageSize;
    
    
    let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
    goodsModel.sort({'prodcutPrice':sort});
    goodsModel.exec(function(err,doc){
        if(err){
            res.json({
                status:'1',
                msg:err.message
            });
        }else{
            res.json({
                status:'0',
                msg:'',
                result:{
                    count:doc.length,
                    list:doc
                }
            })
        }
    });
});
//加入购物车
router.post('/addCart',function(req,res,next){
    var userId = '100000077',productId = req.body.productId;
    var User = require('../models/user');
    User.findOne({
        userId:userId
    },function(err1,userDoc){
        if(err1){
            res.json({
                status:"1",
                msg:err1.message
            })
        }else{
            if(userDoc){
                let goodsItem = '';
                userDoc.cartList.forEach(function (item){
                    if(item.productId == productId){
                        goodsItem = item;
                        item.productNum ++;
                    }
                });
                if(goodsItem){
                    userDoc.save(function(err,doc2){
                        if(err){
                            res.json({
                                status:"1",
                                msg:err.message
                            })
                        }else{
                            res.json({
                                status:"0",
                                msg:'',
                                result:'suc'
                            })
                        }
                    })
                }else{
                    Goods.findOne({productId:productId},function(err,doc){
                        if(err){
                            res.json({
                                status:"1",
                                msg:err.message
                            })
                        }else{
                            if(doc){
                                doc.productNum = 1;
                                doc.checked = 1;
                                userDoc.cartList.push(doc);
                                userDoc.save(function(err2,doc2){
                                    if(err2){
                                        res.json({
                                            status:"1",
                                            msg:err2.message
                                        })
                                    }else{
                                        res.json({
                                            status:"0",
                                            msg:'',
                                            result:'suc'
                                        })
                                    }
                                })
                            }
                        }
                    })
                }
               
            }
        }
    })
})
module.exports = router;