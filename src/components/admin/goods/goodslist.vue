<template>
<div class="tmpl">
   <div class="section">
      <div class="location">
          <span>当前位置：</span>
          <a href="/index.html">首页</a> &gt;
          <a href="/goods.html">购物商城</a>
      </div>
   </div>
   <div class="section">
    <div class="wrapper">
        <div class="wrap-box">
            <!--类别菜单-->
            <div class="left-220" style="margin:0;">
                <div class="banner-nav">
                    <ul>
                    <!--此处声明下面可重复循环-->
                     
                        <li v-for="(item,index) in ginfo.catelist" :key="index">
                            <h3>
                                <i class="iconfont icon-arrow-right"></i>
                                <span v-text="item.title"></span>
                                <p>
                                   <span v-for="subitem in item.subcates" :key="subitem.id">
                                        {{subitem.title}} &nbsp;
                                   </span>
                                </p>
                            </h3>
                            <div class="item-box">
                                <!--如有三级分类，此处可循环-->
                                <dl>
                                    <dt><a href="/goods/40.html">{{item.title}}</a></dt>
                                    <dd>
                                        <a v-for="subitem in item.subcates" href="/goods/43.html">{{subitem.title}}</a>
                                    </dd>
                                </dl>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!--/类别菜单-->
             
            <!--幻灯片-->
            <div class="left-705">
                <div class="banner-img">
                    <div id="focus-box" class="focus-box">
                         <el-carousel :interval="5000" arrow="always">
                             <el-carousel-item v-for="item in ginfo.sliderlist" :key="item.id">
                                 <img height="340" :src="item.img_url" alt="">
                                    <h3 v-text="item.title"></h3>
                             </el-carousel-item>
                        </el-carousel>
                    </div>
                </div>
            </div>
            <!--/幻灯片-->
             
            <!--推荐商品-->
            <div class="left-220">
                <ul class="side-img-list">
                    <li v-for="(item,index) in ginfo.toplist" :key="index">
                        <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                        <div class="img-box">
                            <label>{{index+1}}</label>
                            
                            <img :src="item.img_url">
                            
                        </div>
                        <div class="txt-box">
                            <a href="/goods/show-98.html">{{item.title}}</a>
                            <span>{{item.add_time | datafat('YYYY-MM-DD')}}</span>
                        </div>
                        </router-link>
                    </li>
                </ul>
            </div>
            <!--/推荐商品-->
            
        </div>
    </div>
   </div>
   <div class="section">
                <div v-for="(item,index) in clist" :key="index">
                 <!--子类-->
                    <div class="main-tit">
                        <h2 v-text="item.catetitle"></h2>
                         <p>
                           <a v-for="subitem in item.level2catelist" :key="subitem.subcateid"
                              href="/goods/43.html">{{subitem.subcatetitle}}</a>
                           <a href="/goods/40.html">更多
                             <i>+</i>
                           </a>
                         </p>
                    </div>
              
                 <!--/子类-->
                    <div class="wrapper clearfix">
                       <div class="wrap-box">
                          <ul class="img-list">
                             <li v-for="ditem in item.datas" key="item.artID">
                                 <router-link v-bind="{to:'/site/goodsinfo/'+ditem.artID}">
                                <a href="/goods/show-91.html">
                                   <div class="img-box">
                                      
                                          <img :src="ditem.img_url">
                                     
                                   </div>
                                   <div class="info">
                                      <h3 v-text="ditem.artTitle"></h3>
                                      <p class="price"><b>¥{{ditem.sell_price}}</b>元</p>
                                      <p><strong>库存 {{ditem.stock_quantity}}</strong> <span>市场价：<s v-text="ditem.market_price"></s> </span>
                                      </p>
                                   </div>
                                </a>
                                 </router-link>
                             </li>
                          </ul>
                       </div>
                    </div>
                </div>
            </div> 
</div>
</template>

<script>
    export default {
        data() {
            return {
                ginfo: {},
                clist: []
            }
        },
        created() {
            this.getginfo();
            this.getclist();
        },
        methods: {
            getginfo() {
                this.$http.get('/site/goods/gettopdata/goods')
                    .then(res => {
                        this.ginfo = res.data.message;
                    })
            },
            getclist() {
                this.$http.get('/site/goods/getgoodsgroup')
                    .then(res => {
                        this.clist = res.data.message;
                    })
            }
        }
    }
</script>
<style>
    /*设置轮播图的高度*/
    
    .el-carousel__container {
        height: 342px;
        border: 1px solid #ccc;
        border-left: none;
        overflow: hidden;
    }
    
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 40px;
        margin: 0;
    }
</style>