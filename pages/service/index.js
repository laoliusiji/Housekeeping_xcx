// pages/service/index.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    orderon:true,
    typeon:true,
    datas:[],
    page:1,
    more:0,
    category_id:0,
    ordermsg:'推荐排序',
    orderby:0,
    typemsg:'服务类型',
    type:0,
    setting:[],
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
  orderonbin:function(){
    var orderon = this.data.orderon == true ? false : true;
    this.setData({
      orderon: orderon,
        typeon:true,
    }); 
  },
  typeonbin: function () {
    var typeon = this.data.typeon == true ? false : true;
    this.setData({
      orderon: true,
      typeon: typeon,
    });
  },
  getDatas: function (e) {
    wx.showLoading({
      title: '加载中...',
    })
    wxb.Post('/api/service.index/getOnnan', {
      openid: wxb.getOpenId(),
      page: wxb.that.data.page,
      category_id: wxb.that.data.category_id,
      orderby: wxb.that.data.orderby,
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
  },
  loadMore: function (e) {
    this.getDatas();
  },
  orderby:function(e){
    console.log(e.target.dataset);
    this.setData({
      datas:[],
      page:1,
      orderby: e.target.dataset.orderby,
      ordermsg: e.target.dataset.msg,
      orderon:true,
      typeon:true,
    });
    this.getDatas();
  },
  typetab: function (e) {
    this.setData({
      datas: [],
      page: 1,
      type: e.target.dataset.type,
      typemsg: e.target.dataset.msg,
      orderon: true,
      typeon: true,
    });
    this.getDatas();
  },
  onLoad: function (e) {
    wxb.that = this;
    wxb.style();
    this.setData({
      category_id: e.category_id,
    });
    wxb.globalData = app.globalData; //正确打开海天应用的方式
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
    this.getDatas();
  }
})