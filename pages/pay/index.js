// pages/arond/fragment/find.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    setting: [],
    money : '',
    need_money:'',
    couponid:0,
    coupon:0,
    need:0,
    color:'',
  },
  payment:function(e){
    var num = wxb.that.data.money;
    var coupon = wxb.that.data.coupon;
    var need = wxb.that.data.need;
    var couponid = wxb.that.data.couponid;
    var  can = true;
    if (coupon > 0) {
      if (num < need) {
        can = false;
        wx.showToast({
          image: '/img/kulian.png',
          title: '需要满足' + need + '元',
        })
      } 
    }

    if(can == true){

          wxb.Post('/api/mendian.index/order',{
            openid:wxb.getOpenId(),
            money: num,
            coupon_id: couponid
          },function(data){
              if(data.status == 1){
                wx.navigateTo({
                  url: '/pages/pay/payyes?money='+data.money+'&type=1',
                });
              }else if(data.status == 0){
                wx.requestPayment({
                  timeStamp: data.order.timeStamp,
                  nonceStr: data.order.nonceStr,
                  package: data.order.package,
                  signType: data.order.signType,
                  paySign: data.order.paySign,
                  success: function () {
                  
                    wx.navigateTo({
                     
                      url: '/pages/pay/payyes?money=' + data.money + '&type=1',
                    });
                   
                  },
                  fail:function(){
                    wx.navigateTo({
                      url: '/pages/pay/payyes?money=' + data.money + '&type=0',
                    });
                  }
                })

              }else{
                wx.showToast({
                  image:'/img/kulian.png',
                  title: '支付失败',
                })
              }


          });

    }


  },
  select:function(e){
      var money = Number(wxb.that.data.money);
      if(money >0){
          wx.redirectTo({
            url: '/pages/coupon/index?money='+money,
          })
      }else{
          wx.showToast({
            image:'/img/kulian.png',
            title: '需要支付金额不正确',
          })
      }
  },
  number2:function(e){
      var num = Number(Number(e.detail.value).toFixed(2));
      var coupon = wxb.that.data.coupon;
      var need = wxb.that.data.need;
      var need_money = num;
      if(coupon > 0){
        if(num < need){
          wx.showToast({
            image:'/img/kulian.png',
            title: '需要满足'+need+'元',
          })
        }else{
          wxb.that.setData({
            money: num,
            
            need_money: Number(Number(num - Number(coupon)).toFixed(2))
          });
        }
      }else{
        wxb.that.setData({
          money: num,
          need_money: need_money
        });
      }
      
  },
  
  //转发
  onShareAppMessage: function (res) {
    wxb.that = this;   //正确打开海天应用的方式
    return {
      title: wxb.that.data.setting.name,
      path: '/page/pay/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  initData: function () {
    wxb.Post('/api/mendian.index/setting', {
      openid: wxb.getOpenId()
    }, function (data) {
      
      wxb.that.setData({
        setting:data
      });

    });
  },
  onShow: function () {
    wxb.that = this;   //正确打开海天应用的方式
  },
  onLoad: function (options) {
    wxb.that = this;   //正确打开海天应用的方式
    wxb.style();
    var coupon = Number(wx.getStorageSync('wxb_use_hongbao_money'));
    var couponid = wx.getStorageSync('wxb_use_hongbao_id');
    var need = wx.getStorageSync('wxb_use_hongbao_need_money');
    wx.removeStorageSync('wxb_use_hongbao_id');
    wx.removeStorageSync('wxb_use_hongbao_money');
    wx.removeStorageSync('wxb_use_hongbao_need_money');

    if (options.money){
      var money = Number(options.money);
      wxb.that.setData({
        money:money,
        coupon: coupon,
        couponid: couponid,
        need: need,
        need_money: Number(Number(money - Number(coupon)).toFixed(2))
      });
    }else{
        wxb.that.setData({
            coupon:coupon,
            couponid:couponid,
            need:need,
        });
    }
   
    if (!wxb.checkAuthLogin(true)) {
      wxb.login(function () {
        wxb.that.initData();
      });
    } else {
      wxb.that.initData();
    }

  }

})