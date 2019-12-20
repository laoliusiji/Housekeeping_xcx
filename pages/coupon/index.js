var app = getApp();
var wxb = require('../../utils/wxb.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,
    money: 0,
    color:'',
    usecoupon: 1,
    hongbaolist: []
  },

  nouse: function (e) {
    this.setData({
      usecoupon: 0
    });
    wx.setStorageSync('nousehongbao', 1);
    wx.redirectTo({
      url: '/pages/pay/index?money='+wxb.that.data.money,
    })
  },
  yesuse: function (e) {
    this.setData({
      usecoupon: 1
    });
    wx.setStorageSync('userhongbao', 0);

    wx.setStorageSync('wxb_use_hongbao_id', e.target.dataset.id);
    wx.setStorageSync('wxb_use_hongbao_money', e.target.dataset.money);
    wx.setStorageSync('wxb_use_hongbao_need_money', e.target.dataset.need);
    wx.redirectTo({
      url: '/pages/pay/index?money=' + wxb.that.data.money,
    })
  },
  initdata: function () {
    wx.showLoading({
      title: '数据加载中',
    })
    wxb.Post('/api/user/getUseCoupon', {
      type: 1,
      openid: wxb.getOpenId(),
      money: wxb.that.data.money,
    }, function (data2) {
      wx.hideLoading();
      wxb.that.setData({
        hongbaolist: data2.list
      });

    });
      
  },
  onLoad: function (options) {
    wxb.that = this;   
    wxb.style();
    var money = Number(options.money);
    if (money <= 0) {
      wx.showToast({
        image: '/img/kulian.png',
        title: '金额不正确',
      })
    } else {
      wxb.that.setData({
        money:money
      });
      wx.removeStorageSync('wxb_use_hongbao_id');
      wx.removeStorageSync('wxb_use_hongbao_money');
      wx.removeStorageSync('wxb_use_hongbao_need_money');
      if (!wxb.checkAuthLogin(true)) {
        wxb.login(function () {
          wxb.that.initdata();
        });
      } else {
        wxb.that.initdata();
      }

    }




  }
})