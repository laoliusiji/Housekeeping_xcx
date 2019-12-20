// pages/index/buy.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    color: '',
    nanny_id:0,
    datas:[],
    date:'',
  },
  onShow: function () {
    wxb.that = this;
    wxb.style();
    this.getDatas();
  },
  onLoad: function (e) {
    wxb.that = this;
    wxb.style();
    this.setData({
      nanny_id: e.id,
    })
    wxb.globalData = app.globalData; //正确打开海天应用的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
  },
  seledate:function(e){
    this.setData({
      date:e.detail.value,
    });
  },
  getDatas: function (e) {
    wx.showLoading({
      title: '加载中..',
    });
    wxb.Post('/api/service.manage/ayi', {
      openid: wxb.getOpenId(),
      id: wxb.that.data.nanny_id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        address: data.address,
        datas:data,
        date:data.date
      });
    });
  },

  getPayment: function () {
    var _this = this;
    wxb.Post('/api/service.manage/yvyueayi', {
      id: _this.data.nanny_id,
      address_id: _this.data.address.address_id,
      date: _this.data.date,
      openid: wxb.getOpenId()
    }, function (data) {
      wx.requestPayment({
        timeStamp: data.order.timeStamp,
        nonceStr: data.order.nonceStr,
        package: data.order.package,
        signType: data.order.signType,
        paySign: data.order.paySign,
        success: function (res) {
          wx.showToast({
            title: '支付成功',
          }),
            setTimeout(function(){
            wx.redirectTo({
              url: '/pages/order/index'
            })
            },1000);
        },
      });
    });
  },

})