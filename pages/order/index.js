// pages/order/index.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    type: 0,
    datas:[],
    page:1,
    more:0,
  },
  tab: function (e) {
    var type = e.currentTarget.dataset.type;
    this.setData({
      type: type,
      datas:[],
      page:1,
      more:0,
    });
    this.getDatas();
  },
  onShow: function () {
    wxb.that = this;
    wxb.style();
  },
  loadMore: function (e) {
    this.getDatas();
  },
  getDatas: function (e) {
    wx.showLoading({
      title: '加载中...',
    })
    wxb.Post('/api/service.manage/yuyve', {
      openid: wxb.getOpenId(),
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
  quxiao:function(e){
   var index = e.target.dataset.index;
   var id = e.target.dataset.id;
    var datas = wxb.that.data.datas;
    datas[index].status = datas[index].status == 0 ? 6 : 4;
    datas[index].status_mean = datas[index].status == 0 ? '退款申请' : '已取消';
    wx.showModal({
      title: '确定要取消预约吗？',
      success: function (res) {
        if (res.confirm) {
          wxb.Post('/api/service.manage/cancel', {
            openid: wxb.getOpenId(),
            enroll_id: id,
          }, function (data) {
            wxb.that.setData({
              datas: datas,
            })
          });
       
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },


  getPayment: function (e) {
    var id = e.target.dataset.id;
    var index = e.target.dataset.index;
    var datas = wxb.that.data.datas;
    datas[index].status = datas[index].status == 1;
    var _this = this;
    wxb.Post('/api/service.manage/pay', {
      enroll_id: id,
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
            wxb.that.setData({
              datas: datas,
            })
            setTimeout(function () {
              wx.redirectTo({
                url: '/pages/order/index'
              })
            }, 1000);
        },
      });
    });
  },


})