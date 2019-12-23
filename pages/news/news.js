// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNumber: 1,
    Rows: [],
    noContent: false,
    state: 2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    getApp().pages.onLoad(this, options);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      pageNumber: 1,
      Rows: []
    })
    this.getNotices()
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
    if (this.data.Rows.length != this.data.TotalCount) {
      this.getNotices();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 获取通知消息列表
   */
  getNotices: function() {
    getApp().request({
      url: getApp().api.SystemServe.GetNotices,
      data: {
        state: this.data.state,
        pageNumber: this.data.pageNumber,
        pageSize: 10
      },
      success: (res) => {
        let data = res.Data;
        this.setData({
          Rows: this.data.Rows.concat(data.Rows),
          pageNumber: this.data.pageNumber + 1,
          TotalCount: data.TotalCount,
          noContent: false
        })
        if (!data.TotalCount) {
          this.setData({
            noContent: true
          })
        }
      }
    })
  },
  bindState: function(event) {
    this.setData({
      state: event.currentTarget.dataset.state,
      Rows: [],
      pageNumber: 1
    });
    this.getNotices()
  }
})