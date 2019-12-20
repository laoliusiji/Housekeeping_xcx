//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',

    datas: [],
  },

  onLoad: function () {
    wxb.that = this;
    wxb.style();

    wxb.globalData = app.globalData; //正确打开海天应用的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }

    this.getAddressList();
  },

  /**
   * 获取地址列表
   */
  getAddressList: function (e) {
    wx.showLoading({
      title: '加载中..',
    });
    wxb.Post('/api/user/getAddress', {
      openid: wxb.getOpenId(),
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        datas: data,
      });
    });
  },

  /**
   * Change 
   */
  radioChange: function (e) {//e.detail.value
    wxb.that.setData({
      address_id: e.detail.value,
    });

    this.setDefault();
  },

  /**
   * 设置默认地址
   */
  setDefault: function (e) {
    wx.showLoading({
      title: '加载中..',
    });
    wxb.Post('/api/user/setDefault', {
      openid: wxb.getOpenId(),
      address_id: wxb.that.data.address_id,
    }, function (data) {
      wx.hideLoading();
      //跳转至单独购买的位置

      setTimeout(function () {
        wx.navigateBack({})
      }, 1000);
    });
  }
})
