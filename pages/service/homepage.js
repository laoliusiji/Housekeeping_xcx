// pages/service/homepage.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    nanny_id:0,
    datas:[],
    type: 0,
  },

  onclick_menu: function (e) {
    wxb.that.setData({
      type: e.target.dataset.type,
    });
  },

  lookPhoto: function(e){
    var that = this;
    var index = e.target.dataset.id;
    var imgList = wxb.that.data.datas.photos

    wx.previewImage({
      current: imgList[index],
      urls: wxb.that.data.datas.photos,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxb.that = this;
    wxb.style();
    this.setData({
      nanny_id: options.nanny_id,
    })
    wxb.globalData = app.globalData; //正确打开海天应用的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
    this.getDatas();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wxb.that = this;
    wxb.style();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },
  getDatas: function (e) {
    wx.showLoading({
      title: '加载中...',
    })
    wxb.Post('/api/service.index/onnanDetail', {
      openid: wxb.getOpenId(),
      nanny_id: wxb.that.data.nanny_id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        datas: data,
      })
    });
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})