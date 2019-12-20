// pages/mine/index.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    setting: [],
  },

  onShow: function () {
    wxb.that = this;
    wxb.style();
  },

  onLoad: function () {
    wxb.that = this;
    wxb.style();
    wxb.globalData = app.globalData; //正确打开海天应用的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
  },

  tel: function(){
    wxb.that = this;   //正确打开海天应用的方式
    wx.makePhoneCall({
      phoneNumber: wxb.that.data.setting.service_tel,
    })
  }
})