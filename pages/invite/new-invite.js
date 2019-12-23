// pages/invite/new-invite.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNumber: 1,
    list: [],
    sum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().pages.onLoad(this, options);
    this.getrecommendrecordlist()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    return {
      title: '邀请好友',
      path: 'pages/invite/new-invite?scene=' + wx.getStorageSync('InfoMemID')
    }
  },
  bindscrolltolower: function(){
    if (this.data.list.length !== this.data.sum){
      this.getrecommendrecordlist()
    }
    
  },
  /**
   * 获取邀请记录
   */
  getrecommendrecordlist: function () {
    app.request({
      url: app.api.Recommend.GetRecommendRecordList,
      data: {
        pageNumber: this.data.pageNumber,
      },
      success: (res) => {
        let data = this.data.list.concat(res.Data.Rows);
        this.setData({
          list: data,
          sum: res.Data.TotalCount,
          pageNumber: this.data.pageNumber + 1
        })
      }
    })
  },
})