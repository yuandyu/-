// pages/mine/mine.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      nickName: '车海洋',
      avatarUrl: 'https://img.yzcdn.cn/vant/cat.jpeg'
    },
    banner: [{
      url: 'https://chy-vending-1253882812.cos.ap-guangzhou.myqcloud.com/Chy.CarWash/images/banner_710_180.png',
      appId: 'wx1045ed196b15f9ca',
      path: ''
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    getApp().pages.onLoad(this, options);
    wx.hideShareMenu()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    if (!getApp().getToken()) {
      this.myLogin()
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    getApp().pages.onShow(this)
    if (getApp().getToken()) {
      this.getUsersBaseInfo()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  bindsuccess: function() {
    console.log(123)
    wx.clearStorage();
  },
  exit: function() {
    if (getApp().getToken()) {
      wx.showModal({
        title: '是否退出登陆？',
        success: (res) => {
          if (res.confirm) {
            wx.removeStorage({
              key: 'Authorization',
              success: (res) => {
                wx.reLaunch({
                  url: '/pages/network-list/network-list'
                });
                wx.clearStorage();
              }
            })
          }

        }
      })
    }
  },
  navigator: function(event) {
    if (!getApp().getToken()) {
      this.myLogin()
    } else {
      if (void 0 !== event.currentTarget.dataset.type && !wx.getStorageSync("Phone")) {
        this.myLogin(event)
        return;
      }
      wx.navigateTo({
        url: event.currentTarget.dataset.url
      })
    }
  }
})