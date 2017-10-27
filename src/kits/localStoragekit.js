//localStorage中的key
const key = 'buyGoodsCount';


//存储方法
export function setItem(goodsinfo) {
    //判断localStorage中是否有这个商品的记录
    //如果有就更新数量，否则就追加新的记录
    var goodsObj = getItem();

    //判断goodsinfo.gid是否在goodsObj中
    //goodsinfo：{gid:88,bcount:1}    goodsinfo.bcount的值就是1
    //产品的id号   后面的是 该id的商品有多少个
    // goodsObj:{88:1}
    // goodsObj[goodsinfo.gid]  ====>   goodsObj[88](因为88是一个number类型，要想得到里面key的值  就要写成goodsObj[88]等价于goodsObj.88)

    if (goodsObj[goodsinfo.gid]) {
        //吧新的数据追加到原来的数据里面
        goodsObj[goodsinfo.gid] = goodsObj[goodsinfo.gid] + goodsinfo.bcount;
    } else {
        //如果不在的话   就把数据的值直接追加上去就可以了
        goodsObj[goodsinfo.gid] = goodsinfo.bcount;

    }
    // 将修改以后的goodsObj的值设置回到localStoreage中
    localStorage.setItem(key, JSON.stringify(goodsObj))
}

//获取方法
export function getItem() {
    var gStr = localStorage.getItem(key);
    //将字符串转换成js对象
    var obj = JSON.parse(gStr);
    //如果obj是null的话返回一个{}
    if (!obj) {
        localStorage.setItem(key, JSON.stringify('{}'))
        return {};
    }
    return obj;
}
//删除方法
export function remoteItem(goodsid) {
    //获取值
    var goodsObj = getItem();

    //删除goodsObj中的数据
    delete goodsObj(goodsid);

    //重新设置localStorage
    localStorage.setItem(key, JSON.stringify(goodsObj));
}