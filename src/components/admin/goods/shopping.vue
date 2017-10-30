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
                    <li class="active">
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
          <div class="cart-box">
            
            <div class="shoping">
                <h2 class="slide-tit">
                    <span>1、收货地址</span>
                </h2>
                <el-form :model="form" :rules="rules" ref="ruleform">
                  <div class="form-box address-info">
                      <el-form-item label="收货人姓名" prop="accept_name">
                          <el-input v-model="form.accept_name"></el-input>
                      </el-form-item>
                      <el-form-item label="所属地区">
                          <v-distpicker @selected="getarea"></v-distpicker>
                      </el-form-item>
                      <el-form-item label="详细地址" prop="address">
                          <el-input v-model="form.address"></el-input>
                      </el-form-item>
                      <el-form-item label="手机号码" prop="mobile">
                          <el-input v-model="form.mobile"></el-input>
                      </el-form-item>
                      <el-form-item label="电子邮箱" prop="email">
                          <el-input v-model="form.email"></el-input>
                      </el-form-item>
                      <el-form-item label="邮政编码" prop="post_code">
                          <el-input v-model="form.post_code"></el-input>
                      </el-form-item>
                  </div>
                  <h2 class="slide-tit">
                    <span>2、支付方式</span>
                  </h2>
                  <ul class="item-box clearfix">
                    <!--取得一个DataTable-->
                    <li>
                      <label>
                          <el-radio class="radio" v-model="form.payment_id" label="6">在线支付</el-radio>
                        <em>手续费：0.00元</em>
                      </label>
                    </li>
                  </ul>
                  <h2 class="slide-tit">
                    <span>3、配送方式</span>
                  </h2>
                  <ul class="item-box clearfix">
                    <!--取得一个DataTable-->                                    
                    <li>
                        <el-radio-group class="item-box clearfix" v-model="form.express_id" @change="expressChange">
                            <el-radio :label="item.id" v-for="item in expresslist" :key="item.id">{{item.title}}&nbsp;&nbsp;
                                <em>费用：{{item.express_fee}}元</em>
                            </el-radio>
                        </el-radio-group>
                    </li>
                  </ul>
                  <h2 class="slide-tit">
                    <span>4、商品清单</span>
                  </h2>
                  <div class="line15"></div>
                  <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                    <tbody>
                      <tr>
                        <th colspan="2" align="left">商品信息</th>
                        <th width="84" align="left">单价</th>                                  
                        <th width="84" align="center">购买数量</th>
                        <th width="104" align="left">金额(元)</th>                    
                      </tr>
                      <tr v-for="item in goodslist">
                        <td width="68">
                          <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                            <img :src="item.img_url" class="img">
                        </router-link>
                        </td>
                        <td>
                            <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                                {{item.title}}
                            </router-link>
                        </td>
                        <td>
                          <span class="red">￥{{item.sell_price}}</span>
                        </td>
                        <td align="center">{{item.buyCount}}</td>
                        <td>
                          <span class="red">
                          ￥{{item.sell_price*item.buyCount}}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="line15"></div>
                  <h2 class="slide-tit">
                    <span>5、结算信息</span>
                  </h2>
                  <div class="buy-foot clearfix">
                    <div class="left-box">
                      <dl>
                        <dt>订单备注(100字符以内)</dt>
                        <dd>
                          <textarea v-model="form.message" name="message" class="input" style="height:35px;"></textarea>
                        </dd>
                      </dl>
                    </div>
                    <div class="right-box">
                      <p>
                      商品 <label class="price">{{goodslist.length}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp;
                      商品金额：￥<label id="goodsAmount" class="price">{{form.goodsAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                      </p>
                      <p>
                      运费：￥<label id="expressFee" class="price">{{currentFee}}</label> 元
                      </p>
                      <p class="txt-box">
                      应付总金额：￥<label id="totalAmount" class="price">{{totalAmount}}</label>
                      </p>
                      <p class="btn-box">
                        <a class="btn button" href="/cart.html">返回购物车</a>
                        <input type="button" value="确认提交" class="btn submit" @click="submitForm">
                      </p>
                    </div>
                  </div>
                </el-form>
            </div>
          </div>
        </div>
        </div>
      </div>
  </div>
        
</div>
</template>

<script>
    import {
        getItem
    } from '../../../kits/localStoragekit.js'
    //导入三级联动插件组件
    import VDistpicker from 'v-distpicker'
    export default {
        components: {
            VDistpicker
        },
        data() {
            var checkmobile = (rule, value, callback) => {
                var reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
                if (!reg.test(value)) {
                    return callback(new Error('手机号码格式错误'));
                }
                callback();
            };
            var checkemail = (rule, value, callback) => {
                var reg = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z0-9]{2,5}$/;
                if (!reg.test(value)) {
                    return callback(new Error('邮箱格式错误'));
                }
                callback();
            };
            var checkpost_code = (rule, value, callback) => {
                var reg = /^[1-9][0-9]{5}$/;
                if (!reg.test(value)) {
                    return callback(new Error('邮编格式错误'));
                }
                callback();
            };
            return {
                expresslist: [], //配送方式
                goodslist: [], //商品清单
                ids: this.$route.params.ids, //获取从购物车中传过来的id号
                currentFee: 20, //当前运费
                form: {
                    accept_name: '', //收货人姓名
                    area: {}, //所属地区
                    address: '', //收货人地址
                    mobile: '', //手机号码
                    email: '', //电子邮箱
                    post_code: '', //邮政编码
                    radio: '1', //支付方式
                    currentFee: 20, //当前的运费
                    express_id: 1, //快递方式的id
                    message: '', //备注信息
                    goodsAmount: 0, //计算商品清单的总价格
                    totalAmount: 0, //商品总价+运费的总价格
                    expressMoment: 0, //当前表单的运送方式
                    cargoodsobj: {}, //结算选中购物车中的商品
                    // ids: this.$route.params.ids, //获取从购物车中传过来的id号

                },
                rules: {
                    accept_name: [{
                        required: true,
                        message: '请输入收货人姓名',
                        trigger: 'blur'
                    }],
                    address: [{
                        required: true,
                        message: '请输入收货人详细地址',
                        trigger: 'blur'
                    }],
                    mobile: [{
                        validator: checkmobile,
                        trigger: 'blur'
                    }],
                    email: [{
                        validator: checkemail,
                        trigger: 'blur'
                    }],
                    post_code: [{
                        validator: checkpost_code,
                        trigger: 'blur'
                    }]
                }
            }
        },
        created() {
            this.getexpresslist();
            this.getgoodslist();
            this.form.goodsids = this.$route.params.ids;

            this.form.cargoodsobj = getItem();
        },
        computed: {
            totalAmount() {
                var amount = this.form.goodsAmount + this.currentFee;
                return amount;
            }
        },
        methods: {
            //表单验证
            submitForm() {
                this.$refs.ruleform.validate((valid) => {
                    if (valid) {
                        //提交表单数据到服务器，完成下单操作
                        console.log(this.form);
                        this.$http.post('/site/validate/order/setorder', this.form)
                            .then(res => {
                                this.$message.success({
                                    //下单成功后的提醒
                                    message: '下单成功',
                                    duration: 1000, //间隔1s在跳转
                                    onClose: () => {
                                        this.$router.push({
                                            name: 'pay',
                                            params: {
                                                orderid: res.data.message.orderid
                                            }
                                        });
                                    }
                                });
                            });
                    } else {
                        console.log('表单验证失败！');
                        return false;
                    }
                });
            },
            //选择快递方式触发的事件  expressid是当前选中快递方式的id号
            expressChange(expressid) {
                //将expressid赋值给this.form.express_id
                // this.express_id = expressid;
                //获取当前选中的运送方式
                var newArr = this.expresslist.filter(function(item) {
                    return item.id == expressid
                });
                this.form.expressMoment = this.currentFee = newArr[0].express_fee;
            },
            //获取商品清单的列表
            getgoodslist() {
                this.$http.get('/site/comment/getshopcargoods/' + this.ids)
                    .then(res => {
                        this.goodslist = res.data.message;
                        console.log(res.data.message);

                        //遍历this.goodslist 根据其中的商品id获取localStorage中的购买数量赋值给goodslist这个商品的buyCount

                        var goodsObj = getItem();
                        this.goodslist.forEach(item => {
                            item.buyCount = goodsObj[item.id];
                            this.form.goodsAmount += (item.sell_price * item.buyCount)
                        });

                    });
            },

            //获取快递的方式的列表
            getexpresslist() {
                //先把快递的列表获取出来
                this.$http.get('/site/validate/order/getexpresslist')
                    .then((res) => {
                        this.expresslist = res.data.message;
                        // console.log(res.data.message);
                    })

            },
            //选择省、市、县 三级联动
            getarea(data) {
                // data格式：   这是选择框中显示的默认值
                /*
                {
                    province:{
                       code: "440000"
                       value:"广东省"
                    }
                    city:{
                         code: "440001"
                       value:"广州"
                    }
                    area:{
                         code: "440002"
                         value:"天河区"
                    }
                }
                */
                // console.log(data);
                this.form.area = data;
            }
        }
    }
</script>
<style scoped>

</style>