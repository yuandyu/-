// pages/invite/invite.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().pages.onLoad(this, options);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getQRCode()
  },
  showShareMenu: function(){
    console.log(123)
    wx.showShareMenu({
      withShareTicket: true,
      success: function(){
        console.log(456)
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    getApp().pages.onShow(this)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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
  onShareAppMessage: function (res) {
    console.log(res)
    return{
      title: '转发标题',
      path: 'pages/invite/invite'
    }
  },
  getQRCode: function(){
    app.request({
      url: app.api.Users.GetWxacodeUnlimitQRCode,
      data: {
        scene: wx.getStorageSync('InfoMemID'),
        page: 'pages/network-list/network-list'
      },
      success: (res) => {
        this.setData({
          QRImage: res.Data
        })
      }
    })
  }
})