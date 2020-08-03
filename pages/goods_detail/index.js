import {
  request
} from "../../request/index.js"
Page({
  data: {
    goodsObj: {},
    // isCollect: false
  },
  GoodsInfo: {},
  onLoad: function (options) {
    // let pages = getCurrentPages();
    // let currentPage = pages[pages.lenth - 1];
    // let options = currentPage.options;
    const {
      goods_id
    } = options;
    this.getGoodsDetail(goods_id);
  },



  async getGoodsDetail(goods_id) {
    const goodsObj = await request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/detail",
      data: {
        goods_id
      }
    });
    this.GoodsInfo = goodsObj;
    // let collect = wx.getStorageSync("collect") || [];
    // let isCollect = collect.some(v => v.goods_id === this.GoodsInfo.goods_id);
    this.setData({
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodsObj.pics
      },
      // isCollect
    })

  },

  handlePrevewImage(e) {
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    });
  },
  handleCartAdd() {
    let cart = wx.getStorageSync("cart") || [];
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
    if (index === -1) {
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo);
    } else {
      cart[index].num++;
    }
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    });

  }
})