// pages/arond/fragment/find.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    type:0,
    money:0,
    color:'',
  },

  onLoad: function (options) {
    wxb.that = this;   //正确打开海天应用的方式
    wxb.style();
    var money = options.money ? options.money: 0  ;
    var type = options.type ? options.type :0 ;
    wxb.that.setData({
        type:type,
        money:money
    });
  }

})