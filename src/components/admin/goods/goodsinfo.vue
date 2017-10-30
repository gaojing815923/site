<template>
<div class="tmpl">
  <!-- 导航栏 -->
   <div class="section">
      <div class="location">
         <span>当前位置：</span>
         <a href="/index.html">首页</a> &gt;
         <a href="/goods.html">购物商城</a>
         <a href="/goods/42/1.html">商品详情</a>
 
      </div>
   </div>
 
   <!-- 商品详情 -->
   <div class="section" v-if="ginfo.goodsinfo">
      <div class="wrapper clearfix">
          <div class="wrap-box">
             <!--页面左边-->
             <div class="left-925">
                <div class="goods-box clearfix">
                    <!--商品图片-->
                       <div class="pic-box">
                            <div class="magnifier" id="magnifier1">
                                <div class="magnifier-container">
                                    <div class="images-cover">
                                        <!-- <img :src="ginfo.imglist.thumb_path" alt="" /> -->
                                    </div>
                                    <!--当前图片显示容器-->
                                    <div class="move-view">
                                            <!-- <img :src="ginfo.imglist.thumb_path" alt="" /> -->
                                    </div>
                                    <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                    <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li  v-for="item in ginfo.imglist" :key="item.id">
                                                    <div class="small-img">
                                                        <img :src="item.original_path" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                               </div> 

                       </div>
                    <!--/商品图片-->
 
                    <!--商品信息-->
                    <div class="goods-spec">
                        <h1 v-text="ginfo.goodsinfo.title"></h1>
                        <p class="subtitle" v-text="ginfo.goodsinfo.sub_title"></p>
                        <div class="spec-box">
                        <dl>
                            <dt>货号</dt>
                            <dd id="commodityGoodsNo" v-text="ginfo.goodsinfo.goods_no"></dd>
                        </dl>
                        <dl>
                           <dt>市场价</dt>
                           <dd>
                              <s id="commodityMarketPrice">¥{{ginfo.goodsinfo.market_price}}</s>
                           </dd>
                        </dl>
                        <dl>
                            <dt>销售价</dt>
                               <dd>
                                  <em class="price" id="commoditySellPrice">¥{{ginfo.goodsinfo.sell_price}}</em>
                               </dd>
                        </dl>
                    </div>
 
                    <div class="spec-box">
                       <dl>
                         <dt>购买数量</dt>
                          <dd>
                            <div class="stock-box">
                                <el-input-number v-model="buyCount" :min="1">
                                </el-input-number>
                            </div>
                            <span class="stock-txt">
                               库存
                                <em id="commodityStockNum">{{ginfo.goodsinfo.stock_quantity}}</em>件
                            </span>
                          </dd>
                       </dl>
                       <dl>
                         <dd>
                            <div class="btn-buy" id="buyButton">
                               <button class="buy" >立即购买</button>
                               <button class="add" @click="addCar">加入购物车</button>
                            </div>
                         </dd>
                       </dl>
                    </div>
 
                </div>
            <!--/商品信息-->
          </div>
 
          <div id="goodsTabs" class="goods-tab bg-wrap">
             <!--选项卡-->
             <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                 <ul>
                    <li>
                        <a v-bind="{class:isContent?'selected':''}" href="javascript:;" @click="changeIsContent(true)">商品介绍</a>
                    </li>
                    <li>
                       <a v-bind="{class:isContent?'':'selected'}" href="javascript:;" @click="changeIsContent(false)">商品评论</a>
                    </li>
                 </ul>
             </div>
             <!--/选项卡-->
 
             <!--选项内容-->
             <div v-if="isContent">
                <span v-html="ginfo.goodsinfo.content" ></span>
             </div>
 
             <div v-if="!isContent">
                 <!--网友评论-->
                 <div class="comment-box">
                   <!--取得评论总数-->
                    <form id="commentForm" name="commentForm" class="form-box" url="/tools/submit_ajax.ashx?action=comment_add&amp;channel_id=2&amp;article_id=98">
                        <div class="avatar-box">                                    
                            <i class="iconfont icon-user-full"></i>                                    
                        </div>
                        <div class="conn-box">
                            <div class="editor">
                                <textarea id="txtContent" v-model="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                <span class="Validform_checktip"></span>
                            </div>
                            <div class="subcon">
                                <input id="btnSubmit" name="submit" type="button" value="提交评论" class="submit" @click="submitComment">
                                <span class="Validform_checktip"></span>
                            </div>
                        </div>
                    </form>
                    <ul id="commentList" class="list-box">
                        <p v-if="commentList.length<=0" style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>
                        <li v-for="item in commentList" :key="item.id">
                            <div class="avatar-box">
                                <i class="iconfont icon-user-full"></i>
                            </div>
                            <div class="inner-box">
                                <div class="info">
                                    <span v-text="item.user_name"></span>
                                    <span>{{item.add_time |datafat('YYYY - MM - DD')}}</span>
                                </div>
                                <p v-text="item.content"></p>
                            </div>
                        </li>
                    </ul>
                   <!--放置页码-->
                    <div class="page-box" style="margin:5px 0 0 62px">
                        <el-pagination
                        @size-change="pageSizeChange"
                        @current-change="pageIndexChange"
                        :current-page="pageIndex"
                        :page-sizes="[1,5,10, 20, 50, 100,200]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalCount">
                      </el-pagination>
                    </div>
                    <!--/放置页码-->
             </div>
 
             <!--/网友评论-->
          </div>
 
       </div>
 
    </div>
<!--/页面左边-->
 
    <!--页面右边-->
    <div class="left-220">
        <div class="bg-wrap nobg">
            <div class="sidebar-box">
                <h4>推荐商品</h4>
                <ul class="side-img-list">
                    
                    <li v-for="item in ginfo.hotgoodslist" :key="item.id">
                      <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                        <div class="img-box">
                           
                                <img :src="item.img_url">
                           
                        </div>
                        <div class="txt-box">
                            {{item.title}}
                            <span>{{item.add_time | datafat('YYYY - MM - DD')}}</span>
                        </div>
                    </router-link>
                    </li>
    
                </ul>
            </div>
        </div>
    </div>
    <!--/页面右边-->
</div>
</div>
</div>

</div>
</template>

<script>
    // 按需导入iview这个框架中的affix组件
    import Affix from 'iview/src/components/affix';
    //导入vm
    import {
        vm,
        key
    } from '../../../kits/vm.js'

    //导入localStorage.js
    import {
        setItem
    } from '../../../kits/localStoragekit.js'
    // 导入jquery插件文件
    import '../../../../statics/site/js/jqplugins/imgzoom/magnifier.js';
    export default {
        //定义私有的Affix组件
        components: {
            Affix
        },

        data() {
            return {
                buyCount: 0,
                //用来控制商品详情和评论tab栏的切换
                isContent: true,
                txtContent: '', //提交评论内容
                pageIndex: 1, //当前的页码
                pageSize: 5, //每页显示多少条评论信息
                totalCount: 0, //共有多少条评论信息
                commentList: [],
                ginfo: {}
            }
        },
        created() {
            this.getInfo();
            this.getCommentList();
        },
        watch: {
            //当URL的参数发生改变的时候，会触发这个watch会重新执行
            '$route': function() {
                //当触发这个事件就重新获取最新数据
                this.getInfo();
            }
        },
        methods: {
            //点击加入购物车时触发
            addCar() {
                //通过导入 vm.js来触发事件  给购物车里面添加商品数据
                // vm.$emit(key, this.buyCount);

                //通过vuex来触发事件  给购物车里面添加商品数据
                this.$store.dispatch('changeBuyCount', this.buyCount);
                //将商品id和当前购买数量存储到localStorage中
                setItem({
                    gid: this.$route.params.goodsid,
                    bcount: this.buyCount
                });
                // console.log(setItem());
            },

            //给页面上的添加数量 添加事件，来测试数值是否会改变
            // buyCountChange(count) {
            //     console.log(this.buyCount)
            // },

            //单机某个页码是，触发的事件
            pageIndexChange(val) {
                this.pageIndex = val;
                this.getCommentList();
            },
            //当用户选择每页显示多少条数据的时候触发
            pageSizeChange(val) {
                this.pageSize = val;
                //刷新评论
                this.getCommentList();

            },
            // 分页获取当前商品的评论信息
            getCommentList() {
                var goodsid = this.$route.params.goodsid;
                console.log('当前商品的id号：' + goodsid)
                this.$http.get('/site/comment/getbypage/goods/' + goodsid + '?pageIndex=' + this.pageIndex + '&pageSize=' + this.pageSize)
                    .then(res => {

                        this.commentList = res.data.message;

                        this.totalCount = res.data.totalcount;
                        console.log(typeof res.data.totalcount);
                        // this.commentList = res.data.message;

                        // // 分页组件的总条数变量赋值
                        // this.totalCount = res.data.totalcount;

                    })
            },
            //提交评论
            submitComment() {
                if (this.txtContent.length <= 0) {
                    this.$message.error("要填写评论信息的！");
                    return;
                }
                //通过URL获取传入商品的id
                var goodsid = this.$route.params.goodsid;
                this.$http.post('/site/validate/comment/post/goods/' + goodsid, "commenttxt=" + this.txtContent)
                    .then(res => {
                        this.txtContent = '';
                        //刷新评论数据
                        this.getCommentList();
                    })
            },
            //用来控制商品详情和评论tab栏的切换
            changeIsContent(iscontent) {
                this.isContent = iscontent;
            },
            //读取数据
            getInfo() {
                //通过URL获取传入商品的id
                var goodsid = this.$route.params.goodsid;
                //请求当前商品信息的详细信息
                this.$http.get('/site/goods/getgoodsinfo/' + goodsid)
                    .then(res => {

                        this.ginfo = res.data.message;

                        setTimeout(() => {
                            $('#magnifier1').imgzoon({
                                magnifier: '#magnifier1'
                            });
                        }, 100);
                    })

            }
        }
    }
</script>
<style scoped>
    /* 导入jquery组件的css样式 */
    
    @import url('../../../../statics/site/js/jqplugins/imgzoom/css/magnifier.css')
</style>