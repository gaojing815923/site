<template>
<div class="tmpl">
    <div class="section">
        <div class="location">
            <span>当前位置：</span>
            <a href="/index.html">首页</a> &gt;
            <a href="javascript:;">支付中心</a>
        </div>
    </div>
         
    <div  class="section">
        <div  class="wrapper">
            <div  class="bg-wrap">
                <div  class="nav-tit pay">
                    <a  href="javascript:;" class="selected">支付中心</a>
                </div>
                <div  class="form-box payment">
                    <div  class="el-row">
                        <div  class="el-col el-col-16">
                            <div  class="el-row">
                                <div  class="el-col el-col-12">
                                    <dl  class="form-group">
                                        <dt >订 单 号：</dt>
                                        <dd >{{orderinfo.order_no}}</dd>
                                    </dl>
                                </div>
                                <div  class="el-col el-col-12">
                                    <dl  class="form-group">
                                        <dt >收货人姓名：</dt>
                                        <dd >{{orderinfo.accept_name}}</dd>
                                    </dl>
                                </div>
                            </div>
                            <div  class="el-row">
                                <div  class="el-col el-col-12">
                                    <dl  class="form-group">
                                        <dt >送货地址：</dt>
                                        <dd >{{orderinfo.area}}
                                        </dd>
                                    </dl>
                                </div>
                            <div  class="el-col el-col-12">
                                <dl  class="form-group">
                                    <dt >手机号码：</dt>
                                    <dd >{{orderinfo.mobile}}</dd>
                                </dl>
                            </div>
                        </div>
                        <div  class="el-row">
                            <div  class="el-col el-col-12">
                                <dl  class="form-group">
                                    <dt >支付金额：</dt>
                                    <dd >{{orderinfo.order_amount}} 元</dd>
                                </dl>
                            </div>
                            <div  class="el-col el-col-12">
                                <dl  class="form-group">
                                    <dt >支付方式：</dt>
                                    <dd >在线支付</dd>
                                </dl>
                            </div>
                        </div>
                        <div  class="message">
                            <span >备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                            <span >{{orderinfo.message}}</span>
                        </div>
                    </div>
                    <div  class="el-col el-col-8">
                        <div  id="container">
                            二维码图片
                            <canvas width="300" height="300"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
         </div>
        <!--</div> -->  
</div>
</template>

<script>
    // 导入二维码jquery插件
    import '../../../../statics/site/js/jqplugins/qr/jqueryqr.js'

    import kits from '../../../kits/kits.js'
    export default {
        data() {
            return {
                orderid: this.$route.params.orderid,
                orderinfo: {},
                interval: null
            }
        },
        created() {
            this.getorderinfo();
        },
        mounted() {
            var amount = this.$route.params.amount;
            //设置二维码
            $("#container").erweima({
                label: '黑马广州前端支付', //二维码上显示的文字
                text: kits.payurl + '/' + this.orderid + '/' + amount

            });
            //开启定时器每隔5秒执行一次
            this.interval = setInterval(this.checkorderStatus, 5000);
        },
        //离开当前页面应该清楚this.intercal
        beforeDestroy() {
            if (this.interval) {
                //清空
                clearInterval(this.interval);
            }
        },
        methods: {
            checkorderStatus() {
                this.$http.get('/site/validate/order/getorder/' + this.orderid)
                    .then(res => {
                        if (res.data.message[0].status == 2) {
                            this.$router.push({
                                name: 'paysuccesspc'
                            });
                        }
                    });
            },
            getorderinfo() {
                this.$http.get('/site/validate/order/getorder/' + this.orderid)
                    .then(res => {
                        this.orderinfo = res.data.message[0];
                    })
            }
        }
    }
</script>
<style scoped>

</style>