//app.js
App({
  onLaunch: function () {
    var that = this;
      if (wx.getExtConfig) {
        wx.getExtConfig({
          success: function (res) {           
            that.globalData = res.extConfig;
          }
        })
      }
  },
  globalData:{

  }
})