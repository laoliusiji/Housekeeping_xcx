// pages/index/type.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    color: '',
    category_id:0,
    datas:[],
  },

  onShow: function () {
    wxb.that = this;
    wxb.style();
  },

  onLoad: function (e) {
    wxb.that = this;
    wxb.style();
    this.setData({
      category_id:e.category_id,
    })
    wxb.globalData = app.globalData; //正确打开海天应用的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
    this.getDatas();
  },
  loadMore: function (e) {
    this.getDatas();
  },

  getDatas: function (e) {
    wx.showLoading({
      title: '加载中...',
    })
    wxb.Post('/api/service.index/getRepair', {
      openid: wxb.getOpenId(),
      category_id: wxb.that.data.category_id,
      page: wxb.that.data.page,
      type: wxb.that.data.type,
    }, function (data) {
      wx.hideLoading();
      var datas = wxb.that.data.datas;
      for (var val in data.list) {
        datas.push(data.list[val]);
      }

      wxb.that.setData({
        datas: datas,
        more: data.more,
        page: wxb.that.data.page + 1,
      })
    });
  }
})