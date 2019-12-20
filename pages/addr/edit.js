//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',
    addr:[],
  },

  map: function () {
    var addr = wxb.that.data.addr;
    wx.chooseLocation({
      success: function (data) {
        addr.gps_addr = data.address;
        addr.lng = data.longitude;
        addr.lat = data.latitude;
        wxb.that.setData({
            addr:addr
        });
      }
    });
  },
  fromSubmit: function (data) {
    var data = data.detail.value;
    if (!data.name) {
      wx.showToast({
        image: '/img/kulian.png',
        title: '联系人不能为空',
      })
    } else if (!data.mobile) {
      wx.showToast({
        image: '/img/kulian.png',
        title: '手机号码不能为空',
      })
    } else if (!data.idcard) {
      wx.showToast({
        image: '/img/kulian.png',
        title: '身份证号码不能为空',
      })
    } else if (!data.gps_addr) {
      wx.showToast({
        image: '/img/kulian.png',
        title: '请选择GPS定位',
      })
    } else if (!data.lng || !data.lat) {
      wx.showToast({
        image: '/img/kulian.png',
        title: '请选择GPS定位',
      })
    } else if (!data.address) {
      wx.showToast({
        image: '/img/kulian.png',
        title: '请选择GPS定位',
      })
    } else {
      data.openid = wxb.getOpenId();
      data.address_id = wxb.that.data.addr.address_id;
      wxb.Post('/api/user/editAddress', data, function (addr) {
   
          wx.showToast({
            title: '保存地址成功',
            success: function () {
              setTimeout(function () {
                wx.redirectTo({
                  url: '/pages/addr/index',
                })
              }, 2000);
            }
          })

      });
    }
  },
  onLoad: function (option) {
    var id = option.id;

    wxb.that = this;
    wxb.style();
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }
    if(!id){
      wx.showToast({
        image: '/img/kulian.png',
        title: '参数不正确',
        success:function(){
           setTimeout(function(){
              wx.redirectTo({
                url: '/pages/addr/index',
              })
           },2000);   
        }
      })
    }else{
      wx.showLoading({
        title: '正在加载数据',
      })
      wxb.Post('/api/user/addressDetail',{
        address_id:id,
        openid:wxb.getOpenId()
      },function(data){
        wx.hideLoading();
         wxb.that.setData({
           addr:data
         });

      });
    }
  }
})
