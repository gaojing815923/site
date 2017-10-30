//导入
import Vue from 'vue';
//导包  路由
import vueRouter from 'vue-router';
import App from './App.vue';


//将VueRouter和vue绑定起来
Vue.use(vueRouter);

//导入Vuex 
import vuex from 'vuex'
//将Vuex和vue绑定起来
Vue.use(vuex);

//定义路由规则
//导入 login.vue组件对象 
import login from './components/admin/account/login.vue';
//导入后台管理系统的整体布局组件
import layout from './components/admin/layout.vue';
//导入商品列表组件
import goodslist from './components/admin/goods/goodslist.vue';
//导入商品详情组件
import goodsinfo from './components/admin/goods/goodsinfo.vue';
//导入购物车组件
import car from './components/admin/goods/car.vue';
//导入下单组件
import shopping from './components/admin/goods/shopping.vue';
//导入下单成功的组件
import pay from './components/admin/goods/pay.vue';
//导入下单支付的组件
import payamount from './components/admin/goods/payamount.vue';
//导入下单支付成功的组件
import paysuccess from './components/admin/goods/paysuccess.vue';
var router = new vueRouter({
    routes: [
        { name: 'default', path: '/', redirect: '/site' },
        { name: 'payamount', path: '/site/payamount/:orderid/:amount', component: payamount },
        { name: 'paysuccess', path: '/site/paysuccess', component: paysuccess },
        {
            name: 'layout',
            path: '/site',
            component: layout,
            children: [
                { name: 'login', path: 'login', component: login },
                { name: 'goodslist', path: 'goodslist', component: goodslist },
                { name: 'goodsinfo', path: 'goodsinfo/:goodsid', component: goodsinfo },
                { name: 'car', path: 'car', component: car },
                { name: 'shopping', path: 'shopping/:ids', component: shopping, meta: { islogin: true } },
                { name: 'pay', path: 'pay/:orderid', component: pay, meta: { islogin: true } },
                { name: 'paysuccesspc', path: 'paysuccesspc', component: paysuccess },

            ]
        }
    ]
});


//路由钩子(全局守卫)   在购物车页面准备进入下单页面时，会判断用户是否登录，如果登录就直接跳转到下单页面，如果没有登录，就跳转到登录页面
router.beforeEach((to, from, next) => {
    //在localStorage中记录当前浏览器访问的最后一个路由规则的名称
    if (to.name !== 'login') {
        localStorage.setItem('currentRouteName', to.name);
    }


    if (to.meta.islogin) {
        axios.get('/site/account/islogin').then(res => {
            if (res.data.code == "logined") {
                //登录过   
                next();
            } else {
                // store.dispatch(store.state.global.isloginedFlag, 0);
                // 否则没有登录过  直接跳转到登录页面
                router.push({ name: 'login' });
            }

        })
    } else {
        next();
    }
});
//axios的使用
//导入axios的包
import axios from "axios";
//设定axios的基本url请求前缀
axios.defaults.baseURL = 'http://157.122.54.189:9095';
//将axios对象挂载到vue原型$http上
Vue.prototype.$http = axios;
// 设定axios的参数使得axios发出的ajax请求能够自动带上cookie
axios.defaults.withCredentials = true;
// 使用elementUI这个ui框架
//导包
import elementUI from "element-ui";
//将elementUI和vue绑定起来
Vue.use(elementUI);
//导入elementui的css样式  默认样式
// import 'element-ui/lib/theme-default/index.css';
//自己写的css样式
// import '../src/statics/elementuiCss/index.css';
import '../statics/site/css/style.css';

//使用vuex的四个步骤  state  actions  mutations  getters
// 定义vuex实现购物车数量的改变业务
var state = {
    //购物车中的数据默认是0
    buyCount: 0
}
var actions = {
    changeBuyCount({ commit }, parmsBuyCount) {
        commit('changeBuyCount', parmsBuyCount);
    }
}
var mutations = {
    changeBuyCount(state, parmsBuyCount) {
        state.buyCount += parmsBuyCount
    }
}

import { getItem } from './kits/localStoragekit.js'
var getters = {
    getCount(state) {
        //判断如果state中的buyCount的值>0
        if (state.buyCount > 0) {
            return state.buyCount
        }
        //读取localStorage中的数据统计商品的种类个数返回
        var goodsObj = getItem();
        var count = 0;
        for (var key in goodsObj) {
            count++;
            // console.log(key, goodsObj)
        }
        state.buyCount = count;
        // console.log(count);
        // count计算出来的是购物车中一共加入了几种商品   而不是商品个数的总和
        return state.buyCount;
    }
}

//实例化一个store对象
var store = new vuex.Store({
    state,
    actions,
    mutations,
    getters
});
//过滤器
Vue.filter('datafat', (input, string) => {
    var date = new Date(input);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    if (string == "YYYY - MM - DD") {
        return year + "-" + month + "-" + day;
    } else {
        return year + "-" + month + "-" + day + "  " + hour + ":" + minute + ":" + second;
    }
})

new Vue({
    el: '#app',
    // 使用app这个组件对象
    // es5的写法
    // render:function(create){create(App);}
    router,
    store,
    // es6的写法 :将app当做根组件替换index1.html这个模板中的<div id="app">
    render: create => create(App)
});