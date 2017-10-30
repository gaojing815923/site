<template>
<div class="tmpl">
    <div class="section">
        <div class="location">
            <span>当前位置：</span>
            <a href="/index.html">首页</a> &gt;
            <a href="/cart.html">购物车</a>
        </div>
    </div>
         
    <div class="section">
        <div class="wrapper">
            <div class="bg-wrap">
                <!--购物车头部-->
                <div class="cart-head clearfix">
                    <h2><i class="iconfont icon-cart"></i>我的购物车</h2>
                    <div class="cart-setp">
                        <ul>
                            <li class="first active">
                                <div class="progress">
                                    <span>1</span>
                                    放进购物车
                                </div>
                            </li>
                            <li>
                                <div class="progress">
                                    <span>2</span>
                                    填写订单信息
                                </div>
                            </li>
                            <li class="last">
                                <div class="progress">
                                    <span>3</span>
                                    支付/确认订单
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!--购物车头部-->
                <!--商品列表-->
                
                <div class="cart-box">
                        <!-- {{values}} -->
                    <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                        <tbody>
                            <tr>
                                <th width="40" align="center">
                                    <!-- <el-checkbox v-model="isselectall" @change="allunall"></el-checkbox> -->
                                    <!-- <el-switch on-text="反选" off-text="全选" v-model=" isselectall"
                                    @change="allunall">
                                    </el-switch>    -->
                                    <el-button type="info" size="small" @click="allunall">{{selecttxt}}</el-button>
                                </th>
                                <th align="left">商品信息</th>
                                <th width="84" align="center">单价</th>
                                <th width="104" align="center">数量</th>
                                <th width="104" align="center">金额(元)</th>                            
                                <th width="54" align="center">操作</th>
                            </tr>
                            <!--当list.length<0" 显示出来 -->
                            <tr>
                                <td v-if="list.length<=0" colspan="10">
                                    <div class="msg-tips">
                                        <div class="icon warning"><i class="iconfont icon-tip"></i></div>
                                        <div class="info">
                                            <strong>购物车没有商品！</strong>
                                            <p>您的购物车为空，<a href="/index.html">马上去购物</a>吧！</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <!-- 商品数据信息 -->
                            <tr v-for="(item,index) in list" :key="item.id">
                                <td width="40" align="center">
                                    <!-- <el-checkbox v-model="values[index]"></el-checkbox> @change="itemchange"-->
                                    <el-switch on-text="反选" off-text="全选" v-model="values[index]"
                                    @change="itemchange">
                                    </el-switch>   
                                </td>
                                <td class="img_text">
                                    <img height="50" width="50" :src="item.img_url" alt="">
                                    <span align="center"  valign="middle" v-text="item.title"></span>    
                                </td>
                                <td align="center">{{item.sell_price}}</td>
                                <td align="center">
                                    <myinput @update="update" :options="{gid:item.id,count:item.buycount}"></myinput>    
                                </td>
                                <td align="center">{{item.sell_price*item.buycount}}</td>
                                <td align="center"><el-button type="info" size="small" @click="deldata(item.id)">删除</el-button></td>
                            </tr>
                            <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{selectCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{selletmentAmount}}</b>元
                                    </th>
                                </tr>
                        </tbody>
                    </table>
                </div>
                <!--/商品列表-->
                <!--购物车底部-->
                <div class="cart-foot clearfix">
                    <div class="right-box">
                        <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                        <!-- <router-link to="/site/shopping"> -->
                            <button class="submit" @click="toshopping">立即结算</button>
                        <!-- </router-link>     -->
                    </div>
                </div>
                <!--购物车底部-->
            </div>
        </div>
    </div>
        
</div>
</template>

<script>
    import {
        getItem,
        remoteItem,
        updageItem
    } from '../../../kits/localStoragekit.js';
    //导入myinputNumber.vue的组件   myinput的名字是自己定义的
    import myinput from '../../subcom/myinputNumber.vue';
    export default {
        // 注册组件
        components: {
            myinput
        },
        data() {
            return {
                selecttxt: '全选',
                isselectall: false,
                selectCount: 0,
                //这个数组中的下标的值绑定到表格中的每一行复选框中
                values: [],
                //存储商品列表
                list: []
            }
        },
        created() {
            this.getcarlist();
        },
        computed: {
            selletmentAmount() {
                var trueArr = this.values.filter(function(item) {
                    return item
                });

                // 如果values中的值发生改变不能触发的话，就通过push和pop来改变一下数组的长度，但是不影响到数据中的原来值
                // 栈：先进后出
                // this.values.push(false);
                // this.values.pop();

                this.selectCount = trueArr.length;


                //计算商品的总价格
                //先定义一个总和
                var totalAmount = 0
                this.values.forEach((item, index) => {
                    if (item) {
                        var goodsInfo = this.list[index];
                        // console.log(this.list[index]);
                        totalAmount += (goodsInfo.sell_price * goodsInfo.buycount)
                            // console.log(totalAmount);
                    }
                })
                return totalAmount;
            }
        },
        methods: {
            //单机下单结算时 触发的事件
            toshopping() {
                //  1.0 获取当前购物车表格中选中的商品id
                var ids = '';
                var idsArr = [];
                this.values.forEach((item, index) => {
                    if (item) {
                        idsArr.push(this.list[index].id);
                    }
                })

                ids = idsArr.join(',');
                // 2.0 将这些商品id以逗号分隔的形式传递到/site/shopping/:ids
                // params:将ids的值传递到路由规则shopping的ids参数中
                this.$router.push({
                    name: 'shopping',
                    params: {
                        ids: ids
                    }
                });
            },
            //删除商品数据
            deldata(goodsid) {
                // 删除this.list中这个商品数据
                var index = -1;
                index = this.list.findIndex(function(item) {
                    return item.id == goodsid
                });
                this.list.splice(index, 1);
                // 删除 this.values中的这个商品对应的索引下面的数据
                this.values.splice(index, 1);
                // 删除localStorage中的这个商品数据
                remoteItem(goodsid);

            },
            // 当myinputNumber.vue中触发的事件以后就会自动触发update方法的执行，同时将obj传入
            // obj的格式：{gid:商品的id,count:修改以后的值}
            update(obj) {
                this.list.forEach(item => {
                    if (item.id == obj.gid) {
                        item.buycount = obj.count;
                    }
                });
                // 修改localStorage中的当前商品的数量
                updageItem({
                    gid: obj.gid,
                    count: obj.count
                });
                // 由于通过js代码修改的计算属性selletmentAmount方法中依赖的list中的某个属性的值是不会触发计算属性方法的重新执行的
                this.list.push('');
                this.list.pop();
            },
            //全选和反选
            allunall() {
                this.isselectall = !this.isselectall;
                // console.log('this.isselectall')
                if (this.isselectall) {
                    this.selecttxt = '反选';
                } else {
                    this.selecttxt = '全选';
                }
                console.log(this.isselectall)
                    //遍历values将所有的值用this.isselectall的值赋值
                for (var i = 0; i < this.values.length; i++) {
                    this.values[i] = this.isselectall;
                    // this.isselectall = this.values[i]
                    // console.log(this.values[i]);
                }
                this.values.push(false);
                this.values.pop();
            },
            itemchange(isselected) {
                if (!isselected) {
                    //文字变成全选
                    this.isselectall = false;
                    //修改文字
                    this.selecttxt = '全选';
                }
            },
            //获取购物车列表
            getcarlist() {
                // 从localStorage中获取商品的id
                var goodsObj = getItem();
                console.log(goodsObj);
                //遍历goodsObj中的所有数据中的键变成一个字符串用逗号分隔
                var idArr = [];
                for (var key in goodsObj) {
                    //吧key 添加到idArr中
                    idArr.push(key);
                }
                var ids = idArr.join(',');
                this.$http.get('/site/comment/getshopcargoods/' + ids)
                    .then(res => {
                        this.list = res.data.message;
                        // console.log(res.data.message);

                        // 初始化返货的数组个数初始化values数组的个数， 值全部都是false
                        var goodsObj = getItem();
                        this.list.forEach((item, index) => {
                            // this.values[index] = this.isselectall;
                            this.values.push(false);
                            // this.values.push(false);
                            //将当前商品的数量赋值给接口中返回的buycount
                            item.buycount = goodsObj[item.id];
                        });

                    })

            }
        }
    }
</script>
<style scoped>

</style>