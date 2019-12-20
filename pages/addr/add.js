//index.js
//获取应用实例
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
  data: {
    color: '',
    gps_addr: '',
    lng: '',
    lat: '',
    address_id: 0,

    datas: [],
  },

  map: function () {
    wx.chooseLocation({
      success: function (data) {
        wxb.that.setData({
          gps_addr: data.address,
          lng: data.longitude,
          lat: data.latitude
        });
      }
    });
  },

  /**
   * 获取地址详情
   */
  getAddressDetail: function (e) {
    wx.showLoading({
      title: '加载中...',
    })

    wxb.Post('/api/user/addressDetail', {
      openid: wxb.getOpenId(),
      address_id: wxb.that.data.address_id,
    }, function (data) {
      wx.hideLoading();
      wxb.that.setData({
        datas: data,
        gps_addr: data.gps_addr,
        lng: data.lng,
        lat: data.lat,
      });
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
      wx.showLoading({
        title: '提交中...',
      })

      if (wxb.that.data.address_id > 0) {
        data.address_id = wxb.that.data.address_id;
        wxb.Post('/api/user/editAddress', data, function (addr) {
          wx.hideLoading();
          wx.showToast({
            title: '更新地址成功',
            success: function () {
              setTimeout(function () {
                wx.redirectTo({
                  url: '/pages/mall/buy',
                })
              }, 2000);
            }
          })
        });
      } else {
        wxb.Post('/api/user/setAddress', data, function (addr) {
          wx.hideLoading();
          if (addr.address_id) {
            var json = JSON.stringify(addr);
            wx.setStorageSync('wxbaddr', json);
            wx.showToast({
              title: '添加地址成功',
              success: function () {
                setTimeout(function () {
                  wx.redirectTo({
                    url: '/pages/mall/buy',
                  })
                }, 2000);
              }
            })
          } else {
            wx.showToast({
              image: '/img/kulian.png',
              title: '添加地址失败',
            })
          }
        });
      }
    }
  },

  onLoad: function (e) {
    wxb.that = this;
    wxb.style();
    if (!wxb.checkAuthLogin(true)) {
      wxb.login();
    }

    if (e.address_id > 0) {
      wxb.that.setData({
        address_id: e.address_id,
      });

      this.getAddressDetail();
    }
  }
})
