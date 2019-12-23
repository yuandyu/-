// pages/problem/problem.js
let videoContext = [];
Page({ 

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: "1"
  },
  bindplay: function(event){
    videoContext.map((VideoContext, index) => {
      if (event.currentTarget.dataset.index != index + 1){
        VideoContext.pause()
      }
    })
  },
  onChange(event) {
    videoContext.map((VideoContext, index) => {
      VideoContext.pause()
    })
    this.setData({
      activeNames: event.detail
    });
  },
  telCall(event) {
    wx.makePhoneCall({
      phoneNumber: '4008366899' //仅为示例，并非真实的电话号码
    })
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
    for(let i = 1; i <= 4; i++){
      videoContext.push(wx.createVideoContext('myVideo' + i))
    }
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
  onShareAppMessage: function () {

  }
})