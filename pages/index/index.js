import {
  request
} from "../../request/index";
Page({
  data: {
    swiperList: [],
    catesList: [],
    floorList:[]
  },
  //options(Object)
  onLoad: function (options) {
    // var reqTask = wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     this.setData({
    //       swiperList: result.data.message
    //     })
    //   }
    // });
    
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
  getSwiperList() {
    request({
        url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"
      })
      .then(result => {
        this.setData({
          swiperList: result
        })
      })
  },
  getCateList() {
    request({
        url: "https://api-hmugo-web.itheima.net/api/public/v1/home/catitems"
      })
      .then(result => {
        this.setData({
          catesList: result
        })
      })
  },
  getFloorList() {
    request({
        url: "https://api-hmugo-web.itheima.net/api/public/v1/home/floordata"
      })
      .then(result => {
        this.setData({
          floorList: result
        })
      })
  }
});