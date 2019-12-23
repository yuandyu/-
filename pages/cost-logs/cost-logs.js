// pages/cost-logs/cost-logs.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typename: '',
    consumedate: '',
    consumelist: [],
    pageNumber: 1,
    sumeAmount: '',
    balance: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().pages.onLoad(this, options);
    
    this.getconsumeloglist();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    getApp().pages.onShow(this)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
    this.getconsumeloglist();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 获取洗车记录
   */
  getconsumeloglist: function () {
    app.request({
      url: app.api.Washer.GetConsumeLogList,
      data: {
        pageNumber: this.data.pageNumber,
        pageSize: 15, // 默认15
      },
      success: (res) => {
        let balance = res.Data.Balance;
        let sum = res.Data.ConsumeSumData;
        console.log(res)
        if (res.Data.Rows !== null) {
          let data = this.data.consumelist.concat(res.Data.Rows);
          this.setData({
            balance: balance,
            sumeAmount: sum,
            consumelist: data,
            pageNumber: this.data.pageNumber + 1
          })
        };
        this.setData({
          balance: balance,
          sumeAmount: sum,
        })
      }
    })
  },
})