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
                        <input name="payment_id" type="radio" onclick="paymentAmountTotal(this);" value="1">
                        <input name="payment_price" type="hidden" value="0.00">在线支付
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
                      <label>                                            
                        <input name="express_id" type="radio" onclick="freightAmountTotal(this);" value="1" datatype="*" sucmsg=" ">
                        <input name="express_price" type="hidden" value="20.00">顺丰快递
                        <em>费用：20.00元</em>
                        <span class="Validform_checktip"></span>
                      </label>
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
                      <tr>
                        <td width="68">
                          <a target="_blank" href="/goods/show-89.html">
                            <img src="/upload/201504/20/thumb_201504200119256512.jpg" class="img">
                          </a>
                        </td>
                        <td>
                          <a target="_blank" href="/goods/show-89.html">小米（Mi）小米Note 16G双网通版</a>
                        </td>
                        <td>
                          <span class="red">
                            ￥2299.00
                          </span>
                        </td>
                        <td align="center">1</td>
                        <td>
                          <span class="red">
                          ￥2299.00
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
                          <textarea name="message" class="input" style="height:35px;"></textarea>
                        </dd>
                      </dl>
                    </div>
                    <div class="right-box">
                      <p>
                      商品 <label class="price">1</label> 件&nbsp;&nbsp;&nbsp;&nbsp;
                      商品金额：￥<label id="goodsAmount" class="price">2299.00</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                      </p>
                      <p>
                      运费：￥<label id="expressFee" class="price">0.00</label> 元
                      </p>
                      <p class="txt-box">
                      应付总金额：￥<label id="totalAmount" class="price">2299.00</label>
                      </p>
                      <p class="btn-box">
                        <a class="btn button" href="/cart.html">返回购物车</a>
                        <input id="btnSubmit" name="btnSubmit" type="submit" value="确认提交" class="btn submit">
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
                form: {
                    accept_name: '', //收货人姓名
                    area: '', //所属地区
                    address: '', //收货人地址
                    mobile: '', //手机号码
                    email: '', //电子邮箱
                    post_code: '', //邮政编码
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
        methods: {
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