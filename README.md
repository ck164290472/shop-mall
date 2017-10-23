# 前端工具
* Vue2.0
* Vue-Router
* axios
# 后端工具
* express
* mongodb
# 目录结构
> build 

> config

> server  |服务器端文件

>> bin

>>> www   ——服务器启动文件

>> db   ——mongodb数据库文件

>> models   ——数据库模型

>> public  ——公共资源

>> routes  ——后端路由

>> uitl  ——存放工具类

>> views  ——视图

>> app.js  ——服务器入口文件

> src 前端文件

>> assets ——静态资源文件

>>> css ——存放css文件

>>> imgs ——存放静态图片

>> components  ——组件

>>> Header.vue 头部组件

>>> Modal.vue 二次确认框

>>> NavBottom.vue 底部组件

>>> NavBread.vue 面包屑组件

>> router ——前端路由

>> util ——前端工具类文件夹

>>> currency.js ——价格过滤

>> views ——前端页面

>>> Address.vue ——地址页面

>>> Cart.vue ——购物车页面

>>> GoodsList.vue ——商品列表页

>>> OrderConfirm.vue ——订单页面

>>> OrderSuccess.vue ——订单成功页面


# 运行环境
* Node.js 
* mongoDB
安装完成后启动数据库

# 安装前端依赖
npm install

# 启动mongodb服务器
在你安装的数据库文件中的bin目录启动
mongod

# 启动后端服务器
进入server目录中的bin目录
node www


# shopping-mall

> main.js

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
