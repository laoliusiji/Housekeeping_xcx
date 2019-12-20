//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {

    color: '',

    length: 1,
    categorys: [],
    datas:[], 
    setting: [],

  },

  callPhone: function (e) {
    wxb.that = this;   //正确打开海天应用的方式
    wx.makePhoneCall({
      phoneNumber: wxb.that.data.setting.service_tel,
    })
  },

  onShow: function () {
    wxb.that = this;
    wxb.style();
  },
  receive: function (e) {
    var activity_id = e.target.dataset.id;
    wx.showLoading({
      title: '正在加载中',
    })
    wxb.Post('/api/user/Receive/', {
      activity_id: activity_id,
      openid: wxb.getOpenId(),
    }, function (data) {
      wx.showToast({
        title: '领取成功',
        duration: 5000,
      })
    });
  },
  onLoad: function () {
    wxb.that = this;
    wxb.style();
    wxb.globalData = app.globalData; //正确打开海天应用的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
    this.getDatas();
  },
  getDatas: function (e) {
    wx.showLoading({
      title: '加载中...',
    }),
   
    wxb.Post('/api/service.index/getIndex', {
      openid: wxb.getOpenId(),
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        datas: data,
        length: data.lentth,
       categorys: data.categorys
      })
    });
  }

})
