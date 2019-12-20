// pages/index/detail.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    datas:[],
  },

  onShow: function () {
    wxb.that = this;
    wxb.style();
  },
  getDatas: function (e) {
    wx.showLoading({
      title: '加载中...',
    })
    wxb.Post('/api/service.index/repairDetail', {
      openid: wxb.getOpenId(),
      repair_id: wxb.that.data.repair_id,
    }, function (data) {
      wx.hideLoading();
      var datas = wxb.that.data.datas;
      for (var val in data.list) {
        datas.push(data.list[val]);
      }

      wxb.that.setData({
        datas: data,
        more: data.more,
        page: wxb.that.data.page + 1,
      })
    });
  },
  onLoad: function (e) {
    wxb.that = this;
    wxb.style();
    this.setData({
      repair_id: e.repair_id
    });
    wxb.globalData = app.globalData; //正确打开海天应用的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
    this.getDatas();
  },

})